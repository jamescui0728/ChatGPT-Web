<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  NAvatar,
  NBadge,
  NButton,
  NDropdown,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NSpace,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useIconRender } from '@/hooks/useIconRender'

const router = useRouter()
const collapsed = ref(false)
const activeKey = ref('dashboard')
const { iconRender } = useIconRender()

// 菜单配置
const menuOptions: MenuOption[] = [
  {
    label: '数据看板',
    key: 'dashboard',
    icon: iconRender({ icon: 'ri:dashboard-3-line' }),
  },
  {
    label: '楼盘管理',
    key: 'building',
    icon: iconRender({ icon: 'ri:building-4-line' }),
    children: [
      { label: '项目列表', key: 'building-projects' },
      { label: '楼栋管理', key: 'building-blocks' },
      { label: '房源管理', key: 'building-units' },
      { label: '销控表', key: 'building-sales-control' },
    ],
  },
  {
    label: '客户管理',
    key: 'customer',
    icon: iconRender({ icon: 'ri:user-heart-line' }),
    children: [
      { label: '客户列表', key: 'customer-list' },
      { label: '跟进记录', key: 'customer-follow' },
      { label: '意向登记', key: 'customer-intention' },
    ],
  },
  {
    label: '销售管理',
    key: 'sales',
    icon: iconRender({ icon: 'ri:money-cny-circle-line' }),
    children: [
      { label: '认购管理', key: 'sales-subscription' },
      { label: '签约管理', key: 'sales-contract' },
      { label: '回款管理', key: 'sales-payment' },
    ],
  },
  {
    label: '团队管理',
    key: 'team',
    icon: iconRender({ icon: 'ri:team-line' }),
    children: [
      { label: '销售团队', key: 'team-members' },
      { label: '业绩排行', key: 'team-ranking' },
    ],
  },
  {
    label: '报表中心',
    key: 'reports',
    icon: iconRender({ icon: 'ri:file-chart-line' }),
    children: [
      { label: '销售报表', key: 'reports-sales' },
      { label: '客户报表', key: 'reports-customer' },
      { label: '回款报表', key: 'reports-payment' },
    ],
  },
  {
    label: '系统设置',
    key: 'settings',
    icon: iconRender({ icon: 'ri:settings-3-line' }),
  },
]

// 用户下拉菜单
const userOptions = [
  { label: '个人信息', key: 'profile' },
  { label: '修改密码', key: 'password' },
  { type: 'divider', key: 'd1' },
  { label: '退出登录', key: 'logout' },
]

const handleMenuUpdate = (key: string) => {
  activeKey.value = key
  router.push({ name: key })
}

const handleUserAction = (key: string) => {
  if (key === 'logout')
    router.push('/login')
}
</script>

<template>
  <NLayout class="h-full" has-sider>
    <!-- 侧边栏 -->
    <NLayoutSider
      bordered
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      show-trigger
      class="sales-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <!-- Logo区域 -->
      <div class="logo-wrapper" :class="{ collapsed }">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path
              fill="currentColor"
              d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3zm0 2.84L18 11v8h-2v-6H8v6H6v-8l6-5.16z"
            />
          </svg>
        </div>
        <transition name="fade">
          <span v-if="!collapsed" class="logo-text">明源售楼系统</span>
        </transition>
      </div>

      <!-- 导航菜单 -->
      <NMenu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        class="sales-menu"
        @update:value="handleMenuUpdate"
      />
    </NLayoutSider>

    <!-- 右侧主区域 -->
    <NLayout>
      <!-- 顶部导航 -->
      <NLayoutHeader bordered class="header-wrapper">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="project-name">🏠 阳光城·未来悦</span>
            <span class="divider">/</span>
            <span class="current-page">数据看板</span>
          </div>
        </div>

        <div class="header-right">
          <NSpace :size="20" align="center">
            <!-- 快捷操作 -->
            <NButton type="primary" size="small" class="quick-action">
              + 新增客户
            </NButton>
            <NButton size="small" class="quick-action secondary">
              + 新增认购
            </NButton>

            <!-- 消息通知 -->
            <NBadge :value="5" :max="99">
              <NButton quaternary circle>
                <template #icon>
                  <NIcon size="20">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                      />
                    </svg>
                  </NIcon>
                </template>
              </NButton>
            </NBadge>

            <!-- 用户信息 -->
            <NDropdown
              :options="userOptions"
              trigger="click"
              @select="handleUserAction"
            >
              <div class="user-info">
                <NAvatar
                  round
                  size="small"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=sales"
                />
                <span class="user-name">张三</span>
                <span class="user-role">销售经理</span>
              </div>
            </NDropdown>
          </NSpace>
        </div>
      </NLayoutHeader>

      <!-- 主内容区 -->
      <NLayoutContent class="content-wrapper">
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped lang="less">
.sales-sider {
  background: linear-gradient(180deg, #1a1f2e 0%, #0d1117 100%);

  :deep(.n-layout-sider-scroll-container) {
    background: transparent;
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;

  &.collapsed {
    justify-content: center;
    padding: 20px 16px;
  }

  .logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border-radius: 10px;
    color: white;
    flex-shrink: 0;
  }

  .logo-text {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    letter-spacing: 1px;
  }
}

.sales-menu {
  background: transparent;
  padding: 12px 8px;

  :deep(.n-menu-item) {
    margin: 4px 0;
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
    }
  }

  :deep(.n-menu-item-content) {
    color: rgba(255, 255, 255, 0.75);

    &:hover {
      color: #fff;
    }

    &::before {
      border-radius: 8px;
    }
  }

  :deep(.n-menu-item-content--selected) {
    color: #fff;
    background: linear-gradient(90deg, rgba(245, 158, 11, 0.2) 0%, transparent 100%);

    &::before {
      background: transparent;
      border-left: 3px solid #f59e0b;
      border-radius: 0;
    }
  }

  :deep(.n-submenu-children) {
    .n-menu-item {
      padding-left: 24px;
    }
  }
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.header-left {
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .project-name {
      color: #f59e0b;
      font-weight: 500;
    }

    .divider {
      color: #d1d5db;
    }

    .current-page {
      color: #374151;
    }
  }
}

.header-right {
  .quick-action {
    border-radius: 6px;
    font-weight: 500;

    &.secondary {
      background: #f3f4f6;
      color: #374151;
      border: none;

      &:hover {
        background: #e5e7eb;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover {
      background: #f3f4f6;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .user-role {
      font-size: 12px;
      color: #9ca3af;
      padding: 2px 8px;
      background: #f3f4f6;
      border-radius: 4px;
    }
  }
}

.content-wrapper {
  padding: 24px;
  background: #f8fafc;
  min-height: calc(100vh - 60px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
