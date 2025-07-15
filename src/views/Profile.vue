<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- 用户信息卡片 -->
      <v-card class="profile-card mb-6" elevation="2">
        <v-card-text>
          <div class="profile-header">
            <div class="avatar-section">
              <v-avatar size="120" class="large-avatar">
                <img 
                  v-if="userInfo.avatar" 
                  :src="userInfo.avatar" 
                  :alt="userInfo.username"
                  class="avatar-image"
                  @error="handleAvatarError"
                />
                <v-icon v-else size="60" color="primary">mdi-account</v-icon>
              </v-avatar>
              <input
                ref="avatarInput"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp"
                style="display: none"
                @change="handleAvatarUpload"
              />
              <v-btn 
                variant="outlined" 
                size="small" 
                class="mt-3"
                @click="triggerAvatarUpload"
                :loading="avatarUploading"
              >
                <v-icon left>mdi-camera</v-icon>
                更换头像
              </v-btn>
            </div>
            <div class="user-details ml-6">
              <h1 class="username">{{ userInfo.displayName || userInfo.username }}</h1>
              <v-chip color="primary" variant="outlined" class="mb-2">
                <v-icon left>mdi-factory</v-icon>
                {{ userInfo.role }}
              </v-chip>
              <p class="join-date text-grey">
                <v-icon left size="16">mdi-calendar</v-icon>
                加入时间：{{ userInfo.joinDate }}
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 基本信息 -->
      <v-card class="info-section mb-6" elevation="2">
        <v-card-title>
          <v-icon left>mdi-account-edit</v-icon>
          基本信息
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="editingField === 'username'"
                v-model="editData.username"
                label="用户名"
                variant="outlined"
                @blur="saveEdit('username')"
                @keyup.enter="saveEdit('username')"
                append-inner-icon="mdi-check"
                @click:append-inner="saveEdit('username')"
              />
              <div v-else class="d-flex align-center justify-space-between">
                <div>
                  <label class="text-caption text-grey">用户名</label>
                  <div class="text-h6">{{ userInfo.username }}</div>
                </div>
                <v-btn icon size="small" @click="startEdit('username')">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="editingField === 'email'"
                v-model="editData.email"
                label="邮箱"
                type="email"
                variant="outlined"
                @blur="saveEdit('email')"
                @keyup.enter="saveEdit('email')"
                append-inner-icon="mdi-check"
                @click:append-inner="saveEdit('email')"
              />
              <div v-else class="d-flex align-center justify-space-between">
                <div>
                  <label class="text-caption text-grey">邮箱</label>
                  <div class="text-h6">{{ userInfo.email }}</div>
                </div>
                <v-btn icon size="small" @click="startEdit('email')">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="editingField === 'phone'"
                v-model="editData.phone"
                label="手机号"
                type="tel"
                variant="outlined"
                @blur="saveEdit('phone')"
                @keyup.enter="saveEdit('phone')"
                append-inner-icon="mdi-check"
                @click:append-inner="saveEdit('phone')"
              />
              <div v-else class="d-flex align-center justify-space-between">
                <div>
                  <label class="text-caption text-grey">手机号</label>
                  <div class="text-h6">{{ userInfo.phone }}</div>
                </div>
                <v-btn icon size="small" @click="startEdit('phone')">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="editingField === 'location'"
                v-model="editData.location"
                label="所在地区"
                variant="outlined"
                @blur="saveEdit('location')"
                @keyup.enter="saveEdit('location')"
                append-inner-icon="mdi-check"
                @click:append-inner="saveEdit('location')"
              />
              <div v-else class="d-flex align-center justify-space-between">
                <div>
                  <label class="text-caption text-grey">所在地区</label>
                  <div class="text-h6">{{ userInfo.location }}</div>
                </div>
                <v-btn icon size="small" @click="startEdit('location')">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 智造工厂专属统计 -->
      <v-card class="info-section mb-6" elevation="2">
        <v-card-title>
          <v-icon left>mdi-chart-box</v-icon>
          智造工厂统计
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-card 
                class="stat-card text-center" 
                elevation="1" 
                hover
                @click="goToProjects('all')"
              >
                <v-card-text>
                  <v-icon size="40" color="primary" class="mb-2">mdi-folder-multiple</v-icon>
                  <div class="text-h4 font-weight-bold">{{ projectStats.total }}</div>
                  <div class="text-subtitle-1 text-grey">已创建项目</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card text-center" elevation="1">
                <v-card-text>
                  <v-icon size="40" color="info" class="mb-2">mdi-clock</v-icon>
                  <div class="text-h4 font-weight-bold">{{ projectStats.totalUsageHours }}</div>
                  <div class="text-subtitle-1 text-grey">使用时长(小时)</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card 
                class="stat-card text-center" 
                elevation="1" 
                hover
                @click="goToProjects('deployed')"
              >
                <v-card-text>
                  <v-icon size="40" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <div class="text-h4 font-weight-bold">{{ projectStats.deployed }}</div>
                  <div class="text-subtitle-1 text-grey">成功部署</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card text-center" elevation="1">
                <v-card-text>
                  <v-icon size="40" color="warning" class="mb-2">mdi-cog</v-icon>
                  <div class="text-h4 font-weight-bold">{{ projectStats.customMCP }}</div>
                  <div class="text-subtitle-1 text-grey">自定义MCP</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 套餐信息 -->
      <v-card class="info-section mb-6" elevation="2">
        <v-card-title>
          <v-icon left>mdi-package-variant</v-icon>
          套餐信息
        </v-card-title>
        <v-card-text>
          <div class="subscription-card">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3 class="text-h5">{{ userSubscription.planName }}</h3>
              <v-chip color="success" variant="flat">
                <v-icon left>mdi-check-circle</v-icon>
                已激活
              </v-chip>
            </div>
            <v-row>
              <v-col cols="12" md="6">
                <v-list density="compact">
                  <v-list-item>
                    <v-list-item-title>到期时间</v-list-item-title>
                    <template v-slot:append>
                      <span>{{ userSubscription.expiryDate }}</span>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>剩余项目配额</v-list-item-title>
                    <template v-slot:append>
                      <span>{{ userSubscription.projectQuota - projectStats.total }}/{{ userSubscription.projectQuota }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <v-list density="compact">
                  <v-list-item>
                    <v-list-item-title>API调用限制</v-list-item-title>
                    <template v-slot:append>
                      <span>{{ userSubscription.apiLimit }}</span>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>专家模式</v-list-item-title>
                    <template v-slot:append>
                      <span>{{ userSubscription.expertModes }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <div class="d-flex">
              <v-btn color="primary" @click="goToPlans" class="mr-8">
                <v-icon left>mdi-arrow-up</v-icon>
                升级套餐
              </v-btn>
              <v-btn variant="outlined" @click="goToCurrentPlan">
                <v-icon left>mdi-refresh</v-icon>
                续费
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 最近活动 -->
      <div class="info-section">
        <h2 class="section-title">最近活动</h2>
        <div class="activity-list">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id"
            class="activity-item"
          >
            <img :src="activity.icon" :alt="activity.title" class="stat-icon-img" />
            <div class="activity-content">
              <h4>{{ activity.title }}</h4>
              <p>{{ activity.description }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 安全设置 -->
      <div class="info-section">
        <h2 class="section-title">安全设置</h2>
        <div class="security-items">
          <div 
            v-for="setting in securitySettings"
            :key="setting.id"
            class="security-item"
          >
            <div class="security-info">
              <h4>{{ setting.title }}</h4>
              <p>{{ setting.description }}</p>
            </div>
            <v-btn
              :color="getSecurityButtonColor(setting.actionType)"
              :variant="getSecurityButtonVariant(setting.actionType)"
              @click="handleSecurityAction(setting)"
              class="security-action-btn"
              :data-action-type="setting.actionType"
            >
              <v-icon left>{{ getSecurityButtonIcon(setting.actionType) }}</v-icon>
              {{ setting.action }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 双重验证设置弹窗 -->
    <v-dialog v-model="twoFactorDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="success">mdi-shield-check</v-icon>
          {{ twoFactorEnabled ? '关闭双重验证' : '启用双重验证' }}
        </v-card-title>
        <v-card-text>
          <div v-if="!twoFactorEnabled">
            <p class="mb-4">选择双重验证方式来提高账户安全性（可多选）：</p>
            <div class="two-factor-methods">
              <v-checkbox
                v-model="selectedTwoFactorMethods"
                value="sms"
                label="短信验证码"
              >
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon left>mdi-message-text</v-icon>
                    <span>短信验证码</span>
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="selectedTwoFactorMethods"
                value="email"
                label="邮箱验证码"
              >
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon left>mdi-email</v-icon>
                    <span>邮箱验证码</span>
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="selectedTwoFactorMethods"
                value="authenticator"
                label="身份验证器应用"
              >
                <template #label>
                  <div class="d-flex align-center">
                    <v-icon left>mdi-cellphone-key</v-icon>
                    <span>身份验证器应用</span>
                  </div>
                </template>
              </v-checkbox>
            </div>
          </div>
          <div v-else>
            <v-alert type="warning" class="mb-4">
              关闭双重验证将降低您的账户安全性。确定要继续吗？
            </v-alert>
            <p>当前启用的验证方式：</p>
            <div class="enabled-methods">
              <v-chip 
                v-for="method in currentTwoFactorMethods" 
                :key="method"
                color="success" 
                class="ma-1"
              >
                <v-icon left>mdi-check</v-icon>
                {{ getTwoFactorMethodName(method) }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeTwoFactorDialog">
            取消
          </v-btn>
          <v-btn 
            :color="twoFactorEnabled ? 'error' : 'success'" 
            variant="elevated" 
            @click="toggleTwoFactor"
            :loading="twoFactorLoading"
          >
            {{ twoFactorEnabled ? '关闭验证' : '启用验证' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- API密钥管理弹窗 -->
    <v-dialog v-model="apiKeyDialog" max-width="800px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="primary">mdi-key-variant</v-icon>
          API密钥管理
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-4">
            <p>管理您的API密钥，用于第三方应用集成</p>
            <v-btn color="primary" variant="elevated" @click="showCreateApiKey">
              <v-icon left>mdi-plus</v-icon>
              创建新密钥
            </v-btn>
          </div>
          
          <v-data-table
            :headers="apiKeyHeaders"
            :items="apiKeys"
            :items-per-page="5"
            class="elevation-1"
          >
            <template #item.name="{ item }">
              <div class="d-flex align-center">
                <v-icon left>mdi-key</v-icon>
                {{ item.name }}
              </div>
            </template>
            <template #item.status="{ item }">
              <v-chip
                :color="item.status === 'active' ? 'success' : 'error'"
                size="small"
              >
                {{ item.status === 'active' ? '活跃' : '已禁用' }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn
                icon
                size="small"
                color="info"
                @click="viewApiKey(item)"
                class="mr-2"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                color="error"
                @click="deleteApiKey(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeApiKeyDialog">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 创建API密钥弹窗 -->
    <v-dialog v-model="createApiKeyDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="primary">mdi-key-plus</v-icon>
          创建新API密钥
        </v-card-title>
        <v-card-text>
          <v-form ref="apiKeyForm" v-model="apiKeyFormValid">
            <v-text-field
              v-model="newApiKey.name"
              label="密钥名称"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-3"
            />
            <v-textarea
              v-model="newApiKey.description"
              label="描述（可选）"
              variant="outlined"
              rows="3"
              class="mb-3"
            />
            <v-select
              v-model="newApiKey.permissions"
              :items="apiPermissions"
              label="权限范围"
              variant="outlined"
              multiple
              chips
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeCreateApiKeyDialog">
            取消
          </v-btn>
          <v-btn 
            color="primary" 
            variant="elevated" 
            @click="createApiKey"
            :disabled="!apiKeyFormValid"
            :loading="apiKeyCreating"
          >
            创建密钥
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 登录历史弹窗 -->
    <v-dialog v-model="loginHistoryDialog" max-width="900px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="info">mdi-history</v-icon>
          登录历史
        </v-card-title>
        <v-card-text>
          <div class="mb-4">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="loginHistorySearch"
                  label="搜索登录记录"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="loginHistoryFilter"
                  :items="loginHistoryFilters"
                  label="筛选类型"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </div>
          
          <v-data-table
            :headers="loginHistoryHeaders"
            :items="filteredLoginHistory"
            :items-per-page="10"
            class="elevation-1"
          >
            <template #item.location="{ item }">
              <div class="d-flex align-center">
                <v-icon left>mdi-map-marker</v-icon>
                {{ item.location }}
              </div>
            </template>
            <template #item.device="{ item }">
              <div class="d-flex align-center">
                <v-icon left>{{ getDeviceIcon(item.device) }}</v-icon>
                {{ item.device }}
              </div>
            </template>
            <template #item.status="{ item }">
              <v-chip
                :color="getLoginStatusColor(item.status)"
                size="small"
              >
                <v-icon left size="12">{{ getLoginStatusIcon(item.status) }}</v-icon>
                {{ getLoginStatusText(item.status) }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn
                v-if="item.status === 'suspicious'"
                icon
                size="small"
                color="error"
                @click="reportSuspiciousLogin(item)"
              >
                <v-icon>mdi-alert</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeLoginHistoryDialog">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 修改密码弹窗 -->
    <v-dialog v-model="changePasswordDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon left color="warning">mdi-lock-reset</v-icon>
          修改密码
        </v-card-title>
        <v-card-text>
          <v-form ref="passwordFormRef" v-model="passwordFormValid">
            <p class="mb-4 text-body-2 text-grey-darken-1">
              为了确保账户安全，请输入当前密码并设置新密码。新密码应包含至少8个字符。
            </p>
            
            <v-text-field
              v-model="passwordForm.currentPassword"
              label="当前密码"
              :type="showCurrentPassword ? 'text' : 'password'"
              :append-inner-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showCurrentPassword = !showCurrentPassword"
              variant="outlined"
              class="mb-3"
              :rules="[rules.required]"
              required
            />
            
            <v-text-field
              v-model="passwordForm.newPassword"
              label="新密码"
              :type="showNewPassword ? 'text' : 'password'"
              :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showNewPassword = !showNewPassword"
              variant="outlined"
              class="mb-3"
              :rules="[rules.required, rules.minLength(8)]"
              required
            />
            
            <v-text-field
              v-model="passwordForm.confirmPassword"
              label="确认新密码"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              variant="outlined"
              class="mb-3"
              :rules="[rules.required, rules.passwordMatch]"
              required
            />
            
            <v-alert 
              type="info" 
              variant="tonal" 
              class="mb-4"
            >
              <v-icon>mdi-information</v-icon>
              <div class="ml-2">
                <strong>密码安全建议：</strong>
                <ul class="mt-2">
                  <li>使用至少8个字符</li>
                  <li>包含大写字母、小写字母和数字</li>
                  <li>避免使用常见的密码组合</li>
                  <li>不要与其他网站使用相同密码</li>
                </ul>
              </div>
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn 
            color="grey" 
            variant="text" 
            @click="closeChangePasswordDialog"
            :disabled="passwordChanging"
          >
            取消
          </v-btn>
          <v-btn 
            color="warning" 
            variant="elevated" 
            @click="changePassword"
            :loading="passwordChanging"
            :disabled="!passwordFormValid"
          >
            <v-icon left>mdi-lock-reset</v-icon>
            修改密码
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProjectStats } from '../utils/projectsData'
import { 
  getUserInfo, 
  getProjectStats as getUserProjectStats,
  getUserSubscription,
  getRecentActivities,
  getSecuritySettings,
  getLoginHistory,
  getApiKeys,
  addApiKey,
  removeApiKey,
  updateUserInfo,
  updateSecuritySetting,
  toggleTwoFactorAuth,
  getTwoFactorMethodName,
  formatTimeAgo
} from '../utils/userData'

export default {
  name: 'Profile',
  setup() {
    const router = useRouter()
    const editingField = ref('')
    
    // 从userData.js获取数据
    const userInfo = reactive({})
    const projectStats = ref({})
    const userSubscription = reactive({})
    const recentActivities = ref([])
    const securitySettings = ref([])
    
    const editData = reactive({
      username: '',
      email: '',
      phone: '',
      location: ''
    })

    // 弹窗状态
    const twoFactorDialog = ref(false)
    const apiKeyDialog = ref(false)
    const createApiKeyDialog = ref(false)
    const loginHistoryDialog = ref(false)
    const changePasswordDialog = ref(false)
    
    // 双重验证相关
    const twoFactorEnabled = ref(false)
    const currentTwoFactorMethods = ref([])
    const selectedTwoFactorMethods = ref([])
    const twoFactorLoading = ref(false)
    
    // API密钥相关
    const apiKeys = ref([])
    const newApiKey = reactive({
      name: '',
      description: '',
      permissions: []
    })
    const apiKeyFormValid = ref(false)
    const apiKeyCreating = ref(false)
    
    // API密钥表格头部
    const apiKeyHeaders = [
      { title: '名称', key: 'name', sortable: true },
      { title: '创建时间', key: 'createdAt', sortable: true },
      { title: '最后使用', key: 'lastUsed', sortable: true },
      { title: '状态', key: 'status', sortable: false },
      { title: '操作', key: 'actions', sortable: false }
    ]
    
    // API权限选项
    const apiPermissions = [
      { title: '读取项目', value: 'read:projects' },
      { title: '管理项目', value: 'write:projects' },
      { title: '读取用户信息', value: 'read:user' },
      { title: '管理用户信息', value: 'write:user' },
      { title: '访问统计数据', value: 'read:analytics' }
    ]
    
    // 登录历史相关
    const loginHistory = ref([])
    const loginHistorySearch = ref('')
    const loginHistoryFilter = ref('all')
    
    // 登录历史表格头部
    const loginHistoryHeaders = [
      { title: '时间', key: 'timestamp', sortable: true },
      { title: '位置', key: 'location', sortable: true },
      { title: '设备', key: 'device', sortable: true },
      { title: 'IP地址', key: 'ip', sortable: true },
      { title: '状态', key: 'status', sortable: true },
      { title: '操作', key: 'actions', sortable: false }
    ]
    
    // 登录历史筛选选项
    const loginHistoryFilters = [
      { title: '全部', value: 'all' },
      { title: '成功登录', value: 'success' },
      { title: '可疑登录', value: 'suspicious' },
      { title: '失败登录', value: 'failed' }
    ]
    
    // 修改密码相关
    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    const passwordFormValid = ref(false)
    const passwordChanging = ref(false)
    const showCurrentPassword = ref(false)
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)
    
    // 头像上传相关
    const avatarInput = ref(null)
    const avatarUploading = ref(false)
    
    // 表单验证规则
    const rules = {
      required: (value) => !!value || '此字段为必填项',
      minLength: (min) => (value) => (value && value.length >= min) || `密码至少需要${min}个字符`,
      passwordMatch: (value) => value === passwordForm.newPassword || '两次输入的密码不一致'
    }

    // 套餐ID映射 - 用于路由跳转
    const planIdMap = {
      'pro': 'professional',
      'basic': 'basic',
      'enterprise': 'enterprise'
    }

    // 计算属性
    const filteredLoginHistory = computed(() => {
      let filtered = loginHistory.value
      
      // 根据搜索条件筛选
      if (loginHistorySearch.value) {
        const search = loginHistorySearch.value.toLowerCase()
        filtered = filtered.filter(item => 
          item.location.toLowerCase().includes(search) ||
          item.device.toLowerCase().includes(search) ||
          item.ip.includes(search)
        )
      }
      
      // 根据状态筛选
      if (loginHistoryFilter.value !== 'all') {
        filtered = filtered.filter(item => item.status === loginHistoryFilter.value)
      }
      
      return filtered
    })

    // 初始化数据
    const initializeData = () => {
      // 获取用户基本信息
      const userData = getUserInfo()
      Object.assign(userInfo, userData)
      
      // 获取项目统计
      projectStats.value = getUserProjectStats()
      
      // 获取套餐信息
      const subscriptionData = getUserSubscription()
      Object.assign(userSubscription, subscriptionData)
      
      // 获取最近活动
      recentActivities.value = getRecentActivities(5)
      
      // 获取安全设置
      const settings = getSecuritySettings()
      securitySettings.value = settings
      
      // 初始化双重验证状态
      const twoFactorSetting = settings.find(s => s.id === 'twoFactor')
      if (twoFactorSetting) {
        twoFactorEnabled.value = twoFactorSetting.enabled
        currentTwoFactorMethods.value = twoFactorSetting.currentMethods || []
      }
      
      // 从userData.js获取API密钥和登录历史数据
      apiKeys.value = getApiKeys()
      loginHistory.value = getLoginHistory()
    }
    
    const startEdit = (field) => {
      if (editingField.value === field) {
        saveEdit(field)
      } else {
        editingField.value = field
        editData[field] = userInfo[field]
      }
    }
    
    const saveEdit = (field) => {
      // 更新本地数据
      userInfo[field] = editData[field]
      editingField.value = ''
      
      // 更新userData中的数据
      updateUserInfo(field, editData[field])
      
      // 这里可以添加保存到后端的逻辑
      console.log(`保存${field}:`, editData[field])
    }

    // 导航方法
    const goToProjects = (filter) => {
      router.push({
        path: '/projects',
        query: { filter }
      })
    }

    const goToPlans = () => {
      router.push('/plans')
    }

    const goToCurrentPlan = () => {
      const planId = planIdMap[userSubscription.planId] || 'basic'
      router.push(`/plans/${planId}`)
    }

    // 格式化活动时间
    const formatActivityTime = (timestamp) => {
      return formatTimeAgo(timestamp)
    }

    // 处理安全设置操作
    const handleSecurityAction = (setting) => {
      console.log(`执行安全操作: ${setting.action} - ${setting.title}`)
      switch (setting.actionType) {
        case 'change':
          changePasswordDialog.value = true
          break
        case 'enable':
          twoFactorDialog.value = true
          break
        case 'manage':
          apiKeyDialog.value = true
          break
        case 'view':
          loginHistoryDialog.value = true
          break
      }
    }

    // 双重验证相关方法
    const closeTwoFactorDialog = () => {
      twoFactorDialog.value = false
      selectedTwoFactorMethods.value = []
    }

    const toggleTwoFactor = async () => {
      twoFactorLoading.value = true
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const newEnabled = !twoFactorEnabled.value
        const methods = newEnabled ? selectedTwoFactorMethods.value : []
        
        // 使用userData.js中的函数更新状态
        const updatedSetting = toggleTwoFactorAuth(newEnabled, methods)
        
        if (updatedSetting) {
          twoFactorEnabled.value = newEnabled
          currentTwoFactorMethods.value = methods
          
          // 更新本地securitySettings数组
          const index = securitySettings.value.findIndex(s => s.id === 'twoFactor')
          if (index > -1) {
            securitySettings.value[index] = updatedSetting
          }
        }
        
        closeTwoFactorDialog()
      } catch (error) {
        console.error('双重验证设置失败:', error)
      } finally {
        twoFactorLoading.value = false
      }
    }

    const getTwoFactorMethodName = (method) => {
      const methods = {
        'sms': '短信验证码',
        'email': '邮箱验证码',
        'authenticator': '身份验证器应用'
      }
      return methods[method] || method
    }

    // API密钥相关方法
    const closeApiKeyDialog = () => {
      apiKeyDialog.value = false
    }

    const showCreateApiKey = () => {
      createApiKeyDialog.value = true
    }

    const closeCreateApiKeyDialog = () => {
      createApiKeyDialog.value = false
      newApiKey.name = ''
      newApiKey.description = ''
      newApiKey.permissions = []
    }

    const createApiKey = async () => {
      if (!apiKeyFormValid.value) return
      
      apiKeyCreating.value = true
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 使用userData.js中的函数创建API密钥
        const newKey = addApiKey({
          name: newApiKey.name,
          description: newApiKey.description,
          permissions: [...newApiKey.permissions]
        })
        
        // 更新本地列表
        apiKeys.value = getApiKeys()
        
        closeCreateApiKeyDialog()
      } catch (error) {
        console.error('创建API密钥失败:', error)
      } finally {
        apiKeyCreating.value = false
      }
    }

    const viewApiKey = (apiKey) => {
      // 显示API密钥详情或复制密钥
      console.log('查看API密钥:', apiKey)
      // 这里可以实现显示密钥的逻辑
    }

    const deleteApiKey = (apiKey) => {
      if (confirm(`确定要删除API密钥"${apiKey.name}"吗？`)) {
        // 使用userData.js中的函数删除API密钥
        const success = removeApiKey(apiKey.id)
        if (success) {
          // 更新本地列表
          apiKeys.value = getApiKeys()
        }
      }
    }

    // 登录历史相关方法
    const closeLoginHistoryDialog = () => {
      loginHistoryDialog.value = false
      loginHistorySearch.value = ''
      loginHistoryFilter.value = 'all'
    }

    const getDeviceIcon = (device) => {
      if (device.includes('Windows')) return 'mdi-microsoft-windows'
      if (device.includes('iPhone') || device.includes('Safari')) return 'mdi-apple'
      if (device.includes('Android')) return 'mdi-android'
      if (device.includes('Chrome')) return 'mdi-google-chrome'
      if (device.includes('Edge')) return 'mdi-microsoft-edge'
      return 'mdi-laptop'
    }

    const getLoginStatusColor = (status) => {
      switch (status) {
        case 'success': return 'success'
        case 'suspicious': return 'warning'
        case 'failed': return 'error'
        default: return 'grey'
      }
    }

    const getLoginStatusIcon = (status) => {
      switch (status) {
        case 'success': return 'mdi-check'
        case 'suspicious': return 'mdi-alert'
        case 'failed': return 'mdi-close'
        default: return 'mdi-help'
      }
    }

    const getLoginStatusText = (status) => {
      switch (status) {
        case 'success': return '成功'
        case 'suspicious': return '可疑'
        case 'failed': return '失败'
        default: return '未知'
      }
    }

    const reportSuspiciousLogin = (loginRecord) => {
      if (confirm(`确定要举报这次可疑登录吗？\n时间：${loginRecord.timestamp}\n位置：${loginRecord.location}`)) {
        console.log('举报可疑登录:', loginRecord)
        // 这里可以实现举报逻辑
      }
    }

    // 修改密码相关方法
    const closeChangePasswordDialog = () => {
      changePasswordDialog.value = false
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
      showCurrentPassword.value = false
      showNewPassword.value = false
      showConfirmPassword.value = false
    }

    const changePassword = async () => {
      if (!passwordFormValid.value) return
      
      passwordChanging.value = true
      
      try {
        // 模拟API调用验证当前密码并设置新密码
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 这里应该调用实际的API
        console.log('密码修改成功')
        
        // 显示成功消息
        alert('密码修改成功！')
        
        closeChangePasswordDialog()
      } catch (error) {
        console.error('密码修改失败:', error)
        alert('密码修改失败，请重试')
      } finally {
        passwordChanging.value = false
      }
    }

    // 获取安全按钮颜色
    const getSecurityButtonColor = (actionType) => {
      switch (actionType) {
        case 'change':
          return 'warning'
        case 'enable':
          return 'success'
        case 'manage':
          return 'primary'
        case 'view':
          return 'info'
        default:
          return 'primary'
      }
    }

    // 获取安全按钮变体
    const getSecurityButtonVariant = (actionType) => {
      switch (actionType) {
        case 'change':
          return 'elevated'
        case 'enable':
          return 'elevated'
        case 'manage':
          return 'outlined'
        case 'view':
          return 'flat'  // 改为flat样式，更现代化
        default:
          return 'elevated'
      }
    }

    // 获取安全按钮图标
    const getSecurityButtonIcon = (actionType) => {
      switch (actionType) {
        case 'change':
          return 'mdi-lock-reset'
        case 'enable':
          return 'mdi-shield-check'
        case 'manage':
          return 'mdi-key-variant'
        case 'view':
          return 'mdi-history'
        default:
          return 'mdi-cog'
      }
    }

    // 头像上传相关方法
    const triggerAvatarUpload = () => {
      avatarInput.value?.click()
    }

    const handleAvatarUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      // 验证文件类型 - 支持多种常见图片格式
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
      if (!allowedTypes.includes(file.type)) {
        alert('请选择支持的图片格式：JPG、PNG、GIF、WebP、BMP')
        return
      }

      // 验证文件大小（限制为5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片文件大小不能超过5MB')
        return
      }

      avatarUploading.value = true

      try {
        // 创建FormData准备上传
        const formData = new FormData()
        formData.append('avatar', file)

        // 模拟上传过程
        await new Promise(resolve => setTimeout(resolve, 1500))

        // 实际项目中这里应该调用真实的API
        // const response = await fetch('/api/upload-avatar', {
        //   method: 'POST',
        //   body: formData
        // })

        // 模拟成功上传后的处理
        // 创建本地预览URL
        const avatarUrl = URL.createObjectURL(file)
        
        // 更新用户信息中的头像
        userInfo.avatar = `/icons/用户头像.jpg?t=${Date.now()}`
        
        // 更新userData.js中的数据
        updateUserInfo('avatar', userInfo.avatar)

        // 在实际项目中，这里需要将文件保存到public/icons/用户头像.jpg
        // 由于浏览器安全限制，我们无法直接写入本地文件
        // 这需要通过后端API来处理文件保存
        console.log('头像上传成功，文件应保存为: public/icons/用户头像.jpg')
        console.log('原始文件类型:', file.type, '文件名:', file.name)
        
        alert('头像更换成功！')
        
        // 清空文件输入
        if (avatarInput.value) {
          avatarInput.value.value = ''
        }
        
      } catch (error) {
        console.error('头像上传失败:', error)
        alert('头像上传失败，请重试')
      } finally {
        avatarUploading.value = false
      }
    }

    const handleAvatarError = () => {
      // 当头像加载失败时的处理
      console.log('头像加载失败，使用默认图标')
    }

    // 生命周期钩子
    onMounted(() => {
      initializeData()
    })
    
    return {
      editingField,
      userInfo,
      editData,
      projectStats,
      userSubscription,
      recentActivities,
      securitySettings,
      twoFactorDialog,
      apiKeyDialog,
      createApiKeyDialog,
      loginHistoryDialog,
      twoFactorEnabled,
      currentTwoFactorMethods,
      selectedTwoFactorMethods,
      twoFactorLoading,
      apiKeys,
      newApiKey,
      apiKeyFormValid,
      apiKeyCreating,
      apiKeyHeaders,
      apiPermissions,
      loginHistory,
      loginHistorySearch,
      loginHistoryFilter,
      loginHistoryHeaders,
      loginHistoryFilters,
      filteredLoginHistory,
      rules,
      startEdit,
      saveEdit,
      goToProjects,
      goToPlans,
      goToCurrentPlan,
      formatActivityTime,
      handleSecurityAction,
      closeTwoFactorDialog,
      toggleTwoFactor,
      getTwoFactorMethodName,
      closeApiKeyDialog,
      showCreateApiKey,
      closeCreateApiKeyDialog,
      createApiKey,
      viewApiKey,
      deleteApiKey,
      closeLoginHistoryDialog,
      getDeviceIcon,
      getLoginStatusColor,
      getLoginStatusIcon,
      getLoginStatusText,
      reportSuspiciousLogin,
      getSecurityButtonColor,
      getSecurityButtonVariant,
      getSecurityButtonIcon,
      // 修改密码相关
      changePasswordDialog,
      passwordForm,
      passwordFormValid,
      passwordChanging,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      closeChangePasswordDialog,
      changePassword,
      // 头像上传相关
      avatarInput,
      avatarUploading,
      triggerAvatarUpload,
      handleAvatarUpload,
      handleAvatarError
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px 40px;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  gap: 24px;
  align-items: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.large-avatar {
  width: 120px !important;
  height: 120px !important;
  border-radius: 50%;
  border: 4px solid #f0f0f0;
  background: #f8f9fa;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.change-avatar-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.change-avatar-btn:hover {
  background: #1565c0;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.user-role {
  font-size: 16px;
  color: #1976d2;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.join-date {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.info-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item label {
  font-weight: 500;
  color: #666;
  font-size: 14px;
}

.info-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.edit-btn {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.edit-btn:hover {
  background: #e3f2fd;
}

.edit-input {
  flex: 1;
  border: none;
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  border: 2px solid #1976d2;
  outline: none;
  font-size: 14px;
}

.edit-input:focus {
  border-color: #1565c0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-icon-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.stat-info h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.stat-number {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1976d2;
}

.subscription-card {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  background: #f8f9fa;
}

.subscription-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.subscription-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.subscription-status {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.subscription-status.active {
  background: #e8f5e8;
  color: #2e7d32;
}

.subscription-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item:last-child {
  border-bottom: none;
}

.subscription-actions {
  display: flex;
  gap: 12px;
}

.upgrade-btn,
.renew-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upgrade-btn {
  background: #1976d2;
  color: white;
  border: none;
}

.upgrade-btn:hover {
  background: #1565c0;
}

.renew-btn {
  background: white;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.renew-btn:hover {
  background: #e3f2fd;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.activity-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.activity-content p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.activity-time {
  font-size: 12px;
  color: #999;
}

.security-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e7ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.security-item:hover {
  border-color: #c7d2fe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.security-info h4 {
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.security-info p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.4;
}

/* 安全设置按钮样式优化 */
.security-action-btn {
  min-width: 100px !important;
  height: 40px !important;
  font-weight: 500 !important;
  text-transform: none !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  transition: all 0.3s ease !important;
}

/* 特别优化查看按钮 */
.security-action-btn[data-action-type="view"] {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  color: white !important;
  border: none !important;
}

.security-action-btn[data-action-type="view"]:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
}

/* 其他按钮样式 */
.security-action-btn[data-action-type="change"] {
  background: #f59e0b !important;
  color: white !important;
}

.security-action-btn[data-action-type="change"]:hover {
  background: #d97706 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4) !important;
}

.security-action-btn[data-action-type="enable"] {
  background: #10b981 !important;
  color: white !important;
}

.security-action-btn[data-action-type="enable"]:hover {
  background: #059669 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4) !important;
}

.security-action-btn[data-action-type="manage"] {
  background: transparent !important;
  color: #6366f1 !important;
  border: 2px solid #6366f1 !important;
}

.security-action-btn[data-action-type="manage"]:hover {
  background: #6366f1 !important;
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4) !important;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 80px 10px 20px;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .subscription-actions {
    flex-direction: column;
  }
}
</style>
