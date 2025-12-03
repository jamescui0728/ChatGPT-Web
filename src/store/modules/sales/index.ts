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

export interface SalesState {
  subscriptions: SubscriptionRecord[]
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
  },
})

export function useSalesStoreWithout() {
  return useSalesStore(store)
}
