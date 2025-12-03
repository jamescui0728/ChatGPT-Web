<script setup lang="ts">
import { ref } from 'vue'
import {
  NAvatar,
  NButton,
  NCard,
  NGi,
  NGrid,
  NProgress,
  NTabPane,
  NTabs,
  NTag,
} from 'naive-ui'

// 概览数据
const overviewData = ref([
  {
    title: '本月认购金额',
    value: 125680000,
    prefix: '¥',
    suffix: '',
    trend: 12.5,
    icon: '💰',
    color: '#f59e0b',
  },
  {
    title: '本月签约金额',
    value: 98450000,
    prefix: '¥',
    suffix: '',
    trend: 8.3,
    icon: '📝',
    color: '#10b981',
  },
  {
    title: '本月回款金额',
    value: 76230000,
    prefix: '¥',
    suffix: '',
    trend: -3.2,
    icon: '💵',
    color: '#6366f1',
  },
  {
    title: '新增客户',
    value: 486,
    prefix: '',
    suffix: '人',
    trend: 15.8,
    icon: '👥',
    color: '#ec4899',
  },
])

// 销售排行数据
const salesRankingData = ref([
  { rank: 1, name: '张明', avatar: 'zhang', amount: 32580000, deals: 12, target: 95 },
  { rank: 2, name: '李华', avatar: 'li', amount: 28960000, deals: 10, target: 88 },
  { rank: 3, name: '王芳', avatar: 'wang', amount: 25430000, deals: 9, target: 82 },
  { rank: 4, name: '赵强', avatar: 'zhao', amount: 21890000, deals: 8, target: 75 },
  { rank: 5, name: '刘伟', avatar: 'liu', amount: 18650000, deals: 7, target: 68 },
])

// 最新动态
const recentActivities = ref([
  { type: 'subscription', customer: '陈先生', unit: '1栋-12-1201', amount: 2580000, time: '10分钟前', status: 'success' },
  { type: 'contract', customer: '李女士', unit: '2栋-8-0803', amount: 1980000, time: '30分钟前', status: 'success' },
  { type: 'payment', customer: '王先生', unit: '1栋-15-1502', amount: 500000, time: '1小时前', status: 'pending' },
  { type: 'visit', customer: '张女士', unit: '-', amount: 0, time: '2小时前', status: 'info' },
  { type: 'subscription', customer: '赵先生', unit: '3栋-6-0601', amount: 3280000, time: '3小时前', status: 'success' },
])

// 房源统计
const unitStats = ref([
  { label: '在售', value: 286, color: '#10b981' },
  { label: '已认购', value: 142, color: '#f59e0b' },
  { label: '已签约', value: 89, color: '#6366f1' },
  { label: '已售罄', value: 45, color: '#9ca3af' },
])

// 待办事项
const todoItems = ref([
  { id: 1, title: '陈先生认购合同待审核', priority: 'high', time: '今天 14:00' },
  { id: 2, title: '李女士首付款到账确认', priority: 'medium', time: '今天 15:30' },
  { id: 3, title: '王先生看房预约', priority: 'low', time: '明天 10:00' },
  { id: 4, title: '月度销售会议', priority: 'high', time: '明天 14:00' },
])

// 格式化金额
const formatAmount = (value: number) => {
  if (value >= 100000000)
    return `${(value / 100000000).toFixed(2)}亿`
  else if (value >= 10000)
    return `${(value / 10000).toFixed(0)}万`

  return value.toString()
}

// 获取活动类型标签
const getActivityType = (type: string) => {
  const types: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' }> = {
    subscription: { label: '认购', type: 'warning' },
    contract: { label: '签约', type: 'success' },
    payment: { label: '回款', type: 'info' },
    visit: { label: '来访', type: 'info' },
  }
  return types[type] || { label: '其他', type: 'info' }
}

