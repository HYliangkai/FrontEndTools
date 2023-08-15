<!-- Desc : 页面布局 -->
<template>
  <div class="layout">
    <!-- Html:导航栏 -->
    <Navigation class="nav" />
    <!-- Html:工具栏 -->
    <Toolbar class="tool" data-tauri-drag-region />
    <!-- Html:显示区域 -->
    <div class="main"><router-view :key="route.path" /></div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import Navigation from '@/page/navigation/index.vue'
import Toolbar from '@/page/toolbar/index.vue'
const route = useRoute()
</script>

<!------------------------------>

<style scoped lang="scss">
.layout {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 30px 1fr;
  grid-template-columns: 274px 1fr;

  grid-template-areas: 'nav tool' 'nav main';
  .nav {
    grid-area: nav;
    background: transparent;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .tool {
    grid-area: tool;
  }
  .main {
    background: #f9f9f9;
    grid-area: main;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
