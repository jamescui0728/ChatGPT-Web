<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NCheckbox,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from 'naive-ui'

const router = useRouter()
const message = useMessage()

const loginForm = ref({
  username: '',
  password: '',
  remember: false,
})

const loading = ref(false)

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    message.warning('请输入用户名和密码')
    return
  }

  loading.value = true

  // 模拟登录
  setTimeout(() => {
    loading.value = false
    message.success('登录成功')
    router.push('/sales')
  }, 1000)
}
</script>

<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-pattern" />
    </div>

    <div class="login-container">
      <div class="login-left">
        <div class="brand-info">
          <div class="logo">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path
                fill="currentColor"
                d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3zm0 2.84L18 11v8h-2v-6H8v6H6v-8l6-5.16z"
              />
            </svg>
          </div>
          <h1>时代中国售楼系统</h1>
          <p>专业的房地产销售管理平台</p>
        </div>

        <div class="features">
          <div class="feature-item">
            <div class="icon">
              📊
            </div>
            <div class="text">
              <h3>数据驱动</h3>
              <p>实时销售数据分析，驱动业绩增长</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="icon">
              🏠
            </div>
            <div class="text">
              <h3>房源管理</h3>
              <p>智能销控表，高效管理每一套房源</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="icon">
              👥
            </div>
            <div class="text">
              <h3>客户管理</h3>
              <p>全流程客户跟进，提升转化率</p>
            </div>
          </div>
        </div>
      </div>

      <div class="login-right">
        <NCard class="login-card">
          <div class="card-header">
            <h2>欢迎登录</h2>
            <p>请输入您的账号信息</p>
          </div>

          <NForm :model="loginForm" size="large">
            <NFormItem>
              <NInput
                v-model:value="loginForm.username"
                placeholder="请输入用户名"
                :input-props="{ autocomplete: 'username' }"
              >
                <template #prefix>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </template>
              </NInput>
            </NFormItem>
            <NFormItem>
              <NInput
                v-model:value="loginForm.password"
                type="password"
                placeholder="请输入密码"
                show-password-on="click"
                :input-props="{ autocomplete: 'current-password' }"
              >
                <template #prefix>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </template>
              </NInput>
            </NFormItem>
            <NFormItem>
              <div class="form-options">
                <NCheckbox v-model:checked="loginForm.remember">
                  记住我
                </NCheckbox>
                <a href="#" class="forgot-link">忘记密码？</a>
              </div>
            </NFormItem>
            <NFormItem>
              <NButton
                type="primary"
                block
                :loading="loading"
                @click="handleLogin"
              >
                登 录
              </NButton>
            </NFormItem>
          </NForm>

          <div class="card-footer">
            <p>演示账号：admin / 123456</p>
          </div>
        </NCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 50%, #1a1f2e 100%);
  z-index: 0;

  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
  }
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  z-index: 1;
}

.login-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 80px;

  .brand-info {
    margin-bottom: 60px;

    .logo {
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 16px;
      color: white;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 36px;
      font-weight: 700;
      color: white;
      margin: 0 0 12px 0;
      letter-spacing: 2px;
    }

    p {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .feature-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
      }

      .icon {
        font-size: 28px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(245, 158, 11, 0.1);
        border-radius: 10px;
      }

      .text {
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
      }
    }
  }
}

.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 440px;
}

.login-card {
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);

  .card-header {
    text-align: center;
    margin-bottom: 32px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 8px 0;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .forgot-link {
      color: #f59e0b;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .card-footer {
    text-align: center;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #f3f4f6;

    p {
      font-size: 13px;
      color: #9ca3af;
      margin: 0;
    }
  }

  :deep(.n-input) {
    --n-border-radius: 10px;
    --n-height: 48px;
  }

  :deep(.n-button) {
    --n-height: 48px;
    --n-border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
