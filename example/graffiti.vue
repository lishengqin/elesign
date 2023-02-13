<template>
  <div class="graffiti">
    <div class="canvas-wrap">
      <elesign
        ref="elesignRef"
        :width="width"
        height="600"
        :canvasStyle="{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.3)', background: '#f1f1f1' }"
        :color="penImg.dom || penColor"
        :lineWidth="penWidth"
        :isEraser="isEraser"
        :eraserSize="eraserSize"
        empty=""
      />
    </div>
    <div class="tool">
      <div class="item">
        <span>笔的粗细：</span>
        <input type="number" v-model="penWidth" />
      </div>
      <div class="item">
        <span>笔的颜色：</span>
        <input type="color" v-model="penColor" />
      </div>
      <div class="item">
        <span>笔的刷头：</span>
        <span class="img-wrap">
          <img
            :class="{ active: penImg.img === 'penImg' + index }"
            v-for="(one, index) in penImgList"
            :key="one.src"
            :src="one.src"
            alt=""
            :ref="'penImg' + index + 'Ref'"
            @click="penImgChange('penImg' + index, 'penImg' + index + 'Ref')"
          />
        </span>
      </div>
      <div class="item">
        <span>橡皮擦：</span>
        <img
          class="eraser"
          :src="isEraser ? EraserActive : Eraser"
          alt=""
          @click="isEraser = !isEraser"
        />
      </div>
      <div class="item">
        <span>橡皮擦大小：</span>
        <input type="number" v-model="eraserSize" />
      </div>
      <div class="item" style="width: 100%">
        <span :class="{ button: true, disabled: !isBackAble }" @click="backward">
          <img :src="Back" alt="" />
        </span>
        <span :class="{ button: true, disabled: !isGoAble }" @click="forward">
          <img :src="Redo" alt="" />
        </span>
        <span class="button" @click="redo">清屏</span>
        <span class="button" @click="printPng">打印png</span>
      </div>
    </div>
    <div class="print-img-wrap" v-if="pngShow">
      <img :src="pngSrc" alt="" />
      <div class="tool">
        <div class="item">
          <span class="button" @click="pngShow = false">关闭</span>
          <span class="button" @click="downLoad">下载</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import elesign from '@/elesign/index';
import Back from './assets/back.svg';
import Redo from './assets/redo.svg';
import Eraser from './assets/eraser.svg';
import EraserActive from './assets/eraser_active.svg';
import { onMounted, ref, getCurrentInstance, computed, watch } from 'vue';
let instance = null;
const width = ref(900);
const isEraser = ref(false); // 橡皮擦开关
const eraserSize = ref(10);
const penColor = ref('#e66465');
const penWidth = ref(30);
/* 笔刷头 */
const penImgList = ref([
  {
    src: 'https://ts4.cn.mm.bing.net/th?id=OIP-C.ndkHHcFds5LRXYqXbAkVowHaFN&w=298&h=209&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  },
  {
    src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.oScG36TGIEhRDHdawdrQDwHaDe?w=283&h=164&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
]);
const penImg = ref({
  img: '',
  dom: null,
});
const penImgChange = (img, ref) => {
  isEraser.value = false;
  if (penImg.value.img === img) {
    penImg.value.img = '';
    penImg.value.dom = null;
  } else {
    penImg.value.img = img;
    penImg.value.dom = instance.refs[ref][0];
  }
};
/* 清空 */
const elesignRef = ref();
const redo = () => {
  elesignRef.value?.redo();
};
/* 打印图片 */
const pngShow = ref(false);
const pngSrc = ref('');
const printPng = () => {
  pngSrc.value = elesignRef.value?.toPng();
  pngShow.value = true;
  console.log(pngSrc.value);
};
const downLoad = () => {
  let a = document.createElement('a');
  a.href = pngSrc.value;
  a.download = '涂鸦';
  a.click();
};
const isBackAble = computed(() => {
  return elesignRef.value?.isBackwardAble;
});
const isGoAble = computed(() => {
  return elesignRef.value?.isForwardAble;
});
/* 撤回 */
const backward = () => {
  elesignRef.value?.backward();
};
/* 恢复  */
const forward = () => {
  elesignRef.value?.forward();
};
onMounted(() => {
  instance = getCurrentInstance();
  width.value = document.querySelector('.graffiti').offsetWidth;
});
</script>
<style>
.canvas-wrap {
}
input[type='number'] {
  width: 100px;
}
.tool .item {
  display: inline-flex;
  width: 33%;
  margin-top: 4px;
  align-items: center;
}
.tool .item .eraser {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.item .button {
  display: inline-block;
  padding: 0 10px;
  background: green;
  color: #fff;
  margin-right: 6px;
  border-radius: 2px;
  cursor: pointer;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.item .button.disabled {
  opacity: 0.4;
}
.item .button img {
  width: 20px;
  height: 20px;
}
.img-wrap img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 8px;
}
.img-wrap img.active {
  border: 2px solid green;
}
.print-img-wrap {
  position: fixed;
  right: 10px;
  bottom: 160px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  background: #f1f1f1;
}
.print-img-wrap img {
  width: 240px;
  height: auto;
}
.print-img-wrap .tool {
  padding: 10px 0;
  background: #fff;
}
.print-img-wrap .tool .item {
  justify-content: center;
  width: 100%;
}
</style>
