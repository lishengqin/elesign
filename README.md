# elesign

通过 canvas 实现线上涂鸦，签名，清空，转为 png，看自定义画笔的颜色和粗细。

## props 属性

| 属性名      | 说明                                                                        | 类型             | 默认值                         |
| ----------- | --------------------------------------------------------------------------- | ---------------- | ------------------------------ |
| width       | 画布宽度                                                                    | Number           | 500                            |
| height      | 画布高度                                                                    | Number           | 200                            |
| canvasStyle | 画布样式                                                                    | Object           | { border: '2px solid #6699cc'} |
| color       | 画笔颜色                                                                    | String           | #000                           |
| lineWidth   | 画笔粗细                                                                    | String 或 Number | 10                             |
| empty       | 空的文字内容                                                                | String           | 签名区域                       |
| defaultImg  | 画布初始的值，格式应该是 canvas 的 toDataURL() 方法，生成的是 base64 的图片 | String           | ""                             |
| isEraser    | 是否橡皮擦转状态                                                            | Boolean          | false                          |
| eraserSize  | 橡皮擦大小                                                                  | Number           | 25                             |

## expose 暴露的实例属性

| 属性名         | 说明              | 类型     |
| -------------- | ----------------- | -------- |
| redo           | 清空的方法        | function |
| toPng          | 转为 png 的的方法 | function |
| backward       | 撤销后退的方法    | function |
| forward        | 重做前进的的方法  | function |
| isEmpty        | 画布是否为空      | Boolean  |
| isBackwardAble | 是否可以撤销回退  | Boolean  |
| isForwardAble  | 是否可以重做前进  | Boolean  |

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
