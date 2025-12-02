<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NDatePicker,
  NDescriptions,
  NDescriptionsItem,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NInputNumber,
  NModal,
  NPagination,
  NSelect,
  NSpace,
  NTag,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const message = useMessage()

// 搜索条件
const searchText = ref('')
const typeFilter = ref(null)
const statusFilter = ref(null)

// 筛选选项
const typeOptions = [
  { label: '全部类型', value: null },
  { label: '定金', value: 'deposit' },
  { label: '首付款', value: 'downpayment' },
  { label: '银行按揭', value: 'mortgage' },
  { label: '尾款', value: 'final' },
]

const statusOptions = [
  { label: '全部状态', value: null },
  { label: '待确认', value: 'pending' },
  { label: '已到账', value: 'received' },
  { label: '已退款', value: 'refunded' },
]

// 回款数据
const paymentData = ref([
  {
    id: 'HK20240320001',
    contractId: 'HT20240320001',
    customer: '王志强',
    phone: '137****5555',
    unit: '1栋-12-1201',
    type: 'downpayment',
    amount: 1162500,
    paymentMethod: '银行转账',
    paymentDate: '2024-03-20',
    receiveDate: '2024-03-20',
    status: 'received',
    operator: '财务-李红',
    remark: '首付30%',
  },
  {
    id: 'HK20240319002',
    contractId: 'HT20240319001',
    customer: '刘伟',
    phone: '135****3333',
    unit: '1栋-15-1502',
    type: 'downpayment',
    amount: 3402000,
    paymentMethod: '银行转账',
    paymentDate: '2024-03-19',
    receiveDate: '2024-03-19',
    status: 'received',
    operator: '财务-李红',
    remark: '全款支付',
  },
  {
    id: 'HK20240319001',
    contractId: 'HT20240318001',
    customer: '张美华',
    phone: '139****1111',
    unit: '2栋-10-1003',
    type: 'deposit',
    amount: 50000,
    paymentMethod: 'POS刷卡',
    paymentDate: '2024-03-18',
    receiveDate: '2024-03-18',
    status: 'received',
    operator: '财务-王明',
    remark: '认购定金',
  },
  {
    id: 'HK20240318001',
    contractId: 'HT20240318001',
    customer: '张美华',
    phone: '139****1111',
    unit: '2栋-10-1003',
    type: 'downpayment',
    amount: 816200,
    paymentMethod: '银行转账',
    paymentDate: '2024-03-20',
    receiveDate: null,
    status: 'pending',
    operator: null,
    remark: '首付20%（扣除定金）',
  },
  {
    id: 'HK20240315001',
    contractId: 'HT20240315001',
    customer: '李明辉',
    phone: '136****2222',
    unit: '3栋-6-0602',
    type: 'downpayment',
    amount: 2848000,
    paymentMethod: '银行转账',
    paymentDate: '2024-03-15',
    receiveDate: '2024-03-15',
    status: 'received',
    operator: '财务-李红',
    remark: '全款支付',
  },
])

// 类型配置
const typeConfig: Record<string, { label: string; color: string }> = {
  deposit: { label: '定金', color: '#6366f1' },
  downpayment: { label: '首付款', color: '#f59e0b' },
  mortgage: { label: '银行按揭', color: '#10b981' },
  final: { label: '尾款', color: '#ec4899' },
}

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  pending: { label: '待确认', type: 'warning' },
  received: { label: '已到账', type: 'success' },
  refunded: { label: '已退款', type: 'error' },
}

// 格式化金额
function formatPrice(value: number) {
  if (value >= 10000)
    return `${(value / 10000).toFixed(2)}万`

  return value.toLocaleString()
}

// 详情弹窗
const showDetailModal = ref(false)
const selectedPayment = ref<any>(null)

// 查看详情
function handleViewDetail(row: any) {
  selectedPayment.value = row
  showDetailModal.value = true
}

