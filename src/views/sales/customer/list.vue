<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NAvatar,
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NPagination,
  NRadio,
  NRadioGroup,
  NSelect,
  NSpace,
  NTag,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const message = useMessage()

// 搜索条件
const searchText = ref('')
const intentionFilter = ref(null)
const sourceFilter = ref(null)
const salesFilter = ref(null)

// 筛选选项
const intentionOptions = [
  { label: '全部意向', value: null },
  { label: '高意向', value: 'high' },
  { label: '中意向', value: 'medium' },
  { label: '低意向', value: 'low' },
]

const sourceOptions = [
  { label: '全部渠道', value: null },
  { label: '自然来访', value: 'visit' },
  { label: '线上咨询', value: 'online' },
  { label: '老带新', value: 'referral' },
  { label: '中介渠道', value: 'agent' },
  { label: '广告投放', value: 'ad' },
]

const salesOptions = [
  { label: '全部销售', value: null },
  { label: '张明', value: '1' },
  { label: '李华', value: '2' },
  { label: '王芳', value: '3' },
]

// 客户数据
const customerData = ref([
  {
    id: 1,
    name: '陈建国',
    phone: '138****8888',
    gender: 'male',
    intention: 'high',
    source: 'visit',
    sales: '张明',
    visitCount: 3,
    lastVisit: '2024-03-20',
    intendedUnit: '1栋-18-1801',
    budget: '280-320万',
    status: 'following',
    createTime: '2024-03-15',
    remark: '对东南朝向户型感兴趣',
  },
  {
    id: 2,
    name: '李婷婷',
    phone: '139****6666',
    gender: 'female',
    intention: 'high',
    source: 'referral',
    sales: '李华',
    visitCount: 5,
    lastVisit: '2024-03-19',
    intendedUnit: '2栋-15-1502',
    budget: '350-400万',
    status: 'subscribed',
    createTime: '2024-03-10',
    remark: '老客户介绍，预算充足',
  },
  {
    id: 3,
    name: '王志强',
    phone: '137****5555',
    gender: 'male',
    intention: 'medium',
    source: 'online',
    sales: '王芳',
    visitCount: 2,
    lastVisit: '2024-03-18',
    intendedUnit: '待定',
    budget: '200-250万',
    status: 'following',
    createTime: '2024-03-12',
    remark: '首次置业，需要指导',
  },
  {
    id: 4,
    name: '赵美玲',
    phone: '136****4444',
    gender: 'female',
    intention: 'low',
    source: 'ad',
    sales: '张明',
    visitCount: 1,
    lastVisit: '2024-03-17',
    intendedUnit: '待定',
    budget: '180-220万',
    status: 'new',
    createTime: '2024-03-17',
    remark: '只是了解情况',
  },
  {
    id: 5,
    name: '刘伟',
    phone: '135****3333',
    gender: 'male',
    intention: 'high',
    source: 'agent',
    sales: '李华',
    visitCount: 4,
    lastVisit: '2024-03-20',
    intendedUnit: '1栋-12-1201',
    budget: '300-350万',
    status: 'contracted',
    createTime: '2024-03-05',
    remark: '已签约，等待付款',
  },
])

// 意向度配置
const intentionConfig: Record<string, { label: string; color: string }> = {
  high: { label: '高', color: '#10b981' },
  medium: { label: '中', color: '#f59e0b' },
  low: { label: '低', color: '#9ca3af' },
}

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  new: { label: '新客户', type: 'info' },
  following: { label: '跟进中', type: 'warning' },
  subscribed: { label: '已认购', type: 'success' },
  contracted: { label: '已签约', type: 'success' },
  lost: { label: '已流失', type: 'error' },
}

// 来源配置
const sourceConfig: Record<string, string> = {
  visit: '自然来访',
  online: '线上咨询',
  referral: '老带新',
  agent: '中介渠道',
  ad: '广告投放',
}

// 新增客户弹窗
const showAddModal = ref(false)
const newCustomer = ref({
  name: '',
  phone: '',
  gender: 'male',
  source: 'visit',
  intention: 'medium',
  budget: '',
  remark: '',
})

// 查看详情
function handleViewDetail(row: any) {
  message.info(`查看客户 ${row.name} 的详情`)
}

// 添加跟进
function handleAddFollow(row: any) {
  message.info(`为客户 ${row.name} 添加跟进记录`)
}

