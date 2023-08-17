import { RouteRecordRaw } from 'vue-router'

export type RouteType = 'father' | 'kid' | 'single'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/page/home/index.vue'),
    meta: {
      type: 'single' as RouteType
    }
  },
  {
    path: '/picture',
    name: '图片',
    redirect: '/picture/base',
    meta: {
      type: 'father' as RouteType
    },
    children: [
      {
        path: '/picture/base',
        name: '图片转base64',
        component: () => import('@/page/picture/base2Pic/index.vue'),
        meta: {
          type: 'kid' as RouteType
        }
      }
    ],
  },
  {
    path: '/time',
    name: '时间',
    component: () => import('@/page/time/index.vue'),
    meta: {
      type: 'single' as RouteType
    }
  },
  {
    path: '/gpt',
    name: "GPT",
    component: () => import('@/page/gpt/index.vue'),
    meta: {
      type: 'single' as RouteType
    }
  }
]