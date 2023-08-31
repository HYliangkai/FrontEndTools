import {None, option} from '@/utils/mod'
import {life_cycle} from './lifeCycle'

export const watch_width = () => {
  const width = ref(0)
  const set_width = () => {
    nextTick(() => {
      width.value = option(document.getElementById('layout')?.clientWidth)
        .map((item) => item - option(document.getElementById('nav')?.clientWidth).unwrap_or(0))
        .unwrap_or(0)
    })
  }
  life_cycle('Mounted', () => {
    set_width()
    addEventListener('sider-change', set_width)
    // addEventListener('resize', set_width)
  })
  life_cycle('Unmounted', () => {
    removeEventListener('sider-change', set_width)
    // removeEventListener('resize', set_width)
  })
  return width
}
