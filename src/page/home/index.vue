<!-- Desc : 默认主页 -->
<template>
  <div class="h-full w-full home font-kaiti box-center">
    <div class="desc-home" id="chartdom">
      <img width="200" height="200" class="desc-home" src="../../assets/images/avg.png" alt="" />
      <div class="t-center mt-32 ts-28 t-bold">工具箱</div>
      <!-- 查看内存占用 cpu温度 风扇转速  -->
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {init} from 'echarts'
import {invoke} from '@tauri-apps/api'
import {SystemInfo} from '@/interface/System'
import {life_cycle} from '@/hooks/lifeCycle'
import {None, Option, Some, option} from '@/utils/mod'

const set_system_info = () => {
  invoke<SystemInfo>('get_system_info').then((res) => {
    options.series[0].data[0].value = Math.round(res.cpu_usage)
    options.series[0].data[1].value = Math.round((res.mem_used / res.mem_total) * 100)
    update_chart()
  })
}
let time: Option<NodeJS.Timer> = None
life_cycle('Mounted', () => {
  time = Some(setInterval(set_system_info, 3444))
})
life_cycle('Unmounted', () => {
  time.some_do((item) => {
    clearInterval(item)
  })
})

const options = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
        },
      },
      axisLine: {
        lineStyle: {
          width: 40,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [
        {
          value: 0,
          name: `CPU
          `,
          title: {
            offsetCenter: ['0%', '-30%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%'],
          },
        },
        {
          value: 0,
          name: `Memory
          `,
          title: {
            offsetCenter: ['0%', '0%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
          },
        },
        // {
        //   value: 0,
        //   name: 'Disk',
        //   title: {
        //     offsetCenter: ['0%', '30%'],
        //   },
        //   detail: {
        //     valueAnimation: true,
        //     offsetCenter: ['0%', '40%'],
        //   },
        // },
      ],
      title: {
        fontSize: 14,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: 'inherit',
        borderColor: 'inherit',
        borderRadius: 20,
        borderWidth: 1,
        formatter: '{value}%',
      },
    },
  ],
}
let chart: Option<any> = None
life_cycle('Mounted', () => {
  chart = Some(
    init(document.getElementById('chartdom'), '', {
      width: 500,
      height: 500,
    }),
  )
  set_system_info()
})
const update_chart = () => {
  chart.some_do((item) => {
    item.setOption(options)
  })
}
</script>

<!------------------------------>

<style scoped lang="scss">
.desc-home {
  display: block;
  border-radius: 50%;
  box-shadow: 4.5px 4.6px 2.4px rgba(0, 0, 0, 0.01), 12.5px 12.6px 7.7px rgba(0, 0, 0, 0.018),
    30.1px 30.4px 20.1px rgba(0, 0, 0, 0.025), 100px 101px 80px rgba(0, 0, 0, 0.04);
}
</style>
