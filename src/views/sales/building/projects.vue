<script setup lang="ts">
import { ref } from 'vue'
import {
  NButton,
  NDropdown,
  NGi,
  NGrid,
  NIcon,
  NInput,
  NProgress,
  NTag,
} from 'naive-ui'

// 项目列表数据
const projects = ref([
  {
    id: 1,
    name: '阳光城·未来悦',
    location: '杭州市余杭区文一西路888号',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop',
    totalUnits: 562,
    soldUnits: 276,
    price: '28000-35000',
    status: 'selling',
    type: '住宅',
    developer: '阳光城集团',
    openDate: '2024-03-15',
    deliveryDate: '2026-06-30',
  },
  {
    id: 2,
    name: '绿城·春江明月',
    location: '杭州市西湖区之江路1688号',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    totalUnits: 386,
    soldUnits: 312,
    price: '45000-58000',
    status: 'selling',
    type: '住宅',
    developer: '绿城集团',
    openDate: '2024-01-20',
    deliveryDate: '2025-12-31',
  },
  {
    id: 3,
    name: '万科·翡翠滨江',
    location: '杭州市滨江区江南大道2000号',
    image: 'https://images.unsplash.com/photo-1565315867035-638e9c59e3cc?w=400&h=250&fit=crop',
    totalUnits: 428,
    soldUnits: 428,
    price: '52000-68000',
    status: 'soldout',
    type: '住宅',
    developer: '万科集团',
    openDate: '2023-08-10',
    deliveryDate: '2025-08-30',
  },
  {
    id: 4,
    name: '龙湖·天璞',
    location: '杭州市拱墅区拱宸桥西路666号',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571f2b3c5?w=400&h=250&fit=crop',
    totalUnits: 298,
    soldUnits: 45,
    price: '38000-46000',
    status: 'presale',
    type: '住宅',
    developer: '龙湖集团',
    openDate: '2024-05-01',
    deliveryDate: '2026-12-31',
  },
  {
    id: 5,
    name: '融创·壹号院',
    location: '杭州市萧山区市心北路999号',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=250&fit=crop',
    totalUnits: 512,
    soldUnits: 189,
    price: '32000-42000',
    status: 'selling',
    type: '住宅',
    developer: '融创集团',
    openDate: '2024-02-28',
    deliveryDate: '2026-06-30',
  },
  {
    id: 6,
    name: '华润·万象天地',
    location: '杭州市钱塘区金沙大道1000号',
    image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=400&h=250&fit=crop',
    totalUnits: 186,
    soldUnits: 86,
    price: '15000-25000',
    status: 'selling',
    type: '商业',
    developer: '华润置地',
    openDate: '2024-04-15',
    deliveryDate: '2025-12-30',
  },
])

const searchText = ref('')

// 项目状态配置
const statusConfig: Record<string, { label: string; type: 'success' | 'warning' | 'info' | 'error' }> = {
  selling: { label: '在售', type: 'success' },
  presale: { label: '预售', type: 'warning' },
  soldout: { label: '售罄', type: 'info' },
  pending: { label: '待售', type: 'error' },
}

// 更多操作
const moreOptions = [
  { label: '编辑项目', key: 'edit' },
  { label: '查看详情', key: 'detail' },
  { label: '销控表', key: 'sales-control' },
  { type: 'divider', key: 'd1' },
  { label: '删除项目', key: 'delete' },
]

// 计算去化率
const getSalesRate = (sold: number, total: number) => {
  return Math.round((sold / total) * 100)
}
</script>

<template>
  <div class="projects-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>项目列表</h1>
        <p>管理所有楼盘项目信息</p>
      </div>
      <div class="header-actions">
        <NInput
          v-model:value="searchText"
          placeholder="搜索项目名称..."
          style="width: 240px"
        >
          <template #prefix>
            <NIcon>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </NIcon>
          </template>
        </NInput>
        <NButton type="primary">
          + 新增项目
        </NButton>
      </div>
    </div>

    <!-- 项目卡片网格 -->
    <NGrid :cols="3" :x-gap="20" :y-gap="20">
      <NGi v-for="project in projects" :key="project.id">
        <div class="project-card">
          <!-- 项目图片 -->
          <div class="project-image">
            <img :src="project.image" :alt="project.name">
            <div class="image-overlay">
              <NTag :type="statusConfig[project.status].type" size="small">
                {{ statusConfig[project.status].label }}
              </NTag>
              <NTag size="small" class="type-tag">
                {{ project.type }}
              </NTag>
            </div>
          </div>

          <!-- 项目信息 -->
          <div class="project-info">
            <div class="project-header">
              <h3 class="project-name">
                {{ project.name }}
              </h3>
              <NDropdown :options="moreOptions" trigger="click">
                <NButton quaternary circle size="small">
                  <template #icon>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </template>
                </NButton>
              </NDropdown>
            </div>

            <p class="project-location">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {{ project.location }}
            </p>

            <div class="project-price">
              <span class="label">均价</span>
              <span class="value">¥{{ project.price }}</span>
              <span class="unit">元/㎡</span>
            </div>

            <!-- 销售进度 -->
            <div class="sales-progress">
              <div class="progress-header">
                <span>去化进度</span>
                <span class="progress-text">
                  {{ project.soldUnits }}/{{ project.totalUnits }}套
                  ({{ getSalesRate(project.soldUnits, project.totalUnits) }}%)
                </span>
              </div>
              <NProgress
                type="line"
                :percentage="getSalesRate(project.soldUnits, project.totalUnits)"
                :show-indicator="false"
                :height="6"
                :border-radius="3"
                rail-color="#e5e7eb"
                :fill-color="getSalesRate(project.soldUnits, project.totalUnits) >= 80 ? '#10b981' : getSalesRate(project.soldUnits, project.totalUnits) >= 50 ? '#f59e0b' : '#6366f1'"
              />
            </div>

            <!-- 底部信息 -->
            <div class="project-footer">
              <div class="footer-item">
                <span class="label">开盘</span>
                <span class="value">{{ project.openDate }}</span>
              </div>
              <div class="footer-item">
                <span class="label">交付</span>
                <span class="value">{{ project.deliveryDate }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="project-actions">
              <NButton size="small" secondary>
                查看详情
              </NButton>
              <NButton size="small" type="primary">
                销控表
              </NButton>
            </div>
          </div>
        </div>
      </NGi>
    </NGrid>
  </div>
</template>

<style scoped lang="less">
.projects-page {
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

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }

  .project-image {
    position: relative;
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      gap: 8px;

      .type-tag {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
      }
    }
  }

  .project-info {
    padding: 20px;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;

      .project-name {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }
    }

    .project-location {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 16px 0;

      svg {
        flex-shrink: 0;
        color: #9ca3af;
      }
    }

    .project-price {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 16px;
      padding: 12px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 10px;

      .label {
        font-size: 12px;
        color: #92400e;
      }

      .value {
        font-size: 20px;
        font-weight: 700;
        color: #d97706;
      }

      .unit {
        font-size: 12px;
        color: #92400e;
      }
    }

    .sales-progress {
      margin-bottom: 16px;

      .progress-header {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 8px;

        .progress-text {
          font-weight: 500;
          color: #374151;
        }
      }
    }

    .project-footer {
      display: flex;
      gap: 24px;
      padding: 12px 0;
      border-top: 1px solid #f3f4f6;
      margin-bottom: 16px;

      .footer-item {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .label {
          font-size: 12px;
          color: #9ca3af;
        }

        .value {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
      }
    }

    .project-actions {
      display: flex;
      gap: 12px;

      button {
        flex: 1;
      }
    }
  }
}
</style>
