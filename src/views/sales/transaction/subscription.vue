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
  NStep,
  NSteps,
  NTag,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const message = useMessage()

// 搜索条件
const searchText = ref('')
const statusFilter = ref(null)
const salesFilter = ref(null)

// 筛选选项
const statusOptions = [
  { label: '全部状态', value: null },
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已驳回', value: 'rejected' },
  { label: '已取消', value: 'cancelled' },
  { label: '已转签约', value: 'converted' },
]

const salesOptions = [
  { label: '全部销售', value: null },
  { label: '张明', value: '1' },
  { label: '李华', value: '2' },
  { label: '王芳', value: '3' },
]

// 认购数据
const subscriptionData = ref([
  {
    id: 'RG20240320001',
    customer: '陈建国',
    phone: '138****8888',
    unit: '1栋-18-1801',
    area: 89,
    unitPrice: 32000,
    totalPrice: 2848000,
    deposit: 50000,
    sales: '张明',
    subscriptionDate: '2024-03-20',
    expireDate: '2024-03-27',
    status: 'pending',
    remark: '客户要求保留一周',
  },
  {
    id: 'RG20240319001',
    customer: '李婷婷',
    phone: '139****6666',
    unit: '2栋-15-1502',
    area: 108,
    unitPrice: 31500,
    totalPrice: 3402000,
    deposit: 50000,
    sales: '李华',
    subscriptionDate: '2024-03-19',
    expireDate: '2024-03-26',
    status: 'approved',
    remark: '',
  },
  {
    id: 'RG20240318001',
    customer: '王志强',
    phone: '137****5555',
    unit: '1栋-12-1201',
    area: 125,
    unitPrice: 31000,
    totalPrice: 3875000,
    deposit: 50000,
    sales: '王芳',
    subscriptionDate: '2024-03-18',
    expireDate: '2024-03-25',
    status: 'converted',
    remark: '已转正式签约',
  },
  {
    id: 'RG20240317001',
    customer: '赵美玲',
    phone: '136****4444',
    unit: '3栋-8-0803',
    area: 142,
    unitPrice: 30500,
    totalPrice: 4331000,
    deposit: 50000,
    sales: '张明',
    subscriptionDate: '2024-03-17',
    expireDate: '2024-03-24',
    status: 'cancelled',
    remark: '客户资金问题取消',
  },
])

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  pending: { label: '待审核', type: 'warning' },
  approved: { label: '已通过', type: 'success' },
  rejected: { label: '已驳回', type: 'error' },
  cancelled: { label: '已取消', type: 'default' },
  converted: { label: '已转签约', type: 'info' },
}

// 格式化金额
function formatPrice(value: number) {
  return `${(value / 10000).toFixed(0)}万`
}

// 详情弹窗
const showDetailModal = ref(false)
const selectedSubscription = ref<any>(null)

// 查看详情
function handleViewDetail(row: any) {
  selectedSubscription.value = row
  showDetailModal.value = true
}

// 审核
function handleApprove(row: any) {
  message.success(`认购单 ${row.id} 审核通过`)
}

// 转签约
function handleConvert(row: any) {
  message.success(`认购单 ${row.id} 已转签约`)
}

// 取消
function handleCancel(row: any) {
  message.info(`认购单 ${row.id} 已取消`)
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { title: '认购编号', key: 'id', width: 150, fixed: 'left' },
  { title: '客户姓名', key: 'customer', width: 100 },
  { title: '联系电话', key: 'phone', width: 120 },
  { title: '认购房源', key: 'unit', width: 130 },
  { title: '面积(㎡)', key: 'area', width: 90 },
  {
    title: '认购总价',
    key: 'totalPrice',
    width: 100,
    render: row => h('span', { style: { color: '#d97706', fontWeight: 600 } }, formatPrice(row.totalPrice)),
  },
  {
    title: '定金',
    key: 'deposit',
    width: 80,
    render: row => `${row.deposit / 10000}万`,
  },
  { title: '置业顾问', key: 'sales', width: 100 },
  { title: '认购日期', key: 'subscriptionDate', width: 110 },
  { title: '到期日期', key: 'expireDate', width: 110 },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: row => h(NTag, {
      type: statusConfig[row.status].type,
      size: 'small',
    }, { default: () => statusConfig[row.status].label }),
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    fixed: 'right',
    render: row => h(NSpace, { size: 'small' }, {
      default: () => [
        h(NButton, { size: 'tiny', quaternary: true, type: 'primary', onClick: () => handleViewDetail(row) }, { default: () => '详情' }),
        row.status === 'pending' && h(NButton, { size: 'tiny', type: 'success', secondary: true, onClick: () => handleApprove(row) }, { default: () => '审核' }),
        row.status === 'approved' && h(NButton, { size: 'tiny', type: 'warning', secondary: true, onClick: () => handleConvert(row) }, { default: () => '转签约' }),
        (row.status === 'pending' || row.status === 'approved') && h(NButton, { size: 'tiny', secondary: true, onClick: () => handleCancel(row) }, { default: () => '取消' }),
      ],
    }),
  },
]

// 新增认购弹窗
const showAddModal = ref(false)
const currentStep = ref(0)
const newSubscription = ref({
  customerId: null,
  unitId: null,
  deposit: 50000,
  expireDays: 7,
  remark: '',
})

// 分页
const pagination = ref({
  page: 1,
  pageSize: 10,
})
</script>

