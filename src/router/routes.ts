import {L} from '@tauri-apps/api/event-41a9edf5'
import {RouteRecordRaw} from 'vue-router'

export type RouteType = 'father' | 'kid' | 'single'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/page/home/index.vue'),
    meta: {
      icon: 'home',
      type: 'single' as RouteType,
    },
  },
  {
    path: '/picture',
    name: 'Picture',
    redirect: '/picture/base',
    meta: {
      icon: 'picture',
      type: 'father' as RouteType,
    },
    children: [
      {
        path: '/picture/base',
        name: 'PictureToBase',
        component: () => import('@/page/picture/base2Pic/index.vue'),
        meta: {
          father: 'Picture',
          type: 'kid' as RouteType,
        },
      },
    ],
  },
  {
    path: '/time',
    name: 'Time',
    component: () => import('@/page/time/index.vue'),
    meta: {
      icon: 'time',
      type: 'single' as RouteType,
    },
  },
  {
    path: '/color',
    name: 'Color',
    redirect: '/color/fastCompute',
    meta: {
      icon: 'color',
      type: 'father' as RouteType,
    },
    children: [
      {
        path: '/color/fastCompute',
        name: 'FastComputeColor',
        component: () => import('@/page/color/fastCompute/index.vue'),
        meta: {
          father: 'Color',
          type: 'kid' as RouteType,
        },
      },
    ],
  },
  {
    path: '/regexp',
    name: 'RegExp',
    component: () => import('@/page/regExp/index.vue'),
    meta: {
      icon: 'exp',
      type: 'single' as RouteType,
    },
  },
  {
    path: '/css',
    name: 'CSS',
    redirect: '/css/changeGradually',
    meta: {
      icon: 'css',
      type: 'father' as RouteType,
    },
    children: [
      {
        path: '/css/changeGradually',
        name: 'ChangeGradually',
        component: () => import('@/page/css/changeGradually/index.vue'),
        meta: {
          father: 'CSS',
          type: 'kid' as RouteType,
        },
      },
      {
        path: '/css/shadow',
        name: 'Shadow',
        component: () => import('@/page/css/shadow/index.vue'),
        meta: {
          father: 'CSS',
          type: 'kid' as RouteType,
        },
      },
      {
        path: '/css/glass',
        name: 'Glass',
        component: () => import('@/page/css/glass/index.vue'),
        meta: {
          father: 'CSS',
          type: 'kid' as RouteType,
        },
      },
    ],
  },
  {
    path: '/curl',
    name: 'Curl',
    component: () => import('@/page/curl/index.vue'),
    meta: {
      icon: 'curl',
      type: 'single' as RouteType,
    },
  },
  {
    path: '/other',
    name: 'Other',
    redirect: '/other/diff',
    meta: {
      icon: 'other',
      type: 'father' as RouteType,
    },
    children: [
      {
        path: '/other/diff',
        name: 'Diff',
        component: () => import('@/page/other/diff/index.vue'),
        meta: {
          father: 'Other',
          type: 'kid' as RouteType,
        },
      },
      {
        path: '/other/fullAngle',
        name: 'FullAngle',
        component: () => import('@/page/other/fullAngle/index.vue'),
        meta: {
          father: 'Other',
          type: 'kid' as RouteType,
        },
      },
    ],
  },
]
