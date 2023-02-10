<template>
  <div class="layout">
    <div class="menu-list">
      <div class="head">elesign 电子签名，线上涂鸦</div>
      <div
        :class="{ menu: true, active: routeName === menu.name }"
        v-for="menu in menus"
        :key="menu.title"
        @click="link(menu)"
      >
        {{ menu.title }}
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const routeName = computed(() => {
  return route.name;
});
const menus = ref([
  { title: 'elesigncode第三方依赖示例', name: 'elesigncode' },
  { title: 'elesign签名示例', name: 'elesign' },
  { title: 'elesign涂鸦示例', name: 'graffiti' },
]);
const link = menu => {
  router.push({ name: menu.name });
};
</script>
<style>
* {
  margin: 0;
}
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.menu-list {
  width: 280px;
  border-right: 1px solid #eee;
}
.head {
  background: #1867c0;
  color: #fff;
  padding: 10px;
  height: 40px;
  display: flex;
  align-items: center;
}
.menu {
  padding: 10px;
  cursor: pointer;
}
.menu.active {
  color: #1867c0;
}
.content {
  flex: 1;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
