import { defineStore } from 'pinia'
import { store } from '@/store/helper'

export interface SubscriptionRecord {
  id: string
  customer: string
  phone: string
  unit: string
  unitName: string
  projectName: string
  building: string
  area: number
  unitPrice: number
  totalPrice: number
  deposit: number
  sales: string
  subscriptionDate: string
  expireDate: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'converted'
  remark: string
}

export interface UnitData {
  id: string
  floor: number
  unit: number
  name: string
  area: number
  price: number
  unitPrice: number
  type: string
  status: 'available' | 'subscribed' | 'contracted' | 'reserved' | 'unavailable'
  direction: string
  customer: string | null
}

export interface FloorData {
  floor: number
  units: UnitData[]
}

// 项目配置
export interface ProjectConfig {
  buildings: { label: string; value: string }[]
  floors: number
  unitsPerFloor: number
}

export interface SalesState {
  subscriptions: SubscriptionRecord[]
  // 房源数据: key 为 "projectId-buildingId"
  buildingUnits: Record<string, FloorData[]>
}

// 生成认购编号
function generateSubscriptionId() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
  return `RG${year}${month}${day}${random}`
}

// 计算到期日期（默认7天后）
function getExpireDate(days = 7) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

// 获取当前日期
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

// 项目配置
const projectConfigs: Record<string, ProjectConfig> = {
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

// 户型和朝向配置
const typeLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const directions = ['东南', '西南', '东北', '西北', '正南', '正北', '正东', '正西']

// 使用种子生成伪随机数（确保相同输入产生相同结果）
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// 根据种子生成楼层数据
function generateFloorDataWithSeed(projectId: string, buildingId: string, floors: number, unitsPerFloor: number): FloorData[] {
  const floorList: FloorData[] = []
  const baseSeed = Number.parseInt(projectId) * 1000 + Number.parseInt(buildingId) * 100

  for (let floor = floors; floor >= 1; floor--) {
    const units: UnitData[] = []
    for (let unit = 1; unit <= unitsPerFloor; unit++) {
      const seed = baseSeed + floor * 10 + unit
      const random = seededRandom(seed)

      let status: UnitData['status'] = 'available'
      if (random < 0.20)
        status = 'subscribed'
      else if (random < 0.35)
        status = 'contracted'
      else if (random < 0.40)
        status = 'reserved'
      else if (random < 0.45)
        status = 'unavailable'

      const unitName = unit < 10 ? `${floor}0${unit}` : `${floor}${unit}`
      const areaSeed = seededRandom(seed + 1000)
      const priceSeed = seededRandom(seed + 2000)

      units.push({
        id: `${projectId}-${buildingId}-${unitName}`,
        floor,
        unit,
        name: unitName,
        area: 89 + Math.floor(areaSeed * 50),
        price: 2500000 + Math.floor(priceSeed * 1000000),
        unitPrice: 28000 + Math.floor(priceSeed * 5000),
        type: typeLabels[(unit - 1) % typeLabels.length],
        status,
        direction: directions[(unit - 1) % directions.length],
        customer: (status !== 'available' && status !== 'unavailable') ? `客户${Math.floor(seededRandom(seed + 3000) * 100)}` : null,
      })
    }
    floorList.push({ floor, units })
  }
  return floorList
}

export const useSalesStore = defineStore('sales-store', {
  state: (): SalesState => ({
    subscriptions: [
      // 默认数据
      {
        id: 'RG20240320001',
        customer: '陈建国',
        phone: '138****8888',
        unit: '1栋-18-1801',
        unitName: '1801',
        projectName: '阳光城·未来悦',
        building: '1栋',
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
        unitName: '1502',
        projectName: '阳光城·未来悦',
        building: '2栋',
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
    ],
    buildingUnits: {},
  }),

  getters: {
    // 获取所有认购记录
    allSubscriptions: state => state.subscriptions,

    // 按状态筛选
    pendingSubscriptions: state => state.subscriptions.filter(s => s.status === 'pending'),
    approvedSubscriptions: state => state.subscriptions.filter(s => s.status === 'approved'),

    // 统计数据
    stats: (state) => {
      const pending = state.subscriptions.filter(s => s.status === 'pending').length
      const approved = state.subscriptions.filter(s => s.status === 'approved').length
      const converted = state.subscriptions.filter(s => s.status === 'converted').length
      const totalAmount = state.subscriptions
        .filter(s => s.status !== 'cancelled' && s.status !== 'rejected')
        .reduce((sum, s) => sum + s.totalPrice, 0)
      return { pending, approved, converted, totalAmount }
    },
  },

  actions: {
    // 添加认购记录
    addSubscription(data: {
      customer: string
      phone: string
      unitName: string
      projectName: string
      building: string
      area: number
      unitPrice: number
      totalPrice: number
      deposit: number
      remark?: string
    }) {
      const newSubscription: SubscriptionRecord = {
        id: generateSubscriptionId(),
        customer: data.customer,
        phone: data.phone,
        unit: `${data.building}-${data.unitName}`,
        unitName: data.unitName,
        projectName: data.projectName,
        building: data.building,
        area: data.area,
        unitPrice: data.unitPrice,
        totalPrice: data.totalPrice,
        deposit: data.deposit,
        sales: '当前用户', // TODO: 从用户store获取
        subscriptionDate: getCurrentDate(),
        expireDate: getExpireDate(7),
        status: 'pending',
        remark: data.remark || '',
      }

      this.subscriptions.unshift(newSubscription)
      return newSubscription
    },

    // 更新认购状态
    updateSubscriptionStatus(id: string, status: SubscriptionRecord['status']) {
      const subscription = this.subscriptions.find(s => s.id === id)
      if (subscription)
        subscription.status = status
    },

    // 删除认购记录
    removeSubscription(id: string) {
      const index = this.subscriptions.findIndex(s => s.id === id)
      if (index > -1)
        this.subscriptions.splice(index, 1)
    },

    // 获取项目配置
    getProjectConfig(projectId: string): ProjectConfig {
      return projectConfigs[projectId] || projectConfigs['1']
    },

    // 获取楼栋房源数据（首次访问时生成，之后从缓存读取）
    getBuildingUnits(projectId: string, buildingId: string): FloorData[] {
      const key = `${projectId}-${buildingId}`

      // 如果已经有数据，直接返回
      if (this.buildingUnits[key])
        return this.buildingUnits[key]

      // 首次访问，生成数据并缓存
      const config = this.getProjectConfig(projectId)
      const floorData = generateFloorDataWithSeed(projectId, buildingId, config.floors, config.unitsPerFloor)
      this.buildingUnits[key] = floorData

      return floorData
    },

    // 更新房源状态
    updateUnitStatus(projectId: string, buildingId: string, unitName: string, status: UnitData['status'], customer?: string) {
      const key = `${projectId}-${buildingId}`
      const floorData = this.buildingUnits[key]

      if (floorData) {
        for (const floor of floorData) {
          const unit = floor.units.find(u => u.name === unitName)
          if (unit) {
            unit.status = status
            if (customer !== undefined)
              unit.customer = customer
            break
          }
        }
      }
    },
  },
})

export function useSalesStoreWithout() {
  return useSalesStore(store)
}
