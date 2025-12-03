<script setup lang="ts">
import { ref } from 'vue'
import {
  NAvatar,
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NGi,
  NGrid,
  NInput,
  NModal,
  NProgress,
  NSpace,
  NTag,
} from 'naive-ui'

// 团队成员数据
const teamMembers = ref([
  {
    id: 1,
    name: '张明',
    avatar: 'zhang',
    position: '销售经理',
    phone: '138****1234',
    email: 'zhangming@company.com',
    joinDate: '2022-03-15',
    monthlyTarget: 50000000,
    monthlyAchieved: 32580000,
    totalDeals: 12,
    totalCustomers: 45,
    status: 'active',
    level: 'senior',
  },
  {
    id: 2,
    name: '李华',
    avatar: 'li',
    position: '高级销售顾问',
    phone: '139****5678',
    email: 'lihua@company.com',
    joinDate: '2022-06-20',
    monthlyTarget: 40000000,
    monthlyAchieved: 28960000,
    totalDeals: 10,
    totalCustomers: 38,
    status: 'active',
    level: 'senior',
  },
  {
    id: 3,
    name: '王芳',
    avatar: 'wang',
    position: '销售顾问',
    phone: '137****9012',
    email: 'wangfang@company.com',
    joinDate: '2023-01-10',
    monthlyTarget: 30000000,
    monthlyAchieved: 25430000,
    totalDeals: 9,
    totalCustomers: 32,
    status: 'active',
    level: 'intermediate',
  },
  {
    id: 4,
    name: '赵强',
    avatar: 'zhao',
    position: '销售顾问',
    phone: '136****3456',
    email: 'zhaoqiang@company.com',
    joinDate: '2023-05-15',
    monthlyTarget: 25000000,
    monthlyAchieved: 21890000,
    totalDeals: 8,
    totalCustomers: 28,
    status: 'active',
    level: 'intermediate',
  },
  {
    id: 5,
    name: '刘伟',
    avatar: 'liu',
    position: '销售顾问',
    phone: '135****7890',
    email: 'liuwei@company.com',
    joinDate: '2023-08-01',
    monthlyTarget: 20000000,
    monthlyAchieved: 18650000,
    totalDeals: 7,
    totalCustomers: 25,
    status: 'active',
    level: 'junior',
  },
  {
    id: 6,
    name: '陈丽',
    avatar: 'chen',
    position: '实习销售',
    phone: '134****1122',
    email: 'chenli@company.com',
    joinDate: '2024-01-15',
    monthlyTarget: 10000000,
    monthlyAchieved: 5680000,
    totalDeals: 2,
    totalCustomers: 12,
    status: 'active',
    level: 'trainee',
  },
])

// 等级配置
const levelConfig: Record<string, { label: string; color: string }> = {
  senior: { label: '资深', color: '#f59e0b' },
  intermediate: { label: '中级', color: '#6366f1' },
  junior: { label: '初级', color: '#10b981' },
  trainee: { label: '实习', color: '#9ca3af' },
}

// 格式化金额
const formatAmount = (value: number) => {
  if (value >= 100000000)
    return `${(value / 100000000).toFixed(2)}亿`
  else if (value >= 10000)
    return `${(value / 10000).toFixed(0)}万`

  return value.toString()
}

// 计算完成率
const getAchievementRate = (achieved: number, target: number) => {
  return Math.round((achieved / target) * 100)
}

// 详情弹窗
const showDetailModal = ref(false)
const selectedMember = ref<any>(null)

// 查看详情
const handleViewDetail = (member: any) => {
  selectedMember.value = member
  showDetailModal.value = true
}
</script>

