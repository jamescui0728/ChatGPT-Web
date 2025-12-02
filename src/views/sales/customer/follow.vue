<script setup lang="ts">
import { ref } from 'vue'
import {
  NAvatar,
  NButton,
  NCard,
  NDatePicker,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NTag,
  NTimeline,
  NTimelineItem,
  useMessage,
} from 'naive-ui'

const message = useMessage()

// 搜索条件
const searchText = ref('')
const salesFilter = ref(null)
const typeFilter = ref(null)

// 筛选选项
const salesOptions = [
  { label: '全部销售', value: null },
  { label: '张明', value: '1' },
  { label: '李华', value: '2' },
  { label: '王芳', value: '3' },
]

const typeOptions = [
  { label: '全部类型', value: null },
  { label: '电话跟进', value: 'phone' },
  { label: '来访接待', value: 'visit' },
  { label: '微信沟通', value: 'wechat' },
  { label: '带看房源', value: 'tour' },
]

// 跟进记录数据
const followRecords = ref([
  {
    id: 1,
    customer: {
      name: '陈建国',
      phone: '138****8888',
      intention: 'high',
      status: 'following',
    },
    sales: '张明',
    records: [
      {
        id: 1,
        type: 'visit',
        content: '客户第三次来访，重点看了1栋18层1801和1802两套房源，对1801更感兴趣，价格方面希望能有优惠。',
        nextPlan: '等客户确认首付情况后，安排签订认购书',
        nextTime: '2024-03-22',
        createTime: '2024-03-20 14:30',
      },
      {
        id: 2,
        type: 'phone',
        content: '电话确认客户本周六来访时间，客户表示下午2点到。',
        nextPlan: '准备好1801房源的详细资料',
        nextTime: '2024-03-20',
        createTime: '2024-03-18 10:15',
      },
      {
        id: 3,
        type: 'wechat',
        content: '通过微信发送了项目户型图和价格表，客户表示会仔细研究。',
        nextPlan: '明天电话跟进客户看法',
        nextTime: '2024-03-18',
        createTime: '2024-03-17 16:20',
      },
    ],
  },
  {
    id: 2,
    customer: {
      name: '李婷婷',
      phone: '139****6666',
      intention: 'high',
      status: 'subscribed',
    },
    sales: '李华',
    records: [
      {
        id: 1,
        type: 'visit',
        content: '客户今天完成认购，认购房源2栋15层1502，认购金额5万元，计划下周签订正式合同。',
        nextPlan: '准备签约材料，通知财务安排',
        nextTime: '2024-03-25',
        createTime: '2024-03-19 15:00',
      },
      {
        id: 2,
        type: 'tour',
        content: '带客户实地看了2栋15层样板间，客户对装修标准很满意。',
        nextPlan: '准备认购材料',
        nextTime: '2024-03-19',
        createTime: '2024-03-17 11:30',
      },
    ],
  },
  {
    id: 3,
    customer: {
      name: '王志强',
      phone: '137****5555',
      intention: 'medium',
      status: 'following',
    },
    sales: '王芳',
    records: [
      {
        id: 1,
        type: 'phone',
        content: '客户对价格比较敏感，询问是否有分期付款方案。已详细解释了公司的付款政策。',
        nextPlan: '发送付款方案明细给客户',
        nextTime: '2024-03-21',
        createTime: '2024-03-18 09:30',
      },
    ],
  },
])

// 跟进类型配置
const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
  phone: { label: '电话跟进', icon: '📞', color: '#6366f1' },
  visit: { label: '来访接待', icon: '🏠', color: '#10b981' },
  wechat: { label: '微信沟通', icon: '💬', color: '#22c55e' },
  tour: { label: '带看房源', icon: '🔑', color: '#f59e0b' },
}

// 意向度配置
const intentionConfig: Record<string, { label: string; color: string }> = {
  high: { label: '高意向', color: '#10b981' },
  medium: { label: '中意向', color: '#f59e0b' },
  low: { label: '低意向', color: '#9ca3af' },
}

// 新增跟进弹窗
const showAddModal = ref(false)
const newFollow = ref({
  customerId: null,
  type: 'phone',
  content: '',
  nextPlan: '',
  nextTime: null,
})

// 提交跟进记录
const handleAddFollow = () => {
  message.success('跟进记录添加成功')
  showAddModal.value = false
}
</script>

