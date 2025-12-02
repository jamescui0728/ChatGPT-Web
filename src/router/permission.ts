import type { Router } from 'vue-router'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (_to, _from, next) => {
    // 售楼系统：跳过原有的session验证，直接放行
    next()
  })
}
