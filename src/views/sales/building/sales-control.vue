<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  NButton,
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NModal,
  NSelect,
  NSpace,
  NTabPane,
  NTabs,
  NTag,
} from 'naive-ui'

const route = useRoute()

// 获取项目信息
const projectId = computed(() => route.query.projectId as string || '1')
const projectName = computed(() => route.query.projectName as string || '阳光城·未来悦')

// 项目配置（不同项目有不同的楼栋）
const projectConfig: Record<string, { buildings: { label: string; value: string }[]; floors: number; unitsPerFloor: number }> = {
  1: {
    buildings: [
      { label: '1栋', value: '1' },
      { label: '2栋', value: '2' },
      { label: '3栋', value: '3' },
    ],
    floors: 18,
    unitsPerFloor: 4,
  },
  2: {
    buildings: [
      { label: '1栋（望江楼）', value: '1' },
      { label: '2栋（揽月楼）', value: '2' },
    ],
    floors: 32,
    unitsPerFloor: 6,
  },
  3: {
    buildings: [
      { label: '1栋', value: '1' },
      { label: '2栋', value: '2' },
      { label: '3栋', value: '3' },
      { label: '4栋', value: '4' },
    ],
    floors: 28,
    unitsPerFloor: 4,
  },
  4: {
    buildings: [
      { label: 'A栋', value: '1' },
      { label: 'B栋', value: '2' },
    ],
    floors: 25,
    unitsPerFloor: 4,
  },
  5: {
    buildings: [
      { label: '1栋', value: '1' },
      { label: '2栋', value: '2' },
      { label: '3栋', value: '3' },
    ],
    floors: 22,
    unitsPerFloor: 4,
  },
  6: {
    buildings: [
      { label: '商业A座', value: '1' },
      { label: '商业B座', value: '2' },
    ],
    floors: 12,
    unitsPerFloor: 8,
  },
}

// 当前项目配置
const currentConfig = computed(() => projectConfig[projectId.value] || projectConfig['1'])

// 楼栋选择
const selectedBuilding = ref('1')
const buildingOptions = computed(() => currentConfig.value.buildings)

// 房源状态配置
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: '可售', color: '#10b981', bg: '#ecfdf5' },
  subscribed: { label: '已认购', color: '#f59e0b', bg: '#fffbeb' },
  contracted: { label: '已签约', color: '#6366f1', bg: '#eef2ff' },
  reserved: { label: '预留', color: '#8b5cf6', bg: '#f5f3ff' },
  unavailable: { label: '不可售', color: '#9ca3af', bg: '#f3f4f6' },
}

// 户型配置
const typeLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const directions = ['东南', '西南', '东北', '西北', '正南', '正北', '正东', '正西']

// 模拟楼层和房间数据
function generateFloorData(floors: number, unitsPerFloor: number) {
  const floorList: any[] = []
  for (let floor = floors; floor >= 1; floor--) {
    const units: any[] = []
    for (let unit = 1; unit <= unitsPerFloor; unit++) {
      const random = Math.random()
      let status = 'available'
      if (random < 0.25)
        status = 'subscribed'
      else if (random < 0.45)
        status = 'contracted'
      else if (random < 0.5)
        status = 'reserved'
      else if (random < 0.55)
        status = 'unavailable'

      const unitName = unit < 10 ? `${floor}0${unit}` : `${floor}${unit}`
      units.push({
        id: unitName,
        floor,
        unit,
        name: unitName,
        area: 89 + Math.floor(Math.random() * 50),
        price: 2500000 + Math.floor(Math.random() * 1000000),
        unitPrice: 28000 + Math.floor(Math.random() * 5000),
        type: typeLabels[(unit - 1) % typeLabels.length],
        status,
        direction: directions[(unit - 1) % directions.length],
        customer: (status !== 'available' && status !== 'unavailable') ? `客户${Math.floor(Math.random() * 100)}` : null,
      })
    }
    floorList.push({ floor, units })
  }
  return floorList
}

const floorData = ref(generateFloorData(currentConfig.value.floors, currentConfig.value.unitsPerFloor))

// 监听项目或楼栋变化，重新生成数据
watch([projectId, selectedBuilding], () => {
  floorData.value = generateFloorData(currentConfig.value.floors, currentConfig.value.unitsPerFloor)
}, { immediate: false })

