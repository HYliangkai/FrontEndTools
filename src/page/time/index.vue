<!-- Desc : 时间 -->
<template>
  <div class="h-full w-full y-auto px-24">
    <div class="py-24">
      <div class="t-center font-ms" style="font-size: 144px">{{ now }}</div>
      <div class="row-end color-font ts-28 mt-12">{{ now_day_info }}</div>
    </div>
    <a-divider style="height: 2px; background-color: #7cb305" orientation="left" dashed>
      时间戳
    </a-divider>
    <div class="mt-24">
      <!-- <span class="ts-28 t-center w-full inline-block"></span> -->
      <a-input
        v-model:value="timestamp"
        class="h-42 ts-28"
        maxlength="13"
        size="large"
        :bordered="false"
      />
      <!-- (timestamp.toString().length + 1) -->
      <div
        class="h-1"
        style="border-bottom: 4px solid black"
        :style="{width: `${13 * 20}px`}"
      ></div>
      <!-- <a-select v-model:value="time_type">
        <a-select-option v-for="item in ['毫秒', '秒']" :key="item" :value="item" />
      </a-select> -->
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {life_cycle} from '@/hooks/mod'
import {None, Option, Some} from '@/utils/mod'
import day from 'dayjs'

const now = ref(day().format('HH:mm:ss'))
const now_day_info = ref(day().format('YYYY年 MM月 DD日 星期d'))
let time_key: Option<number | NodeJS.Timer> = None
const update_time = () => {
  now.value = day().format('HH:mm:ss')
}
life_cycle('Mounted', () => {
  time_key = Some(setInterval(update_time, 1000))
})
life_cycle('Unmounted', () => {
  clearInterval(time_key.unwarp())
})
const comp_date = computed(() => {
  if (timestamp.value.toString().length === 10 || timestamp.value.toString().length === 13) {
    return day(timestamp.value).format('YYYY-MM-DD HH:mm:ss:SSS')
  } else {
    return ''
  }
})
const time_type = ref<'秒' | '毫秒'>('毫秒')
const timestamp = ref(new Date().getTime())
</script>

<!------------------------------>

<style scoped lang="scss"></style>
