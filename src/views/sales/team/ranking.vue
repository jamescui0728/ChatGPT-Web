<script setup lang="ts">
import { ref } from 'vue'
import {
  NAvatar,
  NCard,
  NProgress,
  NSelect,
  NTabPane,
  NTabs,
} from 'naive-ui'

// 时间筛选
const timeRange = ref('month')
const timeOptions = [
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' },
  { label: '本年', value: 'year' },
]

// 销售排行数据
const salesRanking = ref([
  { rank: 1, name: '张明', avatar: 'zhang', amount: 32580000, deals: 12, target: 95, trend: 'up' },
  { rank: 2, name: '李华', avatar: 'li', amount: 28960000, deals: 10, target: 88, trend: 'up' },
  { rank: 3, name: '王芳', avatar: 'wang', amount: 25430000, deals: 9, target: 82, trend: 'down' },
  { rank: 4, name: '赵强', avatar: 'zhao', amount: 21890000, deals: 8, target: 75, trend: 'up' },
  { rank: 5, name: '刘伟', avatar: 'liu', amount: 18650000, deals: 7, target: 68, trend: 'same' },
  { rank: 6, name: '陈丽', avatar: 'chen', amount: 5680000, deals: 2, target: 45, trend: 'up' },
])

// 成交排行数据
const dealRanking = ref([
  { rank: 1, name: '张明', avatar: 'zhang', deals: 12, customers: 45 },
  { rank: 2, name: '李华', avatar: 'li', deals: 10, customers: 38 },
  { rank: 3, name: '王芳', avatar: 'wang', deals: 9, customers: 32 },
  { rank: 4, name: '赵强', avatar: 'zhao', deals: 8, customers: 28 },
  { rank: 5, name: '刘伟', avatar: 'liu', deals: 7, customers: 25 },
  { rank: 6, name: '陈丽', avatar: 'chen', deals: 2, customers: 12 },
])

// 客户排行数据
const customerRanking = ref([
  { rank: 1, name: '张明', avatar: 'zhang', newCustomers: 28, followRate: 95 },
  { rank: 2, name: '李华', avatar: 'li', newCustomers: 24, followRate: 92 },
  { rank: 3, name: '王芳', avatar: 'wang', newCustomers: 22, followRate: 88 },
  { rank: 4, name: '赵强', avatar: 'zhao', newCustomers: 18, followRate: 85 },
  { rank: 5, name: '刘伟', avatar: 'liu', newCustomers: 15, followRate: 82 },
  { rank: 6, name: '陈丽', avatar: 'chen', newCustomers: 8, followRate: 75 },
])

// 格式化金额
const formatAmount = (value: number) => {
  if (value >= 100000000)
    return `${(value / 100000000).toFixed(2)}亿`
  else if (value >= 10000)
    return `${(value / 10000).toFixed(0)}万`

  return value.toString()
}

// 获取排名样式
const getRankClass = (rank: number) => {
  if (rank === 1)
    return 'gold'
  if (rank === 2)
    return 'silver'
  if (rank === 3)
    return 'bronze'
  return ''
}

// 获取趋势图标
const getTrendIcon = (trend: string) => {
  if (trend === 'up')
    return '↑'
  if (trend === 'down')
    return '↓'
  return '-'
}
</script>

