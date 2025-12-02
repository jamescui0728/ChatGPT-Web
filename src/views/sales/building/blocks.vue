<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NIcon,
  NInput,
  NInputNumber,
  NModal,
  NProgress,
  NSelect,
  NSpace,
  NTag,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const message = useMessage()

// 搜索条件
const searchText = ref('')
const projectFilter = ref(null)

// 项目选项
const projectOptions = [
  { label: '全部项目', value: null },
  { label: '阳光城·未来悦', value: '1' },
  { label: '绿城·春江明月', value: '2' },
  { label: '万科·翡翠滨江', value: '3' },
]

// 楼栋数据
const blocksData = ref([
  {
    id: 1,
    project: '阳光城·未来悦',
    name: '1栋',
    alias: 'A栋',
    floors: 18,
    unitsPerFloor: 4,
    totalUnits: 72,
    soldUnits: 45,
    types: ['A户型', 'B户型', 'C户型', 'D户型'],
    status: 'selling',
    buildDate: '2024-03',
    deliveryDate: '2026-06',
  },
  {
    id: 2,
    project: '阳光城·未来悦',
    name: '2栋',
    alias: 'B栋',
    floors: 18,
    unitsPerFloor: 4,
    totalUnits: 72,
    soldUnits: 38,
    types: ['A户型', 'B户型', 'C户型', 'D户型'],
    status: 'selling',
    buildDate: '2024-03',
    deliveryDate: '2026-06',
  },
  {
    id: 3,
    project: '阳光城·未来悦',
    name: '3栋',
    alias: 'C栋',
    floors: 16,
    unitsPerFloor: 4,
    totalUnits: 64,
    soldUnits: 20,
    types: ['E户型', 'F户型'],
    status: 'selling',
    buildDate: '2024-05',
    deliveryDate: '2026-08',
  },
  {
    id: 4,
    project: '绿城·春江明月',
    name: '1栋',
    alias: '望江楼',
    floors: 32,
    unitsPerFloor: 6,
    totalUnits: 192,
    soldUnits: 180,
    types: ['观江A', '观江B', '标准C'],
    status: 'selling',
    buildDate: '2023-10',
    deliveryDate: '2025-12',
  },
  {
    id: 5,
    project: '绿城·春江明月',
    name: '2栋',
    alias: '揽月楼',
    floors: 32,
    unitsPerFloor: 6,
    totalUnits: 192,
    soldUnits: 132,
    types: ['观江A', '观江B', '标准C'],
    status: 'selling',
    buildDate: '2023-10',
    deliveryDate: '2025-12',
  },
  {
    id: 6,
    project: '万科·翡翠滨江',
    name: '1栋',
    alias: '翡翠阁',
    floors: 28,
    unitsPerFloor: 4,
    totalUnits: 112,
    soldUnits: 112,
    types: ['大平层A', '大平层B'],
    status: 'soldout',
    buildDate: '2023-06',
    deliveryDate: '2025-08',
  },
])

// 状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' | 'default' }> = {
  selling: { label: '在售', type: 'success' },
  presale: { label: '预售', type: 'warning' },
  soldout: { label: '售罄', type: 'info' },
  pending: { label: '待售', type: 'default' },
}

// 计算去化率
function getSalesRate(sold: number, total: number) {
  return Math.round((sold / total) * 100)
}

// 新增/编辑弹窗
const showModal = ref(false)
const isEdit = ref(false)
const formData = ref({
  project: null,
  name: '',
  alias: '',
  floors: 18,
  unitsPerFloor: 4,
  types: [],
  buildDate: '',
  deliveryDate: '',
})

// 查看楼栋详情
function handleViewDetail(row: any) {
  message.info(`查看 ${row.project} ${row.name} 详情`)
}

// 编辑楼栋
function handleEdit(row: any) {
  isEdit.value = true
  formData.value = { ...row }
  showModal.value = true
}

// 新增楼栋
function handleAdd() {
  isEdit.value = false
  formData.value = {
    project: null,
    name: '',
    alias: '',
    floors: 18,
    unitsPerFloor: 4,
    types: [],
    buildDate: '',
    deliveryDate: '',
  }
  showModal.value = true
}

// 保存
function handleSave() {
  message.success(isEdit.value ? '楼栋信息已更新' : '楼栋添加成功')
  showModal.value = false
}

