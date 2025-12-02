<script setup lang="ts">
import { ref } from 'vue'
import {
  NAvatar,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NSwitch,
  NTabPane,
  NTabs,
  NUpload,
  useMessage,
} from 'naive-ui'

const message = useMessage()

// 基本设置
const basicSettings = ref({
  companyName: '阳光地产集团',
  projectName: '阳光城·未来悦',
  logo: '',
  theme: 'light',
  language: 'zh-CN',
})

// 通知设置
const notifySettings = ref({
  emailNotify: true,
  smsNotify: true,
  newCustomer: true,
  newSubscription: true,
  newContract: true,
  paymentReminder: true,
  expireReminder: true,
})

// 个人信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  email: 'zhangsan@company.com',
  department: '销售部',
  position: '销售经理',
})

// 安全设置
const securitySettings = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 主题选项
const themeOptions = [
  { label: '浅色主题', value: 'light' },
  { label: '深色主题', value: 'dark' },
  { label: '跟随系统', value: 'system' },
]

// 语言选项
const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁體中文', value: 'zh-TW' },
  { label: 'English', value: 'en-US' },
]

// 保存设置
const handleSave = () => {
  message.success('设置已保存')
}

// 修改密码
const handleChangePassword = () => {
  if (securitySettings.value.newPassword !== securitySettings.value.confirmPassword) {
    message.error('两次输入的密码不一致')
    return
  }
  message.success('密码修改成功')
  securitySettings.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}
</script>

