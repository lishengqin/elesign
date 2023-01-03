<template>
  <div>
    <div>在vue-cli中使用elesigncode</div>
    <div class="hello">
      <ElesignCode ref="signCode1" :datas="datas" :pen="pen" style="border: 1px solid #000" />
    </div>
    <div style="margin-top: 16px">
      <button @click="changePen">切换笔</button>
      <button @click="getData">获取数据</button>
      <button @click="toImg('png')">获取png图片</button>
      <button @click="toImg('jpeg')">获取jpeg图片</button>
      <button @click="undo">撤回</button>
      <button @click="redo">清空</button>
    </div>
  </div>
</template>
<script>
// 导入我们内置的vue组件
import ElesignCode from 'elesigncode/lib/core/elesigncode.vue';
export default {
  // 注册我们的组件
  components: {
    ElesignCode,
  },
  data() {
    return {
      pen: 'writing',
      datas: {
        data: [],
        color: '#333',
        lineWidth: 4,
        bgColor: '-1',
        pen: 'default', //'default' 'writing'
        writingMaxLine: 20,
        writingMinLine: 10,
      },
    };
  },
  methods: {
    changePen() {
      if (this.pen !== 'writing') {
        this.pen = 'writing';
      } else {
        this.pen = 'default';
      }
    },
    toImg(type) {
      if (type === 'png') {
        console.log(this.$refs.signCode1.toPng());
      } else {
        console.log(this.$refs.signCode1.toJpeg());
      }
    },
    redo() {
      /* 不知为何，无效 */
      // this.$refs.signCode1.redo();
      this.$refs.signCode1.signcodeEx.clear();
    },
    undo() {
      this.$refs.signCode1.undo();
    },
    getData() {
      console.log(this.$refs.signCode1.getJson());
      return this.$refs.signCode1.getJson();
    },
  },
};
</script>
