# elesign

通过 canvas 实现线上涂鸦，签名，清空，转为 png，看自定义画笔的颜色和粗细。

## props

| 属性名      | 说明         | 类型             | 默认值                         |
| ----------- | ------------ | ---------------- | ------------------------------ |
| width       | 画布宽度     | Number           | 500                            |
| height      | 画布高度     | Number           | 200                            |
| canvasStyle | 画布样式     | Object           | { border: '2px solid #6699cc'} |
| color       | 画笔颜色     | String           | #000                           |
| lineWidth   | 画笔粗细     | String 或 Number | 10                             |
| empty       | 空的文字内容 | String           | 签名区域                       |

## 使用示例

```vue
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
import elesign from 'elesign';
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
```
