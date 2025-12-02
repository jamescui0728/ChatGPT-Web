<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NDescriptions,
  NDescriptionsItem,
  NIcon,
  NInput,
  NModal,
  NPagination,
  NProgress,
  NSelect,
  NSpace,
  NTag,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

// 搜索条件
const searchText = ref('')
const statusFilter = ref(null)

// 筛选选项
const statusOptions = [
  { label: '全部状态', value: null },
  { label: '待签约', value: 'pending' },
  { label: '已签约', value: 'signed' },
  { label: '已备案', value: 'filed' },
  { label: '已取消', value: 'cancelled' },
]

// 签约数据
const contractData = ref([
  {
    id: 'HT20240320001',
    subscriptionId: 'RG20240318001',
    customer: '王志强',
    phone: '137****5555',
    unit: '1栋-12-1201',
    area: 125,
    totalPrice: 3875000,
    paidAmount: 1162500,
    paymentPlan: '首付30%+按揭70%',
    signDate: '2024-03-20',
    sales: '王芳',
    status: 'signed',
    paymentProgress: 30,
  },
  {
    id: 'HT20240319001',
    subscriptionId: 'RG20240315001',
    customer: '刘伟',
    phone: '135****3333',
    unit: '1栋-15-1502',
    area: 108,
    totalPrice: 3402000,
    paidAmount: 3402000,
    paymentPlan: '全款',
    signDate: '2024-03-19',
    sales: '李华',
    status: 'filed',
    paymentProgress: 100,
  },
  {
    id: 'HT20240318001',
    subscriptionId: 'RG20240312001',
    customer: '张美华',
    phone: '139****1111',
    unit: '2栋-10-1003',
    area: 142,
    totalPrice: 4331000,
    paidAmount: 866200,
    paymentPlan: '首付20%+按揭80%',
    signDate: '2024-03-18',
    sales: '张明',
    status: 'signed',
    paymentProgress: 20,
  },
  {
    id: 'HT20240315001',
    subscriptionId: 'RG20240310001',
    customer: '李明辉',
    phone: '136****2222',
    unit: '3栋-6-0602',
    area: 89,
    totalPrice: 2848000,
    paidAmount: 2848000,
    paymentPlan: '全款',
    signDate: '2024-03-15',
    sales: '王芳',
    status: 'filed',
    paymentProgress: 100,
  },
])

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  pending: { label: '待签约', type: 'warning' },
  signed: { label: '已签约', type: 'success' },
  filed: { label: '已备案', type: 'info' },
  cancelled: { label: '已取消', type: 'error' },
}

// 格式化金额
function formatPrice(value: number) {
  return `${(value / 10000).toFixed(0)}万`
}

// 详情弹窗
const showDetailModal = ref(false)
const selectedContract = ref<any>(null)

// 查看详情
function handleViewDetail(row: any) {
  selectedContract.value = row
  showDetailModal.value = true
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { title: '合同编号', key: 'id', width: 150, fixed: 'left' },
  { title: '关联认购', key: 'subscriptionId', width: 140 },
  { title: '客户姓名', key: 'customer', width: 100 },
  { title: '联系电话', key: 'phone', width: 120 },
  { title: '签约房源', key: 'unit', width: 130 },
  { title: '面积(㎡)', key: 'area', width: 90 },
  {
    title: '合同总价',
    key: 'totalPrice',
    width: 100,
    render: row => h('span', { style: { color: '#d97706', fontWeight: 600 } }, formatPrice(row.totalPrice)),
  },
  { title: '付款方式', key: 'paymentPlan', width: 140 },
  {
    title: '回款进度',
    key: 'paymentProgress',
    width: 150,
    render: row => h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
      h(NProgress, {
        type: 'line',
        percentage: row.paymentProgress,
        showIndicator: false,
        height: 6,
        borderRadius: 3,
        railColor: '#e5e7eb',
        fillColor: row.paymentProgress === 100 ? '#10b981' : '#f59e0b',
        style: { width: '80px' },
      }),
      h('span', { style: { fontSize: '12px', color: '#6b7280' } }, `${row.paymentProgress}%`),
    ]),
  },
  { title: '签约日期', key: 'signDate', width: 110 },
  { title: '置业顾问', key: 'sales', width: 100 },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: row => h(NTag, {
      type: statusConfig[row.status].type,
      size: 'small',
    }, { default: () => statusConfig[row.status].label }),
  },
  {
    title: '操作',
    key: 'actions',
    width: 180,
    fixed: 'right',
    render: row => h(NSpace, { size: 'small' }, {
      default: () => [
        h(NButton, { size: 'tiny', quaternary: true, type: 'primary', onClick: () => handleViewDetail(row) }, { default: () => '详情' }),
        h(NButton, { size: 'tiny', quaternary: true }, { default: () => '打印' }),
        row.status === 'signed' && h(NButton, { size: 'tiny', type: 'info', secondary: true }, { default: () => '备案' }),
      ],
    }),
  },
]

// 分页
const pagination = ref({
  page: 1,
  pageSize: 10,
})
</script>