<template>
  <div class="team-members-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>销售团队</h1>
        <p>管理销售团队成员</p>
      </div>
      <div class="header-actions">
        <NInput placeholder="搜索成员..." style="width: 200px" />
        <NButton type="primary">
          + 添加成员
        </NButton>
      </div>
    </div>

    <!-- 团队概览 -->
    <div class="team-overview">
      <div class="overview-item">
        <div class="icon">
          👥
        </div>
        <div class="content">
          <div class="value">
            {{ teamMembers.length }}
          </div>
          <div class="label">
            团队人数
          </div>
        </div>
      </div>
      <div class="overview-item">
        <div class="icon">
          🎯
        </div>
        <div class="content">
          <div class="value">
            1.75亿
          </div>
          <div class="label">
            本月目标
          </div>
        </div>
      </div>
      <div class="overview-item">
        <div class="icon">
          💰
        </div>
        <div class="content">
          <div class="value">
            1.33亿
          </div>
          <div class="label">
            本月业绩
          </div>
        </div>
      </div>
      <div class="overview-item">
        <div class="icon">
          📈
        </div>
        <div class="content">
          <div class="value">
            76%
          </div>
          <div class="label">
            目标完成率
          </div>
        </div>
      </div>
    </div>

    <!-- 成员卡片 -->
    <NGrid :cols="3" :x-gap="20" :y-gap="20">
      <NGi v-for="member in teamMembers" :key="member.id">
        <div class="member-card" @click="handleViewDetail(member)">
          <div class="card-header">
            <NAvatar
              round
              :size="64"
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`"
            />
            <div class="member-info">
              <div class="name-row">
                <span class="name">{{ member.name }}</span>
                <NTag
                  :color="{ color: `${levelConfig[member.level].color}20`, textColor: levelConfig[member.level].color }"
                  size="small"
                >
                  {{ levelConfig[member.level].label }}
                </NTag>
              </div>
              <div class="position">
                {{ member.position }}
              </div>
              <div class="contact">
                {{ member.phone }}
              </div>
            </div>
          </div>

          <div class="card-stats">
            <div class="stat-item">
              <div class="value">
                {{ member.totalDeals }}
              </div>
              <div class="label">
                本月成交
              </div>
            </div>
            <div class="stat-item">
              <div class="value">
                {{ member.totalCustomers }}
              </div>
              <div class="label">
                跟进客户
              </div>
            </div>
            <div class="stat-item">
              <div class="value">
                {{ formatAmount(member.monthlyAchieved) }}
              </div>
              <div class="label">
                本月业绩
              </div>
            </div>
          </div>

          <div class="card-progress">
            <div class="progress-header">
              <span>目标完成</span>
              <span class="rate">{{ getAchievementRate(member.monthlyAchieved, member.monthlyTarget) }}%</span>
            </div>
            <NProgress
              type="line"
              :percentage="getAchievementRate(member.monthlyAchieved, member.monthlyTarget)"
              :show-indicator="false"
              :height="8"
              :border-radius="4"
              rail-color="#e5e7eb"
              :fill-color="getAchievementRate(member.monthlyAchieved, member.monthlyTarget) >= 80 ? '#10b981' : getAchievementRate(member.monthlyAchieved, member.monthlyTarget) >= 60 ? '#f59e0b' : '#ef4444'"
            />
            <div class="progress-footer">
              <span>{{ formatAmount(member.monthlyAchieved) }}</span>
              <span class="divider">/</span>
              <span class="target">{{ formatAmount(member.monthlyTarget) }}</span>
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- 详情弹窗 -->
    <NModal
      v-model:show="showDetailModal"
      preset="card"
      title="成员详情"
      style="width: 600px"
    >
      <template v-if="selectedMember">
        <div class="detail-header">
          <NAvatar
            round
            :size="80"
            :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.avatar}`"
          />
          <div class="detail-info">
            <div class="name">
              {{ selectedMember.name }}
            </div>
            <div class="position">
              {{ selectedMember.position }}
            </div>
            <NTag
              :color="{ color: `${levelConfig[selectedMember.level].color}20`, textColor: levelConfig[selectedMember.level].color }"
              size="small"
            >
              {{ levelConfig[selectedMember.level].label }}
            </NTag>
          </div>
        </div>

        <NDescriptions :column="2" label-placement="left" class="detail-desc">
          <NDescriptionsItem label="联系电话">
            {{ selectedMember.phone }}
          </NDescriptionsItem>
          <NDescriptionsItem label="电子邮箱">
            {{ selectedMember.email }}
          </NDescriptionsItem>
          <NDescriptionsItem label="入职日期">
            {{ selectedMember.joinDate }}
          </NDescriptionsItem>
          <NDescriptionsItem label="本月目标">
            ¥{{ formatAmount(selectedMember.monthlyTarget) }}
          </NDescriptionsItem>
          <NDescriptionsItem label="本月业绩">
            ¥{{ formatAmount(selectedMember.monthlyAchieved) }}
          </NDescriptionsItem>
          <NDescriptionsItem label="完成率">
            {{ getAchievementRate(selectedMember.monthlyAchieved, selectedMember.monthlyTarget) }}%
          </NDescriptionsItem>
          <NDescriptionsItem label="本月成交">
            {{ selectedMember.totalDeals }} 套
          </NDescriptionsItem>
          <NDescriptionsItem label="跟进客户">
            {{ selectedMember.totalCustomers }} 人
          </NDescriptionsItem>
        </NDescriptions>
      </template>
      <template #footer>
        <NSpace justify="end">
          <NButton>编辑信息</NButton>
          <NButton @click="showDetailModal = false">
            关闭
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.team-members-page {
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

.team-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  .overview-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    .icon {
      font-size: 32px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border-radius: 12px;
    }

    .content {
      .value {
        font-size: 24px;
        font-weight: 700;
        color: #1f2937;
      }

      .label {
        font-size: 13px;
        color: #6b7280;
      }
    }
  }
}

.member-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;

    .member-info {
      flex: 1;

      .name-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;

        .name {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }
      }

      .position {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 4px;
      }

      .contact {
        font-size: 13px;
        color: #9ca3af;
      }
    }
  }

  .card-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 16px 0;
    border-top: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;
    margin-bottom: 16px;

    .stat-item {
      text-align: center;

      .value {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }

      .label {
        font-size: 12px;
        color: #9ca3af;
      }
    }
  }

  .card-progress {
    .progress-header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 8px;

      .rate {
        font-weight: 600;
        color: #1f2937;
      }
    }

    .progress-footer {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      margin-top: 8px;
      color: #374151;

      .divider {
        color: #d1d5db;
      }

      .target {
        color: #9ca3af;
      }
    }
  }
}

.detail-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;

  .detail-info {
    .name {
      font-size: 22px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }

    .position {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
  }
}

.detail-desc {
  margin-top: 16px;
}
</style>
