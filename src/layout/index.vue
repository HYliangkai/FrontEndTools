<!-- Desc : 页面布局 -->
<template>
  <div id="layout" class="layout">
    <!-- Html:导航栏 -->
    <Navigation v-show="sider_state" id="nav" class="nav" />
    <!-- Html:工具栏 -->
    <Toolbar id="tool" class="tool" data-tauri-drag-region @sider-change="sider_handle" />
    <!-- Html:显示区域 -->
    <div class="main"><router-view :key="route.path" /></div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import Navigation from '@/page/navigation/index.vue'
import Toolbar from '@/page/toolbar/index.vue'
import {Own, option, pipe, result, stop_browser} from '@/utils/mod'
const route = useRoute()
console.log('start')
stop_browser()

const sider_state = ref(true)
const sider_handle = () => {
  sider_state.value = !sider_state.value
  Own(sider_state.value).match(
    () => {
      const lay_out = option(document.getElementById('layout')).unwarp()
      lay_out.style.gridTemplateColumns = '274px 1fr'
      const tool = option(document.getElementById('tool')).unwarp()
      tool.style.paddingLeft = '0px'
      const sider_btn = option(document.getElementById('sider-btn')).unwarp()
      sider_btn.style.rotate = '0deg'
    },
    () => {
      const lay_out = option(document.getElementById('layout')).unwarp()
      lay_out.style.gridTemplateColumns = '0px 1fr'
      const tool = option(document.getElementById('tool')).unwarp()
      tool.style.paddingLeft = '64px'
      const sider_btn = option(document.getElementById('sider-btn')).unwarp()
      sider_btn.style.rotate = '180deg'
    },
  )
}
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
    background: rgb(232, 236, 241);
    grid-area: main;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
