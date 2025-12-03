import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'
import { SalesLayout } from '@/views/sales/layout'

const routes: RouteRecordRaw[] = [
  // 售楼系统登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/sales/login/index.vue'),
  },

  // 售楼系统主路由
  {
    path: '/',
    name: 'Root',
    component: SalesLayout,
    redirect: '/dashboard',
    children: [
      // 数据看板
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/sales/dashboard/index.vue'),
        meta: { title: '数据看板' },
      },

      // 楼盘管理
      {
        path: '/building/projects',
        name: 'building-projects',
        component: () => import('@/views/sales/building/projects.vue'),
        meta: { title: '项目列表' },
      },
      {
        path: '/building/blocks',
        name: 'building-blocks',
        component: () => import('@/views/sales/building/blocks.vue'),
        meta: { title: '楼栋管理' },
      },
      {
        path: '/building/units',
        name: 'building-units',
        component: () => import('@/views/sales/building/units.vue'),
        meta: { title: '房源管理' },
      },
      {
        path: '/building/sales-control',
        name: 'building-sales-control',
        component: () => import('@/views/sales/building/sales-control.vue'),
        meta: { title: '销控表' },
      },

      // 客户管理
      {
        path: '/customer/list',
        name: 'customer-list',
        component: () => import('@/views/sales/customer/list.vue'),
        meta: { title: '客户列表' },
      },
      {
        path: '/customer/follow',
        name: 'customer-follow',
        component: () => import('@/views/sales/customer/follow.vue'),
        meta: { title: '跟进记录' },
      },
      {
        path: '/customer/intention',
        name: 'customer-intention',
        component: () => import('@/views/sales/customer/list.vue'),
        meta: { title: '意向登记' },
      },

      // 销售管理
      {
        path: '/sales/subscription',
        name: 'sales-subscription',
        component: () => import('@/views/sales/transaction/subscription.vue'),
        meta: { title: '认购管理' },
      },
      {
        path: '/sales/contract',
        name: 'sales-contract',
        component: () => import('@/views/sales/transaction/contract.vue'),
        meta: { title: '签约管理' },
      },
      {
        path: '/sales/payment',
        name: 'sales-payment',
        component: () => import('@/views/sales/transaction/payment.vue'),
        meta: { title: '回款管理' },
      },

      // 团队管理
      {
        path: '/team/members',
        name: 'team-members',
        component: () => import('@/views/sales/team/members.vue'),
        meta: { title: '销售团队' },
      },
      {
        path: '/team/ranking',
        name: 'team-ranking',
        component: () => import('@/views/sales/team/ranking.vue'),
        meta: { title: '业绩排行' },
      },

      // 报表中心
      {
        path: '/reports/sales',
        name: 'reports-sales',
        component: () => import('@/views/sales/dashboard/index.vue'),
        meta: { title: '销售报表' },
      },
      {
        path: '/reports/customer',
        name: 'reports-customer',
        component: () => import('@/views/sales/dashboard/index.vue'),
        meta: { title: '客户报表' },
      },
      {
        path: '/reports/payment',
        name: 'reports-payment',
        component: () => import('@/views/sales/dashboard/index.vue'),
        meta: { title: '回款报表' },
      },

      // 系统设置
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/sales/settings/index.vue'),
        meta: { title: '系统设置' },
      },
    ],
  },

  // 保留原有Chat路由
  {
    path: '/chat-old',
    name: 'ChatRoot',
    component: ChatLayout,
    redirect: '/chat-old/chat',
    children: [
      {
        path: '/chat-old/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
