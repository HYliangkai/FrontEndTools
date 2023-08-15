import { createRouter, createWebHashHistory, } from 'vue-router'
import { before_handle } from './before'
import { after_handle } from './after'
import { routes } from './routes'
console.log(routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(before_handle)
router.afterEach(after_handle)

export default router