<template>
  <div class="ranking-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>业绩排行</h1>
        <p>团队成员业绩排名统计</p>
      </div>
      <div class="header-actions">
        <NSelect
          v-model:value="timeRange"
          :options="timeOptions"
          style="width: 120px"
        />
      </div>
    </div>

    <!-- 排行榜 Top3 -->
    <div class="top-three">
      <div class="top-item second">
        <div class="rank-badge">
          2
        </div>
        <NAvatar
          round
          :size="80"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${salesRanking[1].avatar}`"
        />
        <div class="name">
          {{ salesRanking[1].name }}
        </div>
        <div class="amount">
          ¥{{ formatAmount(salesRanking[1].amount) }}
        </div>
        <div class="deals">
          {{ salesRanking[1].deals }}套
        </div>
      </div>
      <div class="top-item first">
        <div class="crown">
          👑
        </div>
        <div class="rank-badge">
          1
        </div>
        <NAvatar
          round
          :size="100"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${salesRanking[0].avatar}`"
        />
        <div class="name">
          {{ salesRanking[0].name }}
        </div>
        <div class="amount">
          ¥{{ formatAmount(salesRanking[0].amount) }}
        </div>
        <div class="deals">
          {{ salesRanking[0].deals }}套
        </div>
      </div>
      <div class="top-item third">
        <div class="rank-badge">
          3
        </div>
        <NAvatar
          round
          :size="80"
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${salesRanking[2].avatar}`"
        />
        <div class="name">
          {{ salesRanking[2].name }}
        </div>
        <div class="amount">
          ¥{{ formatAmount(salesRanking[2].amount) }}
        </div>
        <div class="deals">
          {{ salesRanking[2].deals }}套
        </div>
      </div>
    </div>

    <!-- 详细排行榜 -->
    <NCard class="ranking-card">
      <NTabs type="line">
        <!-- 销售额排行 -->
        <NTabPane name="sales" tab="销售额排行">
          <div class="ranking-list">
            <div
              v-for="item in salesRanking"
              :key="item.rank"
              class="ranking-item"
            >
              <div class="rank" :class="getRankClass(item.rank)">
                {{ item.rank }}
              </div>
              <NAvatar
                round
                :size="48"
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`"
              />
              <div class="info">
                <div class="name">
                  {{ item.name }}
                </div>
                <div class="deals">
                  成交 {{ item.deals }} 套
                </div>
              </div>
              <div class="trend" :class="item.trend">
                {{ getTrendIcon(item.trend) }}
              </div>
              <div class="stats">
                <div class="amount">
                  ¥{{ formatAmount(item.amount) }}
                </div>
                <NProgress
                  type="line"
                  :percentage="item.target"
                  :show-indicator="false"
                  :height="6"
                  :border-radius="3"
                  rail-color="#e5e7eb"
                  :fill-color="item.target >= 80 ? '#10b981' : '#f59e0b'"
                  style="width: 100px"
                />
                <div class="target-text">
                  目标完成 {{ item.target }}%
                </div>
              </div>
            </div>
          </div>
        </NTabPane>

        <!-- 成交量排行 -->
        <NTabPane name="deals" tab="成交量排行">
          <div class="ranking-list">
            <div
              v-for="item in dealRanking"
              :key="item.rank"
              class="ranking-item"
            >
              <div class="rank" :class="getRankClass(item.rank)">
                {{ item.rank }}
              </div>
              <NAvatar
                round
                :size="48"
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`"
              />
              <div class="info">
                <div class="name">
                  {{ item.name }}
                </div>
                <div class="deals">
                  跟进 {{ item.customers }} 位客户
                </div>
              </div>
              <div class="stats deals-stats">
                <div class="deals-value">
                  {{ item.deals }}
                </div>
                <div class="deals-label">
                  成交套数
                </div>
              </div>
            </div>
          </div>
        </NTabPane>

        <!-- 客户开发排行 -->
        <NTabPane name="customers" tab="客户开发排行">
          <div class="ranking-list">
            <div
              v-for="item in customerRanking"
              :key="item.rank"
              class="ranking-item"
            >
              <div class="rank" :class="getRankClass(item.rank)">
                {{ item.rank }}
              </div>
              <NAvatar
                round
                :size="48"
                :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`"
              />
              <div class="info">
                <div class="name">
                  {{ item.name }}
                </div>
                <div class="deals">
                  跟进率 {{ item.followRate }}%
                </div>
              </div>
              <div class="stats customer-stats">
                <div class="customer-value">
                  {{ item.newCustomers }}
                </div>
                <div class="customer-label">
                  新增客户
                </div>
              </div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped lang="less">
.ranking-page {
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
}

.top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  padding: 40px 0;
  margin-bottom: 24px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 20px;

  .top-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }

    .crown {
      position: absolute;
      top: -20px;
      font-size: 32px;
      animation: bounce 2s infinite;
    }

    .rank-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: 700;
      font-size: 14px;
    }

    &.first {
      padding: 32px 40px;

      .rank-badge {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
      }
    }

    &.second .rank-badge {
      background: linear-gradient(135deg, #94a3b8, #64748b);
      color: white;
    }

    &.third .rank-badge {
      background: linear-gradient(135deg, #d97706, #b45309);
      color: white;
    }

    .name {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-top: 12px;
    }

    .amount {
      font-size: 20px;
      font-weight: 700;
      color: #f59e0b;
      margin-top: 8px;
    }

    .deals {
      font-size: 14px;
      color: #6b7280;
      margin-top: 4px;
    }
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.ranking-card {
  .ranking-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
  }

  .ranking-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      background: #f3f4f6;
    }

    .rank {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      border-radius: 8px;
      background: #e5e7eb;
      color: #6b7280;

      &.gold {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: white;
      }

      &.silver {
        background: linear-gradient(135deg, #94a3b8, #64748b);
        color: white;
      }

      &.bronze {
        background: linear-gradient(135deg, #d97706, #b45309);
        color: white;
      }
    }

    .info {
      flex: 1;

      .name {
        font-size: 16px;
        font-weight: 500;
        color: #1f2937;
      }

      .deals {
        font-size: 13px;
        color: #6b7280;
      }
    }

    .trend {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      border-radius: 50%;

      &.up {
        color: #10b981;
        background: #d1fae5;
      }

      &.down {
        color: #ef4444;
        background: #fee2e2;
      }

      &.same {
        color: #6b7280;
        background: #e5e7eb;
      }
    }

    .stats {
      text-align: right;
      min-width: 150px;

      .amount {
        font-size: 18px;
        font-weight: 700;
        color: #f59e0b;
        margin-bottom: 8px;
      }

      .target-text {
        font-size: 12px;
        color: #6b7280;
        margin-top: 4px;
      }

      &.deals-stats, &.customer-stats {
        .deals-value, .customer-value {
          font-size: 28px;
          font-weight: 700;
          color: #6366f1;
        }

        .deals-label, .customer-label {
          font-size: 13px;
          color: #6b7280;
        }
      }

      &.customer-stats .customer-value {
        color: #10b981;
      }
    }
  }
}
</style>
