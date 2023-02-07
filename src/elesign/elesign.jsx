import { defineComponent, onMounted,onBeforeUnmount,ref ,getCurrentInstance} from "vue";
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
    type: String,
    default: '#000',
  },
  lineWidth: {
    type: String || Number,
    default: '10',
  },
  defaultImg: {
    type: String,
    default:""
   },
  empty: {
    type: String,
    default: '签名区域',
  },
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
    /* 空的的提示语 */
    const isEmpty = ref(true);
    function drawTip() {
      isEmpty.value = true;
      ctx.font = '40px Arial';
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(props.empty, parseFloat(props.width) / 2, parseFloat(props.height) / 2);
    }
    function clearTip() {
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
        drawTip()
      }
    }

    /* 开始画 */
    function StartDraw(e) {
      mousePressed = true;
      Draw(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop, false);
    }
    /* 画中 */
    function MoveDraw(e) {
      if (mousePressed) {
        Draw(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop, true);
      }
    }
    /* 停止画 */
    function StopDraw() {
      mousePressed = false;
    }
    /* 画线 */
    function Draw(x, y, isDown) {
      if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = props.color;
        ctx.lineWidth = props.lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        if (isEmpty.value) {
          clearTip();
        }
      }
      lastX = x;
      lastY = y;
    }
    /* 清空 */
    function redo() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawTip();
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
    expose({ redo, toPng, isEmpty });
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      beforeDestroy();
    });
    
    return ()=>(<canvas
      ref="myCanvas"
      width={props.width}
      height={props.height}
      style={props.canvasStyle}
    ></canvas>)
  }
})