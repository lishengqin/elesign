import { defineComponent, onMounted, onBeforeUnmount, ref, getCurrentInstance, computed } from "vue";
const props = {
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 200,
  },
  canvasStyle: {
    type: Object,
    default: () => {
      return {
        border: '2px solid #6699cc',
      };
    },
  },
  color: {
    // type: String|Dom,
    default: '#000',
  },
  lineWidth: {
    type: String || Number,
    default: '10',
  },
  defaultImg: {
    type: String,
    default: ""
  },
  empty: {
    type: String,
    default: '签名区域',
  },
  isEraser: {
    type: Boolean,
    default: false
  },
  eraserSize: {
    type: Number,
    default: 25
  }
}
export default defineComponent({
  props: props,
  name: "elesign",
  setup(props, { expose }) {
    const instance = getCurrentInstance();// 实例
    let mousePressed = false;
    let lastX = null;
    let lastY = null;
    let ctx = null;
    let myCanvas = null;
    const isEmpty = ref(true);// 画布是否为空
    let isHasDraw = false;
    let historyList = ref([]);
    let historyIndex = ref(historyList.value.length - 1);
    function drawEmptyTip() {
      isEmpty.value = true;
      ctx.font = '40px Arial';
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(props.empty, parseFloat(props.width) / 2, parseFloat(props.height) / 2);
    }
    function clearEmptyTip() {
      isEmpty.value = false;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    /* 初始化 */
    function init() {
      myCanvas = instance.refs.myCanvas;
      ctx = myCanvas.getContext('2d');
      myCanvas.addEventListener('mousedown', StartDraw);
      myCanvas.addEventListener('mousemove', MoveDraw);
      myCanvas.addEventListener('mouseup', StopDraw);
      myCanvas.addEventListener('mouseleave', StopDraw);
      if (props.defaultImg) {
        isEmpty.value = false;
        let canvasPic = new Image();
        canvasPic.src = props.defaultImg;
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
      } else {
        drawEmptyTip()
      }
    }
    /* 开始画 */
    function StartDraw(e) {
      mousePressed = true;
      Draw(e, false);
    }
    /* 画中 */
    function MoveDraw(e) {
      if (mousePressed) {
        Draw(e, true);
      }
    }
    /* 停止画 */
    function StopDraw() {
      mousePressed = false;
      if (isHasDraw) {
        isHasDraw = false
        addHistoryList()
      }
    }
    function addHistoryList() {
      historyList.value = historyList.value.slice(0, historyIndex.value + 1);
        let lastImg = toPng();
        if (!historyList.value.length || historyList.value.indexOf(lastImg) !== historyList.value.length - 1) {
          historyList.value.push(lastImg);
        }
        historyIndex.value = historyList.value.length - 1;
    }
    function CommonWardDo() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let canvasPic = new Image();
      canvasPic.src = historyList.value[historyIndex.value];
      canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
    /* 后退撤销 */
    function backward() {
      if (historyIndex.value < 0) {
        return
      }
      historyIndex.value--;
      CommonWardDo()
    }
    /* 前进恢复 */
    function forward() {
      if (historyIndex.value >= historyList.value.length - 1) {
        return
      }
      historyIndex.value++;
      CommonWardDo()
    }
    const isBackwardAble = computed(() => {
      return historyIndex.value >= 0;
    });
    const isForwardAble = computed(() => {
      return historyIndex.value < historyList.value.length - 1;
    });

    /* 画线 */
    function Draw(e, isDown) {
      let x = e.pageX - myCanvas.offsetLeft;
      let y = e.pageY - myCanvas.offsetTop;
      isHasDraw = true;
      if (isDown) {
        if (props.isEraser) {
          eraserDraw(e, x, y)
          return
        }
        ctx.beginPath();
        /* 单纯的颜色 */
        if (typeof props.color === "string") {
          ctx.strokeStyle = props.color;
        } else {
          /* 图片 */
          props.color.setAttribute("crossOrigin", 'Anonymous');
          let pat = ctx.createPattern(props.color, "repeat");
          ctx.strokeStyle = pat;
        }
        ctx.lineWidth = props.lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        if (isEmpty.value) {
          clearEmptyTip();
        }
      }
      lastX = x;
      lastY = y;
    }
    /* 橡皮擦 */
    function eraserDraw(e, x, y) {
      ctx.save();
      ctx.beginPath();
      let eraserWidth = props.eraserSize;
      /* 圆形的橡皮擦 */
      ctx.arc(x, y, eraserWidth / 2, 0, Math.PI * 2, false);
      /* 方形的橡皮擦 */
      // ctx.rect(x - eraserWidth / 2, y - eraserWidth / 2, eraserWidth, eraserWidth);
      ctx.clip();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
    /* 清空 */
    function redo() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawEmptyTip();
      addHistoryList()
    }
    /* 打印图片 */
    function toPng() {
      let pic = myCanvas.toDataURL('image/png');
      return pic;
    }
    /* 销毁 */
    function beforeDestroy() {
      ctx = null;
      myCanvas.removeEventListener('mousedown', StartDraw);
      myCanvas.removeEventListener('mousemove', MoveDraw);
      myCanvas.removeEventListener('mouseup', StopDraw);
      myCanvas.removeEventListener('mouseleave', StopDraw);
    }
    expose({ redo, toPng, isEmpty, backward, forward, isBackwardAble, isForwardAble });
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      beforeDestroy();
    });

    return () => (<canvas
      ref="myCanvas"
      width={props.width}
      height={props.height}
      style={props.canvasStyle}
    ></canvas>)
  }
})