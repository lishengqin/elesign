<template>
  <div class="draw-wrap">
    <elesign ref="elesignRef" color="red" lineWidth="5" width="400" empty="请签名" />
    <div class="tool">
      <button @click="redo">重做</button>
      <button @click="toPng">打印png</button>
      <div>{{ '画布是否为空：' + isEmpty }}</div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import elesign from '@/elesign/index';
const elesignRef = ref('');
const isEmpty = computed(() => {
  return elesignRef.value?.isEmpty;
});
/* 清空 */
function redo() {
  elesignRef.value?.redo();
}
/* 打印图片 */
function toPng() {
  let pic = elesignRef.value?.toPng();
  console.log(pic);
}
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