// 提交新客户
function handleAddCustomer() {
  message.success('客户添加成功')
  showAddModal.value = false
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { type: 'selection' },
  {
    title: '客户',
    key: 'name',
    width: 180,
    fixed: 'left',
    render: row => h('div', { class: 'customer-cell' }, [
      h(NAvatar, {
        round: true,
        size: 'small',
        src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`,
      }),
      h('div', { class: 'customer-info' }, [
        h('div', { class: 'name' }, row.name),
        h('div', { class: 'phone' }, row.phone),
      ]),
    ]),
  },
  {
    title: '意向度',
    key: 'intention',
    width: 80,
    render: row => h('span', {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      },
    }, [
      h('span', {
        style: {
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: intentionConfig[row.intention].color,
        },
      }),
      intentionConfig[row.intention].label,
    ]),
  },
  { title: '渠道来源', key: 'source', width: 100, render: row => sourceConfig[row.source] },
  { title: '置业顾问', key: 'sales', width: 100 },
  { title: '来访次数', key: 'visitCount', width: 90 },
  { title: '最近来访', key: 'lastVisit', width: 110 },
  { title: '意向房源', key: 'intendedUnit', width: 130 },
  { title: '预算', key: 'budget', width: 120 },
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
        h(NButton, { size: 'tiny', quaternary: true, onClick: () => handleAddFollow(row) }, { default: () => '跟进' }),
        row.status === 'following' && h(NButton, { size: 'tiny', type: 'warning', secondary: true }, { default: () => '认购' }),
      ],
    }),
  },
]

// 分页
const pagination = ref({
  page: 1,
  pageSize: 10,
})

const checkedRowKeys = ref<number[]>([])
</script>

<template>
  <div class="customer-list-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>客户列表</h1>
        <p>管理所有客户信息及跟进记录</p>
      </div>
      <div class="header-actions">
        <NButton>导入客户</NButton>
        <NButton type="primary" @click="showAddModal = true">
          + 新增客户
        </NButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-icon">
          👥
        </div>
        <div class="stat-content">
          <div class="value">
            486
          </div>
          <div class="label">
            总客户数
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          🆕
        </div>
        <div class="stat-content">
          <div class="value">
            32
          </div>
          <div class="label">
            本月新增
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          🔥
        </div>
        <div class="stat-content">
          <div class="value">
            78
          </div>
          <div class="label">
            高意向客户
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          📅
        </div>
        <div class="stat-content">
          <div class="value">
            15
          </div>
          <div class="label">
            今日待跟进
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索客户姓名、手机号..."
          style="width: 240px"
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
          v-model:value="intentionFilter"
          :options="intentionOptions"
          placeholder="意向度"
          style="width: 120px"
          clearable
        />
        <NSelect
          v-model:value="sourceFilter"
          :options="sourceOptions"
          placeholder="渠道来源"
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
        :data="customerData"
        :row-key="(row: any) => row.id"
        :checked-row-keys="checkedRowKeys"
        :scroll-x="1400"
        :bordered="false"
        @update:checked-row-keys="(keys: number[]) => checkedRowKeys = keys"
      />
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 {{ customerData.length }} 条记录
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

    <!-- 新增客户弹窗 -->
    <NModal
      v-model:show="showAddModal"
      preset="card"
      title="新增客户"
      style="width: 600px"
    >
      <NForm
        :model="newCustomer"
        label-placement="left"
        label-width="80"
      >
        <NFormItem label="客户姓名" required>
          <NInput v-model:value="newCustomer.name" placeholder="请输入客户姓名" />
        </NFormItem>
        <NFormItem label="手机号码" required>
          <NInput v-model:value="newCustomer.phone" placeholder="请输入手机号码" />
        </NFormItem>
        <NFormItem label="性别">
          <NRadioGroup v-model:value="newCustomer.gender">
            <NRadio value="male">
              男
            </NRadio>
            <NRadio value="female">
              女
            </NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="渠道来源">
          <NSelect
            v-model:value="newCustomer.source"
            :options="sourceOptions.slice(1)"
            placeholder="请选择渠道来源"
          />
        </NFormItem>
        <NFormItem label="意向度">
          <NRadioGroup v-model:value="newCustomer.intention">
            <NRadio value="high">
              高
            </NRadio>
            <NRadio value="medium">
              中
            </NRadio>
            <NRadio value="low">
              低
            </NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="购房预算">
          <NInput v-model:value="newCustomer.budget" placeholder="如：200-300万" />
        </NFormItem>
        <NFormItem label="备注">
          <NInput
            v-model:value="newCustomer.remark"
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
          <NButton type="primary" @click="handleAddCustomer">
            确认添加
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.customer-list-page {
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
      background: #f8fafc;
      border-radius: 12px;
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
  :deep(.customer-cell) {
    display: flex;
    align-items: center;
    gap: 10px;

    .customer-info {
      .name {
        font-weight: 500;
        color: #1f2937;
      }

      .phone {
        font-size: 12px;
        color: #6b7280;
      }
    }
  }

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
