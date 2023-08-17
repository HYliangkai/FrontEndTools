<!-- Desc : 时间 -->
<template>
  <div class="h-full w-full y-auto px-24">
    <div class="py-24">
      <div class="t-center font-ms" style="font-size: 144px">{{ now }}</div>
      <div class="row-end color-font ts-28 mt-12">{{ now_day_info }}</div>
    </div>
    <a-divider style="height: 2px" orientation="left">时间戳</a-divider>
    <div class="mt-32 relative">
      <!-- <span class="ts-28 t-center w-full inline-block"></span> -->
      <a-input
        v-model:value="timestamp"
        class="h-42 ts-28 font-ms z-index-10"
        maxlength="13"
        size="large"
        :bordered="false"
      />
      <div
        class="h-6 radius-round z-index-1"
        style="background: #e58860"
        :style="{width: `${13 * 18.5}px`}"
      ></div>
      <img
        src="../../assets/images/arrow2.png"
        width="250"
        height="250"
        alt="🈚️"
        class="absolute z-index-1 us-none"
        style="top: -17px; left: 10%; rotate: 70deg"
      />
    </div>
    <div class="mt-50">
      <div class="h-42 ts-28 row-end font-ms">{{ comp_date }}</div>
      <div class="row-end">
        <div
          class="h-6 radius-round"
          style="background: #e58860"
          :style="{width: `${13 * 31}px`}"
        ></div>
      </div>
    </div>

    <div class="mt-30 relative">
      <a-input
        v-model:value="date"
        class="h-42 ts-28 font-ms z-index-10"
        maxlength="25"
        size="large"
        :bordered="false"
      />
      <div
        class="h-6 radius-round z-index-1"
        style="background: #ee7e6e"
        :style="{width: `${13 * 31}px`}"
      ></div>
      <img
        src="../../assets/images/arrow3.png"
        width="200"
        height="200"
        alt="🈚️"
        class="absolute z-index-1 us-none"
        style="top: 4px; left: 40%; rotate: 70deg"
      />
    </div>
    <div class="mt-80">
      <div class="h-42 ts-28 row-end font-ms">{{ comp_timestamp }}</div>
      <div class="row-end">
        <div
          class="h-6 radius-round"
          style="background: #ee7e6e"
          :style="{width: `${13 * 18.5}px`}"
        ></div>
      </div>
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {life_cycle} from '@/hooks/mod'
import {Own} from '@/utils/FP/mod'
import {None, Option, Some} from '@/utils/mod'
import {C} from '@tauri-apps/api/event-41a9edf5'
import {SelectProps} from 'ant-design-vue'
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

const timestamp = ref(new Date().getTime())
const comp_date = computed(() =>
  Own(timestamp.value.toString().length)
    .is_match([10, 13], false)
    .match_map(
      () => day(timestamp.value).format('YYYY年MM月DD日 HH:mm:ss:SSS'),
      () => '',
    )
    .take(),
)

const date_format = ref([
  'YYYY年MM月DD日 HH:mm:ss:SSS',
  'YYYY年MM月DD日 HH:mm:ss',
  'YYYY年MM月DD日',
  'YYYY-MM-DD HH:mm:ss:SSS',
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD',
  'YYYY/MM/DD HH:mm:ss:SSS',
  'YYYY/MM/DD HH:mm:ss',
  'YYYY/MM/DD',
])

const date = ref(day().format('YYYY年MM月DD日 HH:mm:ss:SSS'))
const comp_timestamp = computed(() =>
  Own(day(date.value, date_format.value, 'zh-cn').valueOf())
    .is_nan()
    .match_map(
      () => '',
      () => String(day(date.value, date_format.value, 'zh-cn').valueOf()),
    )
    .take(),
)
</script>

<style scoped lang="scss"></style>