<template>
  <div class="subscription-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>认购管理</h1>
        <p>管理所有认购订单</p>
      </div>
      <div class="header-actions">
        <NButton>导出数据</NButton>
        <NButton type="primary" @click="showAddModal = true">
          + 新增认购
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
            12
          </div>
          <div class="label">
            待审核
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon approved">
          ✅
        </div>
        <div class="stat-content">
          <div class="value">
            45
          </div>
          <div class="label">
            已通过
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon converted">
          📝
        </div>
        <div class="stat-content">
          <div class="value">
            38
          </div>
          <div class="label">
            已转签约
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amount">
          💰
        </div>
        <div class="stat-content">
          <div class="value">
            1.26亿
          </div>
          <div class="label">
            本月认购金额
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索认购编号、客户..."
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
        <NSelect
          v-model:value="salesFilter"
          :options="salesOptions"
          placeholder="置业顾问"
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
        :data="subscriptionData"
        :row-key="(row: any) => row.id"
        :scroll-x="1500"
        :bordered="false"
      />
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 {{ subscriptionData.length }} 条记录
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

    <!-- 新增认购弹窗 -->
    <NModal
      v-model:show="showAddModal"
      preset="card"
      title="新增认购"
      style="width: 700px"
    >
      <NSteps :current="currentStep" size="small" class="steps-bar">
        <NStep title="选择客户" />
        <NStep title="选择房源" />
        <NStep title="填写信息" />
        <NStep title="确认提交" />
      </NSteps>

      <div class="step-content">
        <NForm :model="newSubscription" label-placement="left" label-width="100">
          <NFormItem label="选择客户">
            <NSelect
              v-model:value="newSubscription.customerId"
              placeholder="请选择客户"
              :options="[
                { label: '陈建国 - 138****8888', value: 1 },
                { label: '李婷婷 - 139****6666', value: 2 },
              ]"
              style="width: 100%"
            />
          </NFormItem>
          <NFormItem label="选择房源">
            <NSelect
              v-model:value="newSubscription.unitId"
              placeholder="请选择房源"
              :options="[
                { label: '1栋-18-1801 | 89㎡ | ¥284.8万', value: 1 },
                { label: '1栋-18-1802 | 108㎡ | ¥340.2万', value: 2 },
              ]"
              style="width: 100%"
            />
          </NFormItem>
          <NFormItem label="认购定金">
            <NInputNumber
              v-model:value="newSubscription.deposit"
              :min="0"
              :step="10000"
              style="width: 200px"
            >
              <template #suffix>
                元
              </template>
            </NInputNumber>
          </NFormItem>
          <NFormItem label="保留天数">
            <NInputNumber
              v-model:value="newSubscription.expireDays"
              :min="1"
              :max="30"
              style="width: 200px"
            >
              <template #suffix>
                天
              </template>
            </NInputNumber>
          </NFormItem>
          <NFormItem label="备注">
            <NInput
              v-model:value="newSubscription.remark"
              type="textarea"
              placeholder="请输入备注信息"
              :rows="3"
            />
          </NFormItem>
        </NForm>
      </div>

      <template #footer>
        <NSpace justify="end">
          <NButton @click="showAddModal = false">
            取消
          </NButton>
          <NButton type="primary">
            提交认购
          </NButton>
        </NSpace>
      </template>
    </NModal>

    <!-- 详情弹窗 -->
    <NModal
      v-model:show="showDetailModal"
      preset="card"
      title="认购详情"
      style="width: 600px"
    >
      <template v-if="selectedSubscription">
        <NDescriptions :column="2" label-placement="left">
          <NDescriptionsItem label="认购编号">
            {{ selectedSubscription.id }}
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            <NTag :type="statusConfig[selectedSubscription.status].type" size="small">
              {{ statusConfig[selectedSubscription.status].label }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="客户姓名">
            {{ selectedSubscription.customer }}
          </NDescriptionsItem>
          <NDescriptionsItem label="联系电话">
            {{ selectedSubscription.phone }}
          </NDescriptionsItem>
          <NDescriptionsItem label="认购房源">
            {{ selectedSubscription.unit }}
          </NDescriptionsItem>
          <NDescriptionsItem label="建筑面积">
            {{ selectedSubscription.area }}㎡
          </NDescriptionsItem>
          <NDescriptionsItem label="认购单价">
            ¥{{ selectedSubscription.unitPrice }}/㎡
          </NDescriptionsItem>
          <NDescriptionsItem label="认购总价">
            ¥{{ formatPrice(selectedSubscription.totalPrice) }}
          </NDescriptionsItem>
          <NDescriptionsItem label="认购定金">
            ¥{{ selectedSubscription.deposit / 10000 }}万
          </NDescriptionsItem>
          <NDescriptionsItem label="置业顾问">
            {{ selectedSubscription.sales }}
          </NDescriptionsItem>
          <NDescriptionsItem label="认购日期">
            {{ selectedSubscription.subscriptionDate }}
          </NDescriptionsItem>
          <NDescriptionsItem label="到期日期">
            {{ selectedSubscription.expireDate }}
          </NDescriptionsItem>
          <NDescriptionsItem label="备注" :span="2">
            {{ selectedSubscription.remark || '无' }}
          </NDescriptionsItem>
        </NDescriptions>
      </template>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showDetailModal = false">
            关闭
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.subscription-page {
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
      &.approved { background: #d1fae5; }
      &.converted { background: #dbeafe; }
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

.steps-bar {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f3f4f6;
}

.step-content {
  padding: 16px 0;
}
</style>