// 房源详情弹窗
const showDetail = ref(false)
const selectedUnit = ref<any>(null)

// 点击房源
const handleUnitClick = (unit: any) => {
  selectedUnit.value = unit
  showDetail.value = true
}

// 格式化金额
const formatPrice = (value: number) => {
  return `${(value / 10000).toFixed(0)}万`
}

// 统计数据
const statistics = computed(() => {
  let total = 0
  let available = 0
  let subscribed = 0
  let contracted = 0
  let reserved = 0

  floorData.value.forEach((floor) => {
    floor.units.forEach((unit: any) => {
      total++
      if (unit.status === 'available')
        available++
      if (unit.status === 'subscribed')
        subscribed++
      if (unit.status === 'contracted')
        contracted++
      if (unit.status === 'reserved')
        reserved++
    })
  })

  return { total, available, subscribed, contracted, reserved }
})
</script>

<template>
  <div class="sales-control-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>销控表</h1>
        <p>
          <span class="project-tag">🏠 {{ projectName }}</span>
          - 实时房源销售状态
        </p>
      </div>
      <div class="header-actions">
        <NSelect
          v-model:value="selectedBuilding"
          :options="buildingOptions"
          style="width: 160px"
          placeholder="选择楼栋"
        />
        <NButton>导出销控表</NButton>
        <NButton type="primary">
          批量操作
        </NButton>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="statistics-bar">
      <div class="stat-item">
        <span class="label">总套数</span>
        <span class="value">{{ statistics.total }}</span>
      </div>
      <div class="stat-item available">
        <span class="dot" />
        <span class="label">可售</span>
        <span class="value">{{ statistics.available }}</span>
      </div>
      <div class="stat-item subscribed">
        <span class="dot" />
        <span class="label">已认购</span>
        <span class="value">{{ statistics.subscribed }}</span>
      </div>
      <div class="stat-item contracted">
        <span class="dot" />
        <span class="label">已签约</span>
        <span class="value">{{ statistics.contracted }}</span>
      </div>
      <div class="stat-item reserved">
        <span class="dot" />
        <span class="label">预留</span>
        <span class="value">{{ statistics.reserved }}</span>
      </div>
    </div>

    <!-- 销控表主体 -->
    <NCard class="control-card">
      <div class="floor-table">
        <!-- 表头 -->
        <div class="table-header">
          <div class="floor-label">
            楼层
          </div>
          <div class="unit-headers">
            <div
              v-for="i in currentConfig.unitsPerFloor"
              :key="i"
              class="unit-header"
            >
              {{ typeLabels[i - 1] }}户型
            </div>
          </div>
        </div>

        <!-- 楼层数据 -->
        <div class="table-body">
          <div v-for="floor in floorData" :key="floor.floor" class="floor-row">
            <div class="floor-number">
              {{ floor.floor }}F
            </div>
            <div class="unit-cells">
              <div
                v-for="unit in floor.units"
                :key="unit.id"
                class="unit-cell"
                :class="unit.status"
                @click="handleUnitClick(unit)"
              >
                <div class="unit-name">
                  {{ unit.name }}
                </div>
                <div class="unit-area">
                  {{ unit.area }}㎡
                </div>
                <div class="unit-price">
                  {{ formatPrice(unit.price) }}
                </div>
                <div class="unit-status">
                  {{ statusConfig[unit.status].label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NCard>

    <!-- 房源详情弹窗 -->
    <NModal
      v-model:show="showDetail"
      preset="card"
      title="房源详情"
      style="width: 600px"
    >
      <template v-if="selectedUnit">
        <NTabs type="line">
          <NTabPane name="info" tab="基本信息">
            <NDescriptions :column="2" label-placement="left">
              <NDescriptionsItem label="房号">
                {{ selectedUnit.name }}
              </NDescriptionsItem>
              <NDescriptionsItem label="户型">
                {{ selectedUnit.type }}户型
              </NDescriptionsItem>
              <NDescriptionsItem label="建筑面积">
                {{ selectedUnit.area }}㎡
              </NDescriptionsItem>
              <NDescriptionsItem label="朝向">
                {{ selectedUnit.direction }}
              </NDescriptionsItem>
              <NDescriptionsItem label="单价">
                ¥{{ selectedUnit.unitPrice }}/㎡
              </NDescriptionsItem>
              <NDescriptionsItem label="总价">
                ¥{{ formatPrice(selectedUnit.price) }}
              </NDescriptionsItem>
              <NDescriptionsItem label="状态">
                <NTag :type="selectedUnit.status === 'available' ? 'success' : selectedUnit.status === 'subscribed' ? 'warning' : 'info'" size="small">
                  {{ statusConfig[selectedUnit.status].label }}
                </NTag>
              </NDescriptionsItem>
              <NDescriptionsItem v-if="selectedUnit.customer" label="客户">
                {{ selectedUnit.customer }}
              </NDescriptionsItem>
            </NDescriptions>
          </NTabPane>
          <NTabPane name="history" tab="操作历史">
            <div class="history-list">
              <div class="history-item">
                <div class="time">
                  2024-03-20 14:30
                </div>
                <div class="action">
                  状态变更为"可售"
                </div>
                <div class="operator">
                  操作人：张三
                </div>
              </div>
              <div class="history-item">
                <div class="time">
                  2024-03-18 10:15
                </div>
                <div class="action">
                  创建房源
                </div>
                <div class="operator">
                  操作人：系统管理员
                </div>
              </div>
            </div>
          </NTabPane>
        </NTabs>
        <div class="modal-footer">
          <NSpace justify="end">
            <NButton v-if="selectedUnit.status === 'available'" type="primary">
              快速认购
            </NButton>
            <NButton>编辑信息</NButton>
            <NButton @click="showDetail = false">
              关闭
            </NButton>
          </NSpace>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped lang="less">
.sales-control-page {
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

      .project-tag {
        color: #f59e0b;
        font-weight: 500;
      }
    }
  }

  .header-actions {
    display: flex;
    gap: 12px;
  }
}