<template>
  <div class="contract-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>签约管理</h1>
        <p>管理所有签约合同</p>
      </div>
      <div class="header-actions">
        <NButton>导出数据</NButton>
        <NButton type="primary">
          + 新增签约
        </NButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-icon pending">
          📋
        </div>
        <div class="stat-content">
          <div class="value">
            8
          </div>
          <div class="label">
            待签约
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon signed">
          ✍️
        </div>
        <div class="stat-content">
          <div class="value">
            32
          </div>
          <div class="label">
            已签约
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon filed">
          📁
        </div>
        <div class="stat-content">
          <div class="value">
            28
          </div>
          <div class="label">
            已备案
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amount">
          💰
        </div>
        <div class="stat-content">
          <div class="value">
            9845万
          </div>
          <div class="label">
            本月签约金额
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索合同编号、客户..."
          style="width: 220px"
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
          v-model:value="statusFilter"
          :options="statusOptions"
          placeholder="状态"
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

    <!-- 数据表格 -->
    <NCard class="table-card">
      <NDataTable
        :columns="columns"
        :data="contractData"
        :row-key="(row: any) => row.id"
        :scroll-x="1600"
        :bordered="false"
      />
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 {{ contractData.length }} 条记录
        </div>
        <NPagination
          v-model:page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-count="10"
          :page-sizes="[10, 20, 50]"
          show-size-picker
          show-quick-jumper
        />
      </div>
    </NCard>

    <!-- 详情弹窗 -->
    <NModal
      v-model:show="showDetailModal"
      preset="card"
      title="合同详情"
      style="width: 700px"
    >
      <template v-if="selectedContract">
        <NDescriptions :column="2" label-placement="left" bordered>
          <NDescriptionsItem label="合同编号">
            {{ selectedContract.id }}
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            <NTag :type="statusConfig[selectedContract.status].type" size="small">
              {{ statusConfig[selectedContract.status].label }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="关联认购">
            {{ selectedContract.subscriptionId }}
          </NDescriptionsItem>
          <NDescriptionsItem label="签约日期">
            {{ selectedContract.signDate }}
          </NDescriptionsItem>
          <NDescriptionsItem label="客户姓名">
            {{ selectedContract.customer }}
          </NDescriptionsItem>
          <NDescriptionsItem label="联系电话">
            {{ selectedContract.phone }}
          </NDescriptionsItem>
          <NDescriptionsItem label="签约房源">
            {{ selectedContract.unit }}
          </NDescriptionsItem>
          <NDescriptionsItem label="建筑面积">
            {{ selectedContract.area }}㎡
          </NDescriptionsItem>
          <NDescriptionsItem label="合同总价">
            <span style="color: #d97706; font-weight: 600;">¥{{ formatPrice(selectedContract.totalPrice) }}</span>
          </NDescriptionsItem>
          <NDescriptionsItem label="付款方式">
            {{ selectedContract.paymentPlan }}
          </NDescriptionsItem>
          <NDescriptionsItem label="已付金额">
            ¥{{ formatPrice(selectedContract.paidAmount) }}
          </NDescriptionsItem>
          <NDescriptionsItem label="回款进度">
            <div style="display: flex; align-items: center; gap: 12px;">
              <NProgress
                type="line"
                :percentage="selectedContract.paymentProgress"
                :show-indicator="false"
                :height="8"
                :border-radius="4"
                rail-color="#e5e7eb"
                :fill-color="selectedContract.paymentProgress === 100 ? '#10b981' : '#f59e0b'"
                style="width: 120px"
              />
              <span>{{ selectedContract.paymentProgress }}%</span>
            </div>
          </NDescriptionsItem>
          <NDescriptionsItem label="置业顾问">
            {{ selectedContract.sales }}
          </NDescriptionsItem>
        </NDescriptions>

        <div class="detail-section">
          <h4>付款计划</h4>
          <div class="payment-plan">
            <div class="plan-item completed">
              <div class="plan-header">
                <span class="plan-name">首付款</span>
                <span class="plan-amount">¥{{ formatPrice(selectedContract.paidAmount) }}</span>
              </div>
              <div class="plan-date">
                2024-03-20 已付
              </div>
            </div>
            <div v-if="selectedContract.paymentProgress < 100" class="plan-item">
              <div class="plan-header">
                <span class="plan-name">银行按揭</span>
                <span class="plan-amount">¥{{ formatPrice(selectedContract.totalPrice - selectedContract.paidAmount) }}</span>
              </div>
              <div class="plan-date">
                预计 2024-04-20
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <NSpace justify="end">
          <NButton>打印合同</NButton>
          <NButton @click="showDetailModal = false">
            关闭
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.contract-page {
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

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    .stat-icon {
      font-size: 28px;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;

      &.pending { background: #fef3c7; }
      &.signed { background: #d1fae5; }
      &.filed { background: #dbeafe; }
      &.amount { background: #fce7f3; }
    }

    .stat-content {
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

.filter-card {
  margin-bottom: 20px;

  .filter-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.table-card {
  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;

    .pagination-info {
      font-size: 14px;
      color: #6b7280;
    }
  }
}

.detail-section {
  margin-top: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 16px 0;
  }

  .payment-plan {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .plan-item {
      padding: 16px;
      background: #f9fafb;
      border-radius: 10px;
      border-left: 4px solid #e5e7eb;

      &.completed {
        border-left-color: #10b981;
        background: #ecfdf5;
      }

      .plan-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;

        .plan-name {
          font-weight: 500;
          color: #374151;
        }

        .plan-amount {
          font-weight: 600;
          color: #d97706;
        }
      }

      .plan-date {
        font-size: 13px;
        color: #6b7280;
      }
    }
  }
}
</style>