// 确认到账
function handleConfirm(row: any) {
  message.success(`回款 ${row.id} 已确认到账`)
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { title: '回款编号', key: 'id', width: 150, fixed: 'left' },
  { title: '关联合同', key: 'contractId', width: 140 },
  { title: '客户姓名', key: 'customer', width: 100 },
  { title: '房源', key: 'unit', width: 130 },
  {
    title: '款项类型',
    key: 'type',
    width: 100,
    render: row => h(NTag, {
      color: { color: `${typeConfig[row.type].color}20`, textColor: typeConfig[row.type].color, borderColor: typeConfig[row.type].color },
      size: 'small',
    }, { default: () => typeConfig[row.type].label }),
  },
  {
    title: '回款金额',
    key: 'amount',
    width: 120,
    render: row => h('span', { style: { color: '#10b981', fontWeight: 600 } }, `¥${formatPrice(row.amount)}`),
  },
  { title: '付款方式', key: 'paymentMethod', width: 100 },
  { title: '付款日期', key: 'paymentDate', width: 110 },
  { title: '到账日期', key: 'receiveDate', width: 110, render: row => row.receiveDate || '-' },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: row => h(NTag, {
      type: statusConfig[row.status].type,
      size: 'small',
    }, { default: () => statusConfig[row.status].label }),
  },
  { title: '操作人', key: 'operator', width: 100, render: row => row.operator || '-' },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render: row => h(NSpace, { size: 'small' }, {
      default: () => [
        h(NButton, { size: 'tiny', quaternary: true, type: 'primary', onClick: () => handleViewDetail(row) }, { default: () => '详情' }),
        row.status === 'pending' && h(NButton, { size: 'tiny', type: 'success', secondary: true, onClick: () => handleConfirm(row) }, { default: () => '确认到账' }),
      ],
    }),
  },
]

// 新增回款弹窗
const showAddModal = ref(false)
const newPayment = ref({
  contractId: null,
  type: 'downpayment',
  amount: 0,
  paymentMethod: 'transfer',
  paymentDate: null,
  remark: '',
})

// 付款方式选项
const paymentMethodOptions = [
  { label: '银行转账', value: 'transfer' },
  { label: 'POS刷卡', value: 'pos' },
  { label: '现金', value: 'cash' },
  { label: '支票', value: 'check' },
]

// 分页
const pagination = ref({
  page: 1,
  pageSize: 10,
})
</script>