<template>
  <div class="settings-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1>系统设置</h1>
        <p>配置系统参数和个人信息</p>
      </div>
    </div>

    <NCard>
      <NTabs type="line" animated>
        <!-- 基本设置 -->
        <NTabPane name="basic" tab="基本设置">
          <div class="settings-section">
            <h3>系统配置</h3>
            <NForm :model="basicSettings" label-placement="left" label-width="120">
              <NFormItem label="公司名称">
                <NInput v-model:value="basicSettings.companyName" placeholder="请输入公司名称" />
              </NFormItem>
              <NFormItem label="项目名称">
                <NInput v-model:value="basicSettings.projectName" placeholder="请输入项目名称" />
              </NFormItem>
              <NFormItem label="系统Logo">
                <NUpload
                  action="#"
                  :max="1"
                  list-type="image-card"
                >
                  点击上传
                </NUpload>
              </NFormItem>
              <NFormItem label="界面主题">
                <NSelect
                  v-model:value="basicSettings.theme"
                  :options="themeOptions"
                  style="width: 200px"
                />
              </NFormItem>
              <NFormItem label="系统语言">
                <NSelect
                  v-model:value="basicSettings.language"
                  :options="languageOptions"
                  style="width: 200px"
                />
              </NFormItem>
            </NForm>
            <div class="form-actions">
              <NButton type="primary" @click="handleSave">
                保存设置
              </NButton>
            </div>
          </div>
        </NTabPane>

        <!-- 通知设置 -->
        <NTabPane name="notify" tab="通知设置">
          <div class="settings-section">
            <h3>通知方式</h3>
            <NForm :model="notifySettings" label-placement="left" label-width="180">
              <NFormItem label="邮件通知">
                <NSwitch v-model:value="notifySettings.emailNotify" />
              </NFormItem>
              <NFormItem label="短信通知">
                <NSwitch v-model:value="notifySettings.smsNotify" />
              </NFormItem>
            </NForm>

            <h3>通知类型</h3>
            <NForm :model="notifySettings" label-placement="left" label-width="180">
              <NFormItem label="新客户到访提醒">
                <NSwitch v-model:value="notifySettings.newCustomer" />
              </NFormItem>
              <NFormItem label="新认购提醒">
                <NSwitch v-model:value="notifySettings.newSubscription" />
              </NFormItem>
              <NFormItem label="新签约提醒">
                <NSwitch v-model:value="notifySettings.newContract" />
              </NFormItem>
              <NFormItem label="回款提醒">
                <NSwitch v-model:value="notifySettings.paymentReminder" />
              </NFormItem>
              <NFormItem label="认购到期提醒">
                <NSwitch v-model:value="notifySettings.expireReminder" />
              </NFormItem>
            </NForm>
            <div class="form-actions">
              <NButton type="primary" @click="handleSave">
                保存设置
              </NButton>
            </div>
          </div>
        </NTabPane>

        <!-- 个人信息 -->
        <NTabPane name="profile" tab="个人信息">
          <div class="settings-section">
            <div class="profile-header">
              <NAvatar
                round
                :size="80"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=sales"
              />
              <NButton size="small">
                更换头像
              </NButton>
            </div>

            <NForm :model="userInfo" label-placement="left" label-width="100">
              <NFormItem label="姓名">
                <NInput v-model:value="userInfo.name" placeholder="请输入姓名" />
              </NFormItem>
              <NFormItem label="手机号码">
                <NInput v-model:value="userInfo.phone" placeholder="请输入手机号码" />
              </NFormItem>
              <NFormItem label="电子邮箱">
                <NInput v-model:value="userInfo.email" placeholder="请输入电子邮箱" />
              </NFormItem>
              <NFormItem label="所属部门">
                <NInput v-model:value="userInfo.department" disabled />
              </NFormItem>
              <NFormItem label="职位">
                <NInput v-model:value="userInfo.position" disabled />
              </NFormItem>
            </NForm>
            <div class="form-actions">
              <NButton type="primary" @click="handleSave">
                保存信息
              </NButton>
            </div>
          </div>
        </NTabPane>

        <!-- 安全设置 -->
        <NTabPane name="security" tab="安全设置">
          <div class="settings-section">
            <h3>修改密码</h3>
            <NForm :model="securitySettings" label-placement="left" label-width="120">
              <NFormItem label="当前密码">
                <NInput
                  v-model:value="securitySettings.oldPassword"
                  type="password"
                  placeholder="请输入当前密码"
                  show-password-on="click"
                />
              </NFormItem>
              <NFormItem label="新密码">
                <NInput
                  v-model:value="securitySettings.newPassword"
                  type="password"
                  placeholder="请输入新密码"
                  show-password-on="click"
                />
              </NFormItem>
              <NFormItem label="确认密码">
                <NInput
                  v-model:value="securitySettings.confirmPassword"
                  type="password"
                  placeholder="请再次输入新密码"
                  show-password-on="click"
                />
              </NFormItem>
            </NForm>
            <div class="form-actions">
              <NButton type="primary" @click="handleChangePassword">
                修改密码
              </NButton>
            </div>

            <h3>登录历史</h3>
            <div class="login-history">
              <div class="history-item">
                <div class="device">
                  Windows Chrome
                </div>
                <div class="info">
                  <span class="ip">192.168.1.100</span>
                  <span class="time">2024-03-20 14:30:00</span>
                </div>
              </div>
              <div class="history-item">
                <div class="device">
                  iPhone Safari
                </div>
                <div class="info">
                  <span class="ip">192.168.1.101</span>
                  <span class="time">2024-03-20 09:15:00</span>
                </div>
              </div>
              <div class="history-item">
                <div class="device">
                  Windows Chrome
                </div>
                <div class="info">
                  <span class="ip">192.168.1.100</span>
                  <span class="time">2024-03-19 18:20:00</span>
                </div>
              </div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style scoped lang="less">
.settings-page {
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

.settings-section {
  max-width: 600px;
  padding: 24px 0;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #f3f4f6;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f3f4f6;
  }

  .form-actions {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #f3f4f6;
  }

  .login-history {
    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f9fafb;
      border-radius: 8px;
      margin-bottom: 12px;

      .device {
        font-weight: 500;
        color: #374151;
      }

      .info {
        display: flex;
        gap: 24px;
        font-size: 13px;
        color: #6b7280;
      }
    }
  }
}
</style>
