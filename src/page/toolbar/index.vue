<!-- Desc : 工具栏 -->
<template>
  <div
    class="h-full w-full bg-page dark-shadow flex it-center px-12"
    style="border-bottom: 1px solid #cfdafb"
    data-tauri-drag-region
    @dragleave="dragleave"
    @dragenter="dragenter"
    @dragover="dragover"
    @drop="drop"
  >
    <div class="flex w-full flex it-center" data-tauri-drag-region>
      <div class="shrink-0 flex it-center" data-tauri-drag-region>
        <SvgIcon
          id="sider-btn"
          class="sider_btn"
          name="sidebtn"
          size="20"
          data-tauri-drag-region
          @click="emit('sider-change')"
        />
      </div>
      <div class="row-end flex-1" data-tauri-drag-region>
        <SvgIcon
          name="ding"
          data-tauri-drag-region
          :style="{rotate: top_state.take() ? '-45deg' : ''}"
          @click="put_top"
        />
      </div>
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {option, Own} from '@/utils/mod'
import {window} from '@tauri-apps/api'

//emit
const emit = defineEmits(['sider-change'])

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
const put_top = () => {
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

const put_sider = () => {}
</script>

<!------------------------------>

<style scoped lang="scss">
.sider_btn {
  animation-duration: 1s;
}
</style>
