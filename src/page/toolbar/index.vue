<!-- Desc : 工具栏 -->
<template>
  <div
    class="h-full w-full bg-page dark-shadow flex it-center px-24"
    style="border-bottom: 1px solid #c8c9cc"
    data-tauri-drag-region
    @dragleave="dragleave"
    @dragenter="dragenter"
    @dragover="dragover"
    @drop="drop"
  >
    <div class="flex w-full flex it-center jt-end" data-tauri-drag-region>
      <SvgIcon
        name="ding"
        data-tauri-drag-region
        :style="{rotate: top_state.take() ? '-45deg' : ''}"
        @click="put_top"
      />
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {Own} from '@/utils/FE/Own'
import {window} from '@tauri-apps/api'
//import
function dragenter(event: any): void {
  event.stopPropagation()
  event.preventDefault()
}
function dragover(event: any) {
  event.stopPropagation()
  event.preventDefault()
}
function dragleave(event: any) {
  event.stopPropagation()
  event.preventDefault()
}
function drop(event: any) {
  event.stopPropagation()
  event.preventDefault()
}

const top_state = ref(Own(false))
const put_top =() => {
  let cur_win = window.getCurrent()
  top_state.value.match(
    () => {
      cur_win.setAlwaysOnTop(false)
      top_state.value = Own(false)
    },
    () => {
      cur_win.setAlwaysOnTop(true)
      top_state.value = Own(true)
    },
  )
}

//hooks
</script>

<!------------------------------>

<style scoped lang="scss"></style>
