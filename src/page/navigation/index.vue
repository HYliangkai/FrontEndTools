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
      class="radius-large row-center h-43 w-full mb-8 color-333 pointer"
      :key="index"
      :class="route.path == item.path ? 'select' : 'no-select'"
      @click="to_router(item)"
    >
      <div class="w-36 shrink-0 box-center">
        <Svger :name="item.meta?.icon ?? ''" />
      </div>
      <div class="flex-1 box-center">
        <span class="font-ms">{{ item.name }}</span>
      </div>
      <div class="w-28 shrink-0">
        <DownOutlined
          v-if="
            option(item.meta?.type)
              .map((i) => i == 'father' && now_father(item.name as string))
              .unwrap_or(false)
          "
          class="ts-12"
        />
      </div>
    </div>
  </div>
</template>

<!------------------------------>

<script setup lang="ts">
import {DownOutlined} from '@ant-design/icons-vue'
import {routes, RouteType} from '@/router/routes'
import {Own} from '@/utils/mod'
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

const now_father = (name: string) =>
  option(route.meta?.father)
    .map((it) => {
      return it == name
    })
    .unwrap_or(false)

//hooks
</script>

<!------------------------------>

<style scoped lang="scss">
.select {
  background: rgb(233, 244, 254);
}
.no-select {
  background: rgba(0, 0, 0, 0.1);
}
</style>