<template>
  <div class="follow-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>跟进记录</h1>
        <p>查看和管理客户跟进记录</p>
      </div>
      <div class="header-actions">
        <NButton type="primary" @click="showAddModal = true">
          + 新增跟进
        </NButton>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索客户姓名..."
          style="width: 200px"
          clearable
        >
          <template #prefix>
            <NIcon>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </NIcon>
          </template>
        </NInput>
        <NSelect
          v-model:value="salesFilter"
          :options="salesOptions"
          placeholder="置业顾问"
          style="width: 140px"
          clearable
        />
        <NSelect
          v-model:value="typeFilter"
          :options="typeOptions"
          placeholder="跟进类型"
          style="width: 140px"
          clearable
        />
        <NDatePicker type="daterange" clearable />
        <NButton>查询</NButton>
        <NButton quaternary>
          重置
        </NButton>
      </div>
    </NCard>

    <!-- 跟进记录列表 -->
    <div class="follow-list">
      <NCard
        v-for="record in followRecords"
        :key="record.id"
        class="follow-card"
      >
        <!-- 客户信息头部 -->
        <div class="customer-header">
          <div class="customer-info">
            <NAvatar
              round
              size="medium"
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.customer.name}`"
            />
            <div class="info">
              <div class="name">
                {{ record.customer.name }}
              </div>
              <div class="phone">
                {{ record.customer.phone }}
              </div>
            </div>
            <NTag
              :color="{ color: `${intentionConfig[record.customer.intention].color}20`, textColor: intentionConfig[record.customer.intention].color }"
              size="small"
            >
              {{ intentionConfig[record.customer.intention].label }}
            </NTag>
          </div>
          <div class="sales-info">
            <span class="label">置业顾问：</span>
            <span class="name">{{ record.sales }}</span>
          </div>
        </div>

        <!-- 跟进时间线 -->
        <div class="timeline-wrapper">
          <NTimeline>
            <NTimelineItem
              v-for="item in record.records"
              :key="item.id"
              :type="item.type === 'visit' ? 'success' : item.type === 'phone' ? 'info' : 'warning'"
            >
              <template #header>
                <div class="timeline-header">
                  <span class="type-badge" :style="{ background: typeConfig[item.type].color }">
                    {{ typeConfig[item.type].icon }} {{ typeConfig[item.type].label }}
                  </span>
                  <span class="time">{{ item.createTime }}</span>
                </div>
              </template>
              <div class="timeline-content">
                <div class="content-text">
                  {{ item.content }}
                </div>
                <div v-if="item.nextPlan" class="next-plan">
                  <span class="label">下次计划：</span>
                  <span class="text">{{ item.nextPlan }}</span>
                  <span class="date">（{{ item.nextTime }}）</span>
                </div>
              </div>
            </NTimelineItem>
          </NTimeline>
        </div>

        <!-- 操作按钮 -->
        <div class="card-footer">
          <NButton size="small" quaternary type="primary">
            查看客户详情
          </NButton>
          <NButton size="small" type="primary">
            添加跟进
          </NButton>
        </div>
      </NCard>
    </div>

    <!-- 新增跟进弹窗 -->
    <NModal
      v-model:show="showAddModal"
      preset="card"
      title="新增跟进记录"
      style="width: 600px"
    >
      <NForm
        :model="newFollow"
        label-placement="left"
        label-width="80"
      >
        <NFormItem label="客户" required>
          <NSelect
            v-model:value="newFollow.customerId"
            placeholder="请选择客户"
            :options="followRecords.map(r => ({ label: r.customer.name, value: r.id }))"
          />
        </NFormItem>
        <NFormItem label="跟进类型" required>
          <NSelect
            v-model:value="newFollow.type"
            :options="typeOptions.slice(1)"
          />
        </NFormItem>
        <NFormItem label="跟进内容" required>
          <NInput
            v-model:value="newFollow.content"
            type="textarea"
            placeholder="请详细描述本次跟进情况"
            :rows="4"
          />
        </NFormItem>
        <NFormItem label="下次计划">
          <NInput
            v-model:value="newFollow.nextPlan"
            placeholder="请输入下次跟进计划"
          />
        </NFormItem>
        <NFormItem label="计划时间">
          <NDatePicker
            v-model:value="newFollow.nextTime"
            type="date"
            clearable
            style="width: 100%"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showAddModal = false">
            取消
          </NButton>
          <NButton type="primary" @click="handleAddFollow">
            确认添加
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.follow-page {
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

.filter-card {
  margin-bottom: 20px;

  .filter-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.follow-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .follow-card {
    .customer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid #f3f4f6;
      margin-bottom: 20px;

      .customer-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .info {
          .name {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          }

          .phone {
            font-size: 13px;
            color: #6b7280;
          }
        }
      }

      .sales-info {
        font-size: 14px;

        .label {
          color: #6b7280;
        }

        .name {
          color: #1f2937;
          font-weight: 500;
        }
      }
    }

    .timeline-wrapper {
      padding: 0 12px;

      .timeline-header {
        display: flex;
        align-items: center;
        gap: 12px;

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: white;
        }

        .time {
          font-size: 13px;
          color: #9ca3af;
        }
      }

      .timeline-content {
        padding: 12px 0;

        .content-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .next-plan {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          background: #fef3c7;
          border-radius: 6px;
          font-size: 13px;

          .label {
            color: #92400e;
          }

          .text {
            color: #78350f;
          }

          .date {
            color: #b45309;
          }
        }
      }
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid #f3f4f6;
      margin-top: 16px;
    }
  }
}
</style>
