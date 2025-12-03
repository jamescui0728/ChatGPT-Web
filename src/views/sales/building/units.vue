<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NDropdown,
  NIcon,
  NInput,
  NPagination,
  NSelect,
  NSpace,
  NTag,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

// 搜索条件
const searchText = ref('')
const statusFilter = ref(null)
const buildingFilter = ref(null)
const typeFilter = ref(null)

// 筛选选项
const statusOptions = [
  { label: '全部状态', value: null },
  { label: '可售', value: 'available' },
  { label: '已认购', value: 'subscribed' },
  { label: '已签约', value: 'contracted' },
  { label: '预留', value: 'reserved' },
]

const buildingOptions = [
  { label: '全部楼栋', value: null },
  { label: '1栋', value: '1' },
  { label: '2栋', value: '2' },
  { label: '3栋', value: '3' },
]

const typeOptions = [
  { label: '全部户型', value: null },
  { label: 'A户型 (89㎡)', value: 'A' },
  { label: 'B户型 (108㎡)', value: 'B' },
  { label: 'C户型 (125㎡)', value: 'C' },
  { label: 'D户型 (142㎡)', value: 'D' },
]

// 房源数据
const unitsData = ref([
  { id: 1, building: '1栋', floor: 18, room: '1801', type: 'A', area: 89, unitPrice: 32000, totalPrice: 2848000, status: 'available', direction: '东南', customer: null },
  { id: 2, building: '1栋', floor: 18, room: '1802', type: 'B', area: 108, unitPrice: 31500, totalPrice: 3402000, status: 'subscribed', direction: '西南', customer: '陈先生' },
  { id: 3, building: '1栋', floor: 18, room: '1803', type: 'C', area: 125, unitPrice: 31000, totalPrice: 3875000, status: 'contracted', direction: '东北', customer: '李女士' },
  { id: 4, building: '1栋', floor: 18, room: '1804', type: 'D', area: 142, unitPrice: 30500, totalPrice: 4331000, status: 'available', direction: '西北', customer: null },
  { id: 5, building: '1栋', floor: 17, room: '1701', type: 'A', area: 89, unitPrice: 31800, totalPrice: 2830200, status: 'reserved', direction: '东南', customer: '王经理(预留)' },
  { id: 6, building: '1栋', floor: 17, room: '1702', type: 'B', area: 108, unitPrice: 31300, totalPrice: 3380400, status: 'available', direction: '西南', customer: null },
  { id: 7, building: '1栋', floor: 17, room: '1703', type: 'C', area: 125, unitPrice: 30800, totalPrice: 3850000, status: 'subscribed', direction: '东北', customer: '赵先生' },
  { id: 8, building: '1栋', floor: 17, room: '1704', type: 'D', area: 142, unitPrice: 30300, totalPrice: 4302600, status: 'contracted', direction: '西北', customer: '张女士' },
  { id: 9, building: '2栋', floor: 16, room: '1601', type: 'A', area: 89, unitPrice: 31600, totalPrice: 2812400, status: 'available', direction: '东南', customer: null },
  { id: 10, building: '2栋', floor: 16, room: '1602', type: 'B', area: 108, unitPrice: 31100, totalPrice: 3358800, status: 'available', direction: '西南', customer: null },
])

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  available: { label: '可售', type: 'success' },
  subscribed: { label: '已认购', type: 'warning' },
  contracted: { label: '已签约', type: 'info' },
  reserved: { label: '预留', type: 'default' },
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { type: 'selection' },
  { title: '房号', key: 'room', width: 100, fixed: 'left' },
  { title: '楼栋', key: 'building', width: 80 },
  { title: '楼层', key: 'floor', width: 80 },
  { title: '户型', key: 'type', width: 100 },
  { title: '面积(㎡)', key: 'area', width: 100 },
  { title: '朝向', key: 'direction', width: 80 },
  {
    title: '单价(元/㎡)',
    key: 'unitPrice',
    width: 120,
    render: row => `¥${row.unitPrice.toLocaleString()}`,
  },
  {
    title: '总价',
    key: 'totalPrice',
    width: 120,
    render: (row) => {
      const price = (row.totalPrice / 10000).toFixed(0)
      return h('span', { style: { color: '#d97706', fontWeight: 600 } }, `${price}万`)
    },
  },
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
    title: '客户',
    key: 'customer',
    width: 120,
    render: row => row.customer || '-',
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render: row => h(NSpace, { size: 'small' }, {
      default: () => [
        h(NButton, { size: 'tiny', quaternary: true, type: 'primary' }, { default: () => '详情' }),
        h(NButton, { size: 'tiny', quaternary: true }, { default: () => '编辑' }),
        row.status === 'available' && h(NButton, { size: 'tiny', type: 'warning', secondary: true }, { default: () => '认购' }),
      ],
    }),
  },
]

// 分页
const pagination = ref({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
})

// 批量操作
const checkedRowKeys = ref<number[]>([])
const batchOptions = [
  { label: '批量修改状态', key: 'status' },
  { label: '批量修改价格', key: 'price' },
  { label: '导出选中', key: 'export' },
]
</script>

<template>
  <div class="units-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>房源管理</h1>
        <p>管理所有房源信息</p>
      </div>
      <div class="header-actions">
        <NButton>导入房源</NButton>
        <NButton type="primary">
          + 新增房源
        </NButton>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索房号..."
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
          v-model:value="buildingFilter"
          :options="buildingOptions"
          placeholder="楼栋"
          style="width: 140px"
          clearable
        />
        <NSelect
          v-model:value="typeFilter"
          :options="typeOptions"
          placeholder="户型"
          style="width: 160px"
          clearable
        />
        <NSelect
          v-model:value="statusFilter"
          :options="statusOptions"
          placeholder="状态"
          style="width: 140px"
          clearable
        />
        <NButton>查询</NButton>
        <NButton quaternary>
          重置
        </NButton>

        <div class="filter-right">
          <NDropdown
            :options="batchOptions"
            trigger="click"
            :disabled="checkedRowKeys.length === 0"
          >
            <NButton :disabled="checkedRowKeys.length === 0">
              批量操作
              <template v-if="checkedRowKeys.length > 0">
                ({{ checkedRowKeys.length }})
              </template>
            </NButton>
          </NDropdown>
        </div>
      </div>
    </NCard>

    <!-- 数据表格 -->
    <NCard class="table-card">
      <NDataTable
        :columns="columns"
        :data="unitsData"
        :row-key="(row: any) => row.id"
        :checked-row-keys="checkedRowKeys"
        :scroll-x="1200"
        :bordered="false"
        @update:checked-row-keys="(keys: number[]) => checkedRowKeys = keys"
      />
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 {{ unitsData.length }} 条记录
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
  </div>
</template>

<style scoped lang="less">
.units-page {
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

    .filter-right {
      margin-left: auto;
    }
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