// 表格列定义
const columns: DataTableColumns<any> = [
  { title: '所属项目', key: 'project', width: 150 },
  { title: '楼栋名称', key: 'name', width: 100 },
  { title: '楼栋别名', key: 'alias', width: 100 },
  { title: '层数', key: 'floors', width: 80 },
  { title: '每层户数', key: 'unitsPerFloor', width: 100 },
  { title: '总户数', key: 'totalUnits', width: 90 },
  {
    title: '户型',
    key: 'types',
    width: 180,
    render: row => h('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } },
      row.types.map((t: string) => h(NTag, { size: 'small', type: 'info' }, { default: () => t })),
    ),
  },
  {
    title: '去化进度',
    key: 'progress',
    width: 150,
    render: row => h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
      h(NProgress, {
        type: 'line',
        percentage: getSalesRate(row.soldUnits, row.totalUnits),
        showIndicator: false,
        height: 6,
        borderRadius: 3,
        railColor: '#e5e7eb',
        fillColor: getSalesRate(row.soldUnits, row.totalUnits) >= 80 ? '#10b981' : '#f59e0b',
        style: { width: '80px' },
      }),
      h('span', { style: { fontSize: '12px', color: '#6b7280' } }, `${row.soldUnits}/${row.totalUnits}`),
    ]),
  },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: row => h(NTag, {
      type: statusConfig[row.status].type,
      size: 'small',
    }, { default: () => statusConfig[row.status].label }),
  },
  { title: '开工日期', key: 'buildDate', width: 100 },
  { title: '交付日期', key: 'deliveryDate', width: 100 },
  {
    title: '操作',
    key: 'actions',
    width: 180,
    fixed: 'right',
    render: row => h(NSpace, { size: 'small' }, {
      default: () => [
        h(NButton, { size: 'tiny', quaternary: true, type: 'primary', onClick: () => handleViewDetail(row) }, { default: () => '详情' }),
        h(NButton, { size: 'tiny', quaternary: true, onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { size: 'tiny', type: 'warning', secondary: true }, { default: () => '销控表' }),
      ],
    }),
  },
]
</script>

<template>
  <div class="blocks-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>楼栋管理</h1>
        <p>管理所有楼栋信息</p>
      </div>
      <div class="header-actions">
        <NButton type="primary" @click="handleAdd">
          + 新增楼栋
        </NButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <NGrid :cols="4" :x-gap="16" :y-gap="16" class="stat-grid">
      <NGi>
        <div class="stat-card">
          <div class="stat-icon">
            🏢
          </div>
          <div class="stat-content">
            <div class="value">
              {{ blocksData.length }}
            </div>
            <div class="label">
              楼栋总数
            </div>
          </div>
        </div>
      </NGi>
      <NGi>
        <div class="stat-card">
          <div class="stat-icon">
            🏠
          </div>
          <div class="stat-content">
            <div class="value">
              {{ blocksData.reduce((a, b) => a + b.totalUnits, 0) }}
            </div>
            <div class="label">
              房源总数
            </div>
          </div>
        </div>
      </NGi>
      <NGi>
        <div class="stat-card">
          <div class="stat-icon">
            ✅
          </div>
          <div class="stat-content">
            <div class="value">
              {{ blocksData.reduce((a, b) => a + b.soldUnits, 0) }}
            </div>
            <div class="label">
              已售房源
            </div>
          </div>
        </div>
      </NGi>
      <NGi>
        <div class="stat-card">
          <div class="stat-icon">
            📊
          </div>
          <div class="stat-content">
            <div class="value">
              {{ Math.round(blocksData.reduce((a, b) => a + b.soldUnits, 0) / blocksData.reduce((a, b) => a + b.totalUnits, 0) * 100) }}%
            </div>
            <div class="label">
              整体去化率
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>

    <!-- 搜索筛选 -->
    <NCard class="filter-card">
      <div class="filter-bar">
        <NInput
          v-model:value="searchText"
          placeholder="搜索楼栋名称..."
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
          v-model:value="projectFilter"
          :options="projectOptions"
          placeholder="选择项目"
          style="width: 180px"
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
        :data="blocksData"
        :row-key="(row: any) => row.id"
        :scroll-x="1400"
        :bordered="false"
      />
    </NCard>

    <!-- 新增/编辑弹窗 -->
    <NModal
      v-model:show="showModal"
      preset="card"
      :title="isEdit ? '编辑楼栋' : '新增楼栋'"
      style="width: 600px"
    >
      <NForm :model="formData" label-placement="left" label-width="100">
        <NFormItem label="所属项目" required>
          <NSelect
            v-model:value="formData.project"
            :options="projectOptions.slice(1)"
            placeholder="请选择项目"
          />
        </NFormItem>
        <NFormItem label="楼栋名称" required>
          <NInput v-model:value="formData.name" placeholder="如：1栋" />
        </NFormItem>
        <NFormItem label="楼栋别名">
          <NInput v-model:value="formData.alias" placeholder="如：A栋、望江楼" />
        </NFormItem>
        <NFormItem label="楼层数" required>
          <NInputNumber v-model:value="formData.floors" :min="1" :max="100" style="width: 100%" />
        </NFormItem>
        <NFormItem label="每层户数" required>
          <NInputNumber v-model:value="formData.unitsPerFloor" :min="1" :max="20" style="width: 100%" />
        </NFormItem>
        <NFormItem label="开工日期">
          <NInput v-model:value="formData.buildDate" placeholder="如：2024-03" />
        </NFormItem>
        <NFormItem label="交付日期">
          <NInput v-model:value="formData.deliveryDate" placeholder="如：2026-06" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showModal = false">
            取消
          </NButton>
          <NButton type="primary" @click="handleSave">
            保存
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.blocks-page {
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

.stat-grid {
  margin-bottom: 20px;
}

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
  :deep(.n-data-table) {
    .n-data-table-th {
      background: #f8fafc;
    }
  }
}
</style>
