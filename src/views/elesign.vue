<template>
  <div class="draw-wrap">
    <canvas id="myCanvas" width="500" height="200" style="border: 2px solid #6699cc"></canvas>
    <div class="tool">
      <div>
        <span class="label">线的粗细：</span>
        <input v-model.number="data.lineWidth" />
      </div>
      <div>
        <span class="label">线的颜色：</span>
        <input v-model="data.color" type="color" />
      </div>
      <button @click="redo">重做</button>
      <button @click="toPng">打印png</button>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue';
const data = reactive({
  color: '#000',
  lineWidth: '10',
});

let mousePressed = false;
let lastX = null;
let lastY = null;
let ctx = null;
let myCanvas = null;
/* 初始化 */
function init() {
  myCanvas = document.querySelector('#myCanvas');
  ctx = myCanvas.getContext('2d');
  myCanvas.addEventListener('mousedown', StartDraw);
  myCanvas.addEventListener('mousemove', MoveDraw);
  myCanvas.addEventListener('mouseup', StopDraw);
  myCanvas.addEventListener('mouseleave', StopDraw);
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
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}
/* 清空 */
function redo() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
/* 打印图片 */
function toPng() {
  let Pic = myCanvas.toDataURL('image/png');
  console.log(Pic);
}
/* 销毁 */
function beforeDestroy() {
  ctx = null;
  myCanvas.removeEventListener('mousedown', StartDraw);
  myCanvas.removeEventListener('mousemove', MoveDraw);
  myCanvas.removeEventListener('mouseup', StopDraw);
  myCanvas.removeEventListener('mouseleave', StopDraw);
}
onMounted(() => {
  init();
});
onBeforeUnmount(() => {
  beforeDestroy();
});
</script>
<style>
.draw-wrap {
  background: #fff;
  color: #000;
  padding: 40px;
}
.tool div {
  margin-top: 16px;
}
.tool button {
  margin-top: 16px;
  margin-right: 8px;
}
</style>
