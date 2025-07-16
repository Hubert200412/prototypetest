<template>
  <div class="network-settings">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="page-header">
            <h1 class="page-title">协作设置</h1>
            <p class="page-subtitle">管理您的协作网络配置和权限设置</p>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-list class="settings-nav">
            <v-list-item
              v-for="section in settingSections"
              :key="section.key"
              @click="activeSection = section.key"
              :class="{ 'active': activeSection === section.key }"
              class="nav-item"
            >
              <v-list-item-title>
                <v-icon left>{{ section.icon }}</v-icon>
                {{ section.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="9">
          <v-card class="settings-content">
            <!-- 基本设置 -->
            <div v-if="activeSection === 'basic'" class="settings-section">
              <div class="section-header">
                <h2>基本设置</h2>
                <p>配置您的协作网络基本信息</p>
              </div>

              <v-form>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.displayName"
                      label="显示名称"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="settings.organization"
                      label="所属组织"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="settings.bio"
                      label="个人简介"
                      outlined
                      rows="3"
                      dense
                    />
                  </v-col>
                </v-row>
              </v-form>
            </div>

            <!-- 权限设置 -->
            <div v-if="activeSection === 'permissions'" class="settings-section">
              <div class="section-header">
                <h2>权限设置</h2>
                <p>管理您的协作权限和隐私设置</p>
              </div>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>允许他人查看我的项目</v-list-item-title>
                    <v-list-item-subtitle>其他用户可以浏览您的公开项目</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.allowProjectView" />
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>允许他人邀请我加入项目</v-list-item-title>
                    <v-list-item-subtitle>接收来自其他用户的协作邀请</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.allowInvitations" />
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>显示在线状态</v-list-item-title>
                    <v-list-item-subtitle>让其他用户知道您是否在线</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.showOnlineStatus" />
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </div>

            <!-- 通知设置 -->
            <div v-if="activeSection === 'notifications'" class="settings-section">
              <div class="section-header">
                <h2>通知设置</h2>
                <p>管理您的协作通知偏好</p>
              </div>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>新的协作邀请</v-list-item-title>
                    <v-list-item-subtitle>有人邀请您参与协作时通知</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.notifyInvitations" />
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>项目更新</v-list-item-title>
                    <v-list-item-subtitle>协作项目有新的更新时通知</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.notifyProjectUpdates" />
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>评论和反馈</v-list-item-title>
                    <v-list-item-subtitle>收到评论或反馈时通知</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.notifyComments" />
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </div>

            <!-- 安全设置 -->
            <div v-if="activeSection === 'security'" class="settings-section">
              <div class="section-header">
                <h2>安全设置</h2>
                <p>管理您的协作安全配置</p>
              </div>

              <v-row>
                <v-col cols="12">
                  <v-card outlined class="security-card">
                    <v-card-title>
                      <v-icon left color="warning">mdi-shield-alert</v-icon>
                      两步验证
                    </v-card-title>
                    <v-card-text>
                      为您的协作账户启用两步验证以提高安全性
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        :color="settings.twoFactorEnabled ? 'error' : 'primary'"
                        @click="toggleTwoFactor"
                      >
                        {{ settings.twoFactorEnabled ? '禁用' : '启用' }}两步验证
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12">
                  <v-card outlined class="security-card">
                    <v-card-title>
                      <v-icon left color="info">mdi-key</v-icon>
                      API 密钥管理
                    </v-card-title>
                    <v-card-text>
                      管理用于第三方集成的API密钥
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary" @click="manageApiKeys">
                        管理API密钥
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <!-- 保存按钮 -->
            <v-card-actions class="settings-actions">
              <v-spacer />
              <v-btn @click="resetSettings" text>
                重置
              </v-btn>
              <v-btn @click="saveSettings" color="primary">
                保存设置
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 确认对话框 -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title>确认操作</v-card-title>
        <v-card-text>{{ confirmMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmDialog = false" text>取消</v-btn>
          <v-btn @click="confirmAction" color="primary">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'NetworkSettings',
  setup() {
    const activeSection = ref('basic')
    const confirmDialog = ref(false)
    const confirmMessage = ref('')
    const confirmAction = ref(null)

    const settingSections = [
      {
        key: 'basic',
        title: '基本设置',
        icon: 'mdi-account-cog'
      },
      {
        key: 'permissions',
        title: '权限设置',
        icon: 'mdi-shield-account'
      },
      {
        key: 'notifications',
        title: '通知设置',
        icon: 'mdi-bell-cog'
      },
      {
        key: 'security',
        title: '安全设置',
        icon: 'mdi-security'
      }
    ]

    const settings = reactive({
      displayName: '张三',
      organization: '智造科技',
      bio: '专注于智能制造解决方案的开发',
      allowProjectView: true,
      allowInvitations: true,
      showOnlineStatus: true,
      notifyInvitations: true,
      notifyProjectUpdates: true,
      notifyComments: false,
      twoFactorEnabled: false
    })

    const originalSettings = ref({})

    const loadSettings = () => {
      // 从本地存储或API加载设置
      const savedSettings = localStorage.getItem('networkSettings')
      if (savedSettings) {
        Object.assign(settings, JSON.parse(savedSettings))
      }
      // 保存原始设置用于重置
      originalSettings.value = { ...settings }
    }

    const saveSettings = () => {
      // 保存设置到本地存储或发送到API
      localStorage.setItem('networkSettings', JSON.stringify(settings))
      showConfirm('设置已保存成功！', () => {
        // 可以添加成功后的操作
      })
    }

    const resetSettings = () => {
      showConfirm('确定要重置所有设置吗？', () => {
        Object.assign(settings, originalSettings.value)
      })
    }

    const toggleTwoFactor = () => {
      const action = settings.twoFactorEnabled ? '禁用' : '启用'
      showConfirm(`确定要${action}两步验证吗？`, () => {
        settings.twoFactorEnabled = !settings.twoFactorEnabled
        console.log(`两步验证已${action}`)
      })
    }

    const manageApiKeys = () => {
      // 跳转到API密钥管理页面或打开对话框
      console.log('打开API密钥管理')
    }

    const showConfirm = (message, callback) => {
      confirmMessage.value = message
      confirmAction.value = callback
      confirmDialog.value = true
    }

    const executeConfirmAction = () => {
      if (confirmAction.value) {
        confirmAction.value()
      }
      confirmDialog.value = false
    }

    onMounted(() => {
      loadSettings()
    })

    return {
      activeSection,
      settingSections,
      settings,
      confirmDialog,
      confirmMessage,
      saveSettings,
      resetSettings,
      toggleTwoFactor,
      manageApiKeys,
      confirmAction: executeConfirmAction
    }
  }
}
</script>

<style scoped>
.network-settings {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
}

.settings-nav {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.nav-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-item:hover {
  background-color: rgba(25, 118, 210, 0.05);
}

.nav-item.active {
  background-color: rgba(25, 118, 210, 0.1);
  border-right: 4px solid #1976d2;
}

.settings-content {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.settings-section {
  padding: 30px;
}

.section-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.section-header h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.section-header p {
  color: #7f8c8d;
  margin: 0;
}

.security-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.security-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.settings-actions {
  padding: 20px 30px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

/* 移动端适配 */
@media (max-width: 960px) {
  .settings-nav {
    margin-bottom: 20px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .settings-section {
    padding: 20px;
  }
}
</style>