.statistics-bar {
  display: flex;
  gap: 32px;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .label {
      font-size: 14px;
      color: #6b7280;
    }

    .value {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    &.available .dot { background: #10b981; }
    &.subscribed .dot { background: #f59e0b; }
    &.contracted .dot { background: #6366f1; }
    &.reserved .dot { background: #8b5cf6; }
  }
}

.control-card {
  :deep(.n-card__content) {
    padding: 0;
  }
}

.floor-table {
  overflow-x: auto;
}

.table-header {
  display: flex;
  background: #f8fafc;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;

  .floor-label {
    width: 60px;
    padding: 16px;
    font-weight: 600;
    color: #374151;
    text-align: center;
    border-right: 1px solid #e5e7eb;
  }

  .unit-headers {
    display: flex;
    flex: 1;

    .unit-header {
      flex: 1;
      padding: 16px;
      text-align: center;
      font-weight: 600;
      color: #374151;
      border-right: 1px solid #e5e7eb;

      &:last-child {
        border-right: none;
      }
    }
  }
}

.table-body {
  .floor-row {
    display: flex;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fafafa;
    }

    .floor-number {
      width: 60px;
      padding: 16px;
      font-weight: 600;
      color: #6366f1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #e5e7eb;
      background: #f8fafc;
    }

    .unit-cells {
      display: flex;
      flex: 1;

      .unit-cell {
        flex: 1;
        padding: 12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        border-right: 1px solid #e5e7eb;

        &:last-child {
          border-right: none;
        }

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 5;
          position: relative;
        }

        &.available {
          background: #ecfdf5;
          .unit-status { color: #10b981; }
        }

        &.subscribed {
          background: #fffbeb;
          .unit-status { color: #f59e0b; }
        }

        &.contracted {
          background: #eef2ff;
          .unit-status { color: #6366f1; }
        }

        &.reserved {
          background: #f5f3ff;
          .unit-status { color: #8b5cf6; }
        }

        &.unavailable {
          background: #f3f4f6;
          .unit-status { color: #9ca3af; }
          opacity: 0.7;
        }

        .unit-name {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .unit-area {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 2px;
        }

        .unit-price {
          font-size: 14px;
          font-weight: 600;
          color: #d97706;
          margin-bottom: 4px;
        }

        .unit-status {
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
}

.history-list {
  .history-item {
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }

    .time {
      font-size: 12px;
      color: #9ca3af;
      margin-bottom: 4px;
    }

    .action {
      font-size: 14px;
      color: #374151;
      margin-bottom: 4px;
    }

    .operator {
      font-size: 12px;
      color: #6b7280;
    }
  }
}

.modal-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}
</style>
