<!-- Desc : 导航条 -->
<template>
  <div
    class="h-full w-full px-8 us-none"
    @dragenter="dragenter"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="h-30"></div>
    <div
      v-for="(item, index) in routes_list"
      class="radius-large flex box-center h-40 w-full mb-8 color-white pointer"
      :key="index"
      :class="route.path == item.path ? 'select' : 'no-select'"
      @click="to_router(item)"
    >
      <div>
        <span class="font-ms">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
//import
import {routes, RouteType} from '@/router/routes'
import {Own} from '@/utils/FP/mod'

import {option} from '@/utils/mod'
import {RouteRecordRaw} from 'vue-router'

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

//props
const router = useRouter()
const route = useRoute()
router.push(route.path)

// const props = defineProps<Props>()
//emit
const emit = defineEmits([])

const routes_list = ref(
  routes.map((item) => {
    delete item.component
    return item
  }),
)

const to_router = (route: RouteRecordRaw) => {
  Own(route.meta!.type as RouteType)
    .map((val) => val == 'father' || val == 'single')
    .match(() => {
      //去除children
      routes_list.value = routes.map((item) => {
        delete item.component
        return item
      })
      //加上自己的children
      option(route.children).map((children) => {
        const index = routes_list.value.findIndex((item) => item.name == route.name)
        routes_list.value = [
          ...routes_list.value.slice(0, index + 1),
          ...children,
          ...routes_list.value.slice(index + 1),
        ]
      })
    })
  router.push(route.path)
}

//hooks
</script>

<!------------------------------>

<style scoped lang="scss">
.select {
  background: #3755dc;
}
.no-select {
  background: rgb(17, 12, 97);
  background: linear-gradient(
    90deg,
    rgba(17, 12, 97, 1) 0%,
    rgba(11, 11, 139, 1) 10%,
    rgba(7, 55, 151, 1) 18%,
    rgba(0, 212, 255, 0.8884147408963585) 100%
  );
}
</style>