// 获取优先级样式
const getPriorityStyle = (priority: string) => {
  const styles: Record<string, { color: string; bg: string }> = {
    high: { color: '#ef4444', bg: '#fef2f2' },
    medium: { color: '#f59e0b', bg: '#fffbeb' },
    low: { color: '#10b981', bg: '#ecfdf5' },
  }
  return styles[priority] || styles.low
}
</script>

<template>
  <div class="dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <h1>数据看板</h1>
        <p>实时掌握销售动态，驱动业绩增长</p>
      </div>
      <div class="header-actions">
        <NButton>导出报表</NButton>
        <NButton type="primary">
          刷新数据
        </NButton>
      </div>
    </div>

    <!-- 概览卡片 -->
    <NGrid :cols="4" :x-gap="20" :y-gap="20" class="overview-grid">
      <NGi v-for="item in overviewData" :key="item.title">
        <div class="stat-card" :style="{ '--accent-color': item.color }">
          <div class="stat-icon">
            {{ item.icon }}
          </div>
          <div class="stat-content">
            <div class="stat-label">
              {{ item.title }}
            </div>
            <div class="stat-value">
              <span class="prefix">{{ item.prefix }}</span>
              <span class="number">{{ formatAmount(item.value) }}</span>
              <span class="suffix">{{ item.suffix }}</span>
            </div>
            <div class="stat-trend" :class="{ negative: item.trend < 0 }">
              <span class="trend-icon">{{ item.trend >= 0 ? '↑' : '↓' }}</span>
              <span>{{ Math.abs(item.trend) }}%</span>
              <span class="trend-text">较上月</span>
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- 主要内容区 -->
    <NGrid :cols="3" :x-gap="20" :y-gap="20" class="main-grid">
      <!-- 销售趋势图表 -->
      <NGi :span="2">
        <NCard title="销售趋势" class="chart-card">
          <template #header-extra>
            <NTabs type="segment" size="small">
              <NTabPane name="week" tab="本周" />
              <NTabPane name="month" tab="本月" />
              <NTabPane name="year" tab="本年" />
            </NTabs>
          </template>
          <div class="chart-placeholder">
            <!-- 模拟图表 -->
            <svg viewBox="0 0 400 200" class="trend-chart">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0" />
                </linearGradient>
              </defs>
              <!-- 背景网格 -->
              <g class="grid">
                <line v-for="i in 5" :key="i" :x1="0" :y1="i * 40" :x2="400" :y2="i * 40" stroke="#e5e7eb" stroke-width="1" />
              </g>
              <!-- 数据区域 -->
              <path d="M0,160 L50,140 L100,100 L150,120 L200,80 L250,60 L300,90 L350,40 L400,50 L400,200 L0,200 Z" fill="url(#gradient)" />
              <!-- 数据线 -->
              <path d="M0,160 L50,140 L100,100 L150,120 L200,80 L250,60 L300,90 L350,40 L400,50" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" />
              <!-- 数据点 -->
              <circle cx="0" cy="160" r="5" fill="#f59e0b" />
              <circle cx="50" cy="140" r="5" fill="#f59e0b" />
              <circle cx="100" cy="100" r="5" fill="#f59e0b" />
              <circle cx="150" cy="120" r="5" fill="#f59e0b" />
              <circle cx="200" cy="80" r="5" fill="#f59e0b" />
              <circle cx="250" cy="60" r="5" fill="#f59e0b" />
              <circle cx="300" cy="90" r="5" fill="#f59e0b" />
              <circle cx="350" cy="40" r="5" fill="#f59e0b" />
              <circle cx="400" cy="50" r="5" fill="#f59e0b" />
            </svg>
            <div class="chart-labels">
              <span>周一</span>
              <span>周二</span>
              <span>周三</span>
              <span>周四</span>
              <span>周五</span>
              <span>周六</span>
              <span>周日</span>
            </div>
          </div>
        </NCard>
      </NGi>

      <!-- 房源统计 -->
      <NGi>
        <NCard title="房源统计" class="unit-stats-card">
          <template #header-extra>
            <span class="total-units">共 562 套</span>
          </template>
          <div class="unit-stats">
            <div class="stats-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" stroke-width="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="12"
                  stroke-dasharray="180 314"
                  stroke-dashoffset="-157"
                  stroke-linecap="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="12"
                  stroke-dasharray="80 314"
                  stroke-dashoffset="23"
                  stroke-linecap="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#6366f1"
                  stroke-width="12"
                  stroke-dasharray="50 314"
                  stroke-dashoffset="103"
                  stroke-linecap="round"
                />
              </svg>
              <div class="ring-center">
                <span class="rate">76%</span>
                <span class="label">去化率</span>
              </div>
            </div>
            <div class="stats-legend">
              <div v-for="stat in unitStats" :key="stat.label" class="legend-item">
                <span class="legend-dot" :style="{ background: stat.color }" />
                <span class="legend-label">{{ stat.label }}</span>
                <span class="legend-value">{{ stat.value }}套</span>
              </div>
            </div>
          </div>
        </NCard>
      </NGi>

      <!-- 销售排行 -->
      <NGi :span="2">
        <NCard title="销售排行" class="ranking-card">
          <template #header-extra>
            <NButton text type="primary">
              查看全部
            </NButton>
          </template>
          <div class="ranking-list">
            <div
              v-for="item in salesRankingData"
              :key="item.rank"
              class="ranking-item"
            >
              <div class="rank-badge" :class="`rank-${item.rank}`">
                {{ item.rank }}
              </div>
              <NAvatar
                round
                size="medium"
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`"
              />
              <div class="member-info">
                <div class="member-name">
                  {{ item.name }}
                </div>
                <div class="member-deals">
                  成交 {{ item.deals }} 套
                </div>
              </div>
              <div class="member-amount">
                <span class="amount">¥{{ formatAmount(item.amount) }}</span>
                <NProgress
                  type="line"
                  :percentage="item.target"
                  :show-indicator="false"
                  :height="4"
                  :border-radius="2"
                  rail-color="#e5e7eb"
                  :fill-color="item.target >= 80 ? '#10b981' : '#f59e0b'"
                  style="width: 80px"
                />
              </div>
            </div>
          </div>
        </NCard>
      </NGi>

      <!-- 待办事项 -->
      <NGi>
        <NCard title="待办事项" class="todo-card">
          <template #header-extra>
            <NButton text type="primary">
              +新增
            </NButton>
          </template>
          <div class="todo-list">
            <div v-for="item in todoItems" :key="item.id" class="todo-item">
              <div
                class="priority-dot"
                :style="{
                  background: getPriorityStyle(item.priority).color,
                }"
              />
              <div class="todo-content">
                <div class="todo-title">
                  {{ item.title }}
                </div>
                <div class="todo-time">
                  {{ item.time }}
                </div>
              </div>
              <NButton size="tiny" quaternary>
                完成
              </NButton>
            </div>
          </div>
        </NCard>
      </NGi>
    </NGrid>

    <!-- 最新动态 -->
    <NCard title="最新动态" class="activity-card">
      <template #header-extra>
        <NTabs type="segment" size="small">
          <NTabPane name="all" tab="全部" />
          <NTabPane name="subscription" tab="认购" />
          <NTabPane name="contract" tab="签约" />
          <NTabPane name="payment" tab="回款" />
        </NTabs>
      </template>
      <div class="activity-list">
        <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
          <div class="activity-type">
            <NTag :type="getActivityType(activity.type).type" size="small">
              {{ getActivityType(activity.type).label }}
            </NTag>
          </div>
          <div class="activity-detail">
            <span class="customer">{{ activity.customer }}</span>
            <span v-if="activity.type !== 'visit'" class="action">
              {{ activity.type === 'subscription' ? '认购' : activity.type === 'contract' ? '签约' : '付款' }}
            </span>
            <span v-else class="action">来访登记</span>
            <span v-if="activity.unit !== '-'" class="unit">{{ activity.unit }}</span>
          </div>
          <div v-if="activity.amount > 0" class="activity-amount">
            ¥{{ formatAmount(activity.amount) }}
          </div>
          <div class="activity-time">
            {{ activity.time }}
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped lang="less">
.dashboard {
  min-height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .header-content {
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 4px 0;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }
  }

  .header-actions {
    display: flex;
    gap: 12px;
  }
}

.overview-grid {
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }

  .stat-icon {
    font-size: 32px;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 15%, transparent), color-mix(in srgb, var(--accent-color) 5%, transparent));
    border-radius: 12px;
  }

  .stat-content {
    flex: 1;

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;

      .prefix {
        font-size: 18px;
        font-weight: 500;
      }

      .suffix {
        font-size: 14px;
        font-weight: 400;
        color: #6b7280;
        margin-left: 4px;
      }
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #10b981;

      &.negative {
        color: #ef4444;
      }

      .trend-icon {
        font-weight: 600;
      }

      .trend-text {
        color: #9ca3af;
        margin-left: 4px;
      }
    }
  }
}

.main-grid {
  margin-bottom: 20px;
}

.chart-card {
  height: 100%;

  .chart-placeholder {
    padding: 20px 0;

    .trend-chart {
      width: 100%;
      height: 200px;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      padding: 16px 20px 0;
      font-size: 12px;
      color: #9ca3af;
    }
  }
}

.unit-stats-card {
  height: 100%;

  .total-units {
    font-size: 14px;
    color: #6b7280;
  }

  .unit-stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 20px 0;

    .stats-ring {
      position: relative;
      width: 140px;
      height: 140px;

      svg {
        transform: rotate(-90deg);
      }

      .ring-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .rate {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
        }

        .label {
          font-size: 12px;
          color: #9ca3af;
        }
      }
    }

    .stats-legend {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      width: 100%;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #f9fafb;
        border-radius: 8px;

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-label {
          flex: 1;
          font-size: 13px;
          color: #6b7280;
        }

        .legend-value {
          font-size: 13px;
          font-weight: 600;
          color: #1f2937;
        }
      }
    }
  }
}

.ranking-card {
  .ranking-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ranking-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      background: #f3f4f6;
    }

    .rank-badge {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      background: #e5e7eb;
      color: #6b7280;

      &.rank-1 {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
      }

      &.rank-2 {
        background: linear-gradient(135deg, #94a3b8, #64748b);
        color: white;
      }

      &.rank-3 {
        background: linear-gradient(135deg, #d97706, #b45309);
        color: white;
      }
    }

    .member-info {
      flex: 1;

      .member-name {
        font-size: 14px;
        font-weight: 500;
        color: #1f2937;
      }

      .member-deals {
        font-size: 12px;
        color: #9ca3af;
      }
    }

    .member-amount {
      text-align: right;

      .amount {
        display: block;
        font-size: 15px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 6px;
      }
    }
  }
}

.todo-card {
  height: 100%;

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 10px;

    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .todo-content {
      flex: 1;

      .todo-title {
        font-size: 13px;
        color: #374151;
        margin-bottom: 2px;
      }

      .todo-time {
        font-size: 12px;
        color: #9ca3af;
      }
    }
  }
}

.activity-card {
  margin-top: 0;

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 12px;

    .activity-type {
      width: 60px;
    }

    .activity-detail {
      flex: 1;
      font-size: 14px;
      color: #374151;

      .customer {
        font-weight: 500;
      }

      .action {
        color: #6b7280;
        margin: 0 8px;
      }

      .unit {
        color: #f59e0b;
        font-weight: 500;
      }
    }

    .activity-amount {
      font-size: 15px;
      font-weight: 600;
      color: #10b981;
    }

    .activity-time {
      font-size: 13px;
      color: #9ca3af;
      min-width: 80px;
      text-align: right;
    }
  }
}
</style>