<template>
  <div class="payment-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>回款管理</h1>
        <p>管理所有回款记录</p>
      </div>
      <div class="header-actions">
        <NButton>导出数据</NButton>
        <NButton type="primary" @click="showAddModal = true">
          + 登记回款
        </NButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-icon pending">
          ⏳
        </div>
        <div class="stat-content">
          <div class="value">
            5
          </div>
          <div class="label">
            待确认
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon today">
          📅
        </div>
        <div class="stat-content">
          <div class="value">
            680万
          </div>
          <div class="label">
            今日回款
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon month">
          📊
        </div>
        <div class="stat-content">
          <div class="value">
            7623万
          </div>
          <div class="label">
            本月回款
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon total">
          💰
        </div>
        <div class="stat-content">
          <div class="value">
            2.86亿
          </div>
          <div class="label">
            累计回款
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索回款编号、客户..."
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
          v-model:value="typeFilter"
          :options="typeOptions"
          placeholder="款项类型"
          style="width: 140px"
          clearable
        />
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
        :data="paymentData"
        :row-key="(row: any) => row.id"
        :scroll-x="1500"
        :bordered="false"
      />
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 {{ paymentData.length }} 条记录
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

    <!-- 新增回款弹窗 -->
    <NModal
      v-model:show="showAddModal"
      preset="card"
      title="登记回款"
      style="width: 600px"
    >
      <NForm :model="newPayment" label-placement="left" label-width="100">
        <NFormItem label="关联合同" required>
          <NSelect
            v-model:value="newPayment.contractId"
            placeholder="请选择合同"
            :options="[
              { label: 'HT20240320001 - 王志强', value: 'HT20240320001' },
              { label: 'HT20240318001 - 张美华', value: 'HT20240318001' },
            ]"
            style="width: 100%"
          />
        </NFormItem>
        <NFormItem label="款项类型" required>
          <NSelect
            v-model:value="newPayment.type"
            :options="typeOptions.slice(1)"
            style="width: 100%"
          />
        </NFormItem>
        <NFormItem label="回款金额" required>
          <NInputNumber
            v-model:value="newPayment.amount"
            :min="0"
            :precision="2"
            style="width: 100%"
          >
            <template #prefix>
              ¥
            </template>
          </NInputNumber>
        </NFormItem>
        <NFormItem label="付款方式" required>
          <NSelect
            v-model:value="newPayment.paymentMethod"
            :options="paymentMethodOptions"
            style="width: 100%"
          />
        </NFormItem>
        <NFormItem label="付款日期" required>
          <NDatePicker
            v-model:value="newPayment.paymentDate"
            type="date"
            style="width: 100%"
          />
        </NFormItem>
        <NFormItem label="备注">
          <NInput
            v-model:value="newPayment.remark"
            type="textarea"
            placeholder="请输入备注信息"
            :rows="3"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showAddModal = false">
            取消
          </NButton>
          <NButton type="primary">
            确认登记
          </NButton>
        </NSpace>
      </template>
    </NModal>

    <!-- 详情弹窗 -->
    <NModal
      v-model:show="showDetailModal"
      preset="card"
      title="回款详情"
      style="width: 600px"
    >
      <template v-if="selectedPayment">
        <NDescriptions :column="2" label-placement="left" bordered>
          <NDescriptionsItem label="回款编号">
            {{ selectedPayment.id }}
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            <NTag :type="statusConfig[selectedPayment.status].type" size="small">
              {{ statusConfig[selectedPayment.status].label }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="关联合同">
            {{ selectedPayment.contractId }}
          </NDescriptionsItem>
          <NDescriptionsItem label="款项类型">
            <NTag
              :color="{ color: `${typeConfig[selectedPayment.type].color}20`, textColor: typeConfig[selectedPayment.type].color }"
              size="small"
            >
              {{ typeConfig[selectedPayment.type].label }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="客户姓名">
            {{ selectedPayment.customer }}
          </NDescriptionsItem>
          <NDescriptionsItem label="联系电话">
            {{ selectedPayment.phone }}
          </NDescriptionsItem>
          <NDescriptionsItem label="房源">
            {{ selectedPayment.unit }}
          </NDescriptionsItem>
          <NDescriptionsItem label="回款金额">
            <span style="color: #10b981; font-weight: 600; font-size: 16px;">
              ¥{{ formatPrice(selectedPayment.amount) }}
            </span>
          </NDescriptionsItem>
          <NDescriptionsItem label="付款方式">
            {{ selectedPayment.paymentMethod }}
          </NDescriptionsItem>
          <NDescriptionsItem label="付款日期">
            {{ selectedPayment.paymentDate }}
          </NDescriptionsItem>
          <NDescriptionsItem label="到账日期">
            {{ selectedPayment.receiveDate || '待确认' }}
          </NDescriptionsItem>
          <NDescriptionsItem label="操作人">
            {{ selectedPayment.operator || '-' }}
          </NDescriptionsItem>
          <NDescriptionsItem label="备注" :span="2">
            {{ selectedPayment.remark || '无' }}
          </NDescriptionsItem>
        </NDescriptions>
      </template>
      <template #footer>
        <NSpace justify="end">
          <NButton v-if="selectedPayment?.status === 'pending'" type="success" @click="handleConfirm(selectedPayment)">
            确认到账
          </NButton>
          <NButton @click="showDetailModal = false">
            关闭
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.payment-page {
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
      &.today { background: #dbeafe; }
      &.month { background: #d1fae5; }
      &.total { background: #fce7f3; }
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
</style>
