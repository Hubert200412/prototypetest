<template>
  <v-app-bar app color="rgba(255, 255, 255, 0.95)" elevation="1" height="64">
    <v-container fluid class="header-content">
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <v-btn text @click="goToHome" class="logo-btn">
            <span class="logo-text">智造工厂</span>
          </v-btn>
        </v-col>
        
        <v-col class="nav-section">
          <v-btn-toggle variant="text" class="nav-buttons">
            <v-btn 
              :to="'/'" 
              exact
              text
              class="nav-btn"
            >
              <v-icon left>mdi-home</v-icon>
              首页
            </v-btn>
            <v-btn 
              :to="'/docs'" 
              text
              class="nav-btn"
            >
              <v-icon left>mdi-file-document</v-icon>
              使用文档
            </v-btn>
            <v-menu
              offset-y
              open-on-hover
              close-on-content-click
            >
              <template v-slot:activator="{ props }">
                <v-btn 
                  text
                  class="nav-list"
                  v-bind="props"
                >
                  <v-icon left>mdi-network</v-icon>
                  协作网络
                </v-btn>
              </template>
              
              <v-list class="network-dropdown">
                <v-list-item @click="navigateTo('/network/teams')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-folder-network</v-icon>
                    团队项目
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="navigateTo('/network/community')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-account-group</v-icon>
                    社区分享
                  </v-list-item-title>
                </v-list-item>
                
                <v-list-item @click="navigateTo('/network/settings')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-cog-outline</v-icon>
                    协作设置
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn 
              :to="'/news'"
              text
              class="nav-btn"
            >
              <v-icon left>mdi-newspaper</v-icon>
              企业动态
            </v-btn>
            <v-btn 
              :to="'/plans'" 
              text
              class="nav-btn"
            >
              <v-icon left>mdi-package-variant</v-icon>
              套餐选择
            </v-btn>
            <v-btn 
              :to="'/profile'" 
              text
              class="nav-btn"
            >
              <v-icon left>mdi-account-cog</v-icon>
              账户管理
            </v-btn>
            <v-menu
              offset-y
              open-on-hover
              close-on-content-click
            >
              <template v-slot:activator="{ props }">
                <v-btn 
                  text
                  class="nav-list"
                  v-bind="props"
                >
                  <v-icon left>mdi-atom</v-icon>
                  原子化能力
                </v-btn>
              </template>
              
              <v-list class="network-dropdown">
                <v-list-item @click="navigateTo('/atomic/ai-models')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-brain</v-icon>
                    AI数据模型
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="navigateTo('/atomic/data-insights')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-chart-line</v-icon>
                    大数据洞察
                  </v-list-item-title>
                </v-list-item>
                
                <v-list-item @click="navigateTo('/atomic/user-behavior')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-account-search</v-icon>
                    用户行为分析
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="navigateTo('/atomic/scenarios')">
                  <v-list-item-title>
                    <v-icon left size="small">mdi-application-cog</v-icon>
                    应用场景
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn 
              :to="'/news'"
              text
              class="nav-btn"
            ></v-btn>
          </v-btn-toggle>
        </v-col>

        
        
        <v-col cols="auto">
          <div class="user-section">
            <v-btn text :to="'/profile'" class="user-info-btn">
              <v-avatar size="32" class="mr-2 header-avatar">
                <img 
                  v-if="userAvatar" 
                  :src="userAvatar" 
                  :alt="userName"
                  class="header-avatar-image"
                  @error="handleAvatarError"
                />
                <v-icon v-else>mdi-account-circle</v-icon>
              </v-avatar>
              <span class="user-name">{{ userName }}</span>
            </v-btn>
            
            <v-btn 
              icon
              @click="toggleSettings" 
              class="action-btn"
              size="small"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            
            <v-btn 
              icon
              @click="handleLogout" 
              class="action-btn"
              size="small"
              color="error"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '../utils/userData'

export default {
  name: 'Header',
  emits: ['toggle-settings'],
  setup(props, { emit }) {
    const router = useRouter()
    const userName = ref('')
    const userAvatar = ref('')
    
    // 初始化用户信息
    const initUserInfo = () => {
      const userInfo = getUserInfo()
      userName.value = userInfo.displayName || userInfo.username
      userAvatar.value = userInfo.avatar
    }
    
    const goToHome = () => {
      router.push('/')
    }
    
    const goToProfile = () => {
      router.push('/profile')
    }
    
    const navigateTo = (page) => {
      // 使用路由导航到指定页面
      router.push(page)
    }
    
    const toggleSettings = () => {
      emit('toggle-settings')
    }
    
    const handleLogout = () => {
      // 添加退出登录的确认对话框
      if (confirm('确定要退出登录吗？')) {
        // 清除用户状态和登录信息
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('currentUser')
        sessionStorage.clear()
        
        // 重定向到登录页面
        router.push('/login')
      }
    }

    const handleAvatarError = () => {
      // 当头像加载失败时，清空头像URL，使用默认图标
      userAvatar.value = ''
    }

    // 生命周期钩子
    onMounted(() => {
      initUserInfo()
    })
    
    return {
      userName,
      userAvatar,
      goToHome,
      goToProfile,
      navigateTo,
      toggleSettings,
      handleLogout,
      handleAvatarError
    }
  }
}
</script>

<style scoped>
.header-content {
  padding: 0 20px;
}

.logo-btn {
  text-transform: none !important;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
}

.nav-section {
  display: flex;
  justify-content: center;
  flex: 1;
}

.nav-buttons {
  background: transparent !important;
  box-shadow: none !important;
}

.nav-list {
  text-transform: none !important;
  margin: 0 4px;
  color: #666 !important;
}

.nav-btn {
  text-transform: none !important;
  margin: 0 4px;
  color: #666 !important;
}

.nav-btn.v-btn--active {
  color: #1976d2 !important;
  background: rgba(25, 118, 210, 0.1) !important;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info-btn {
  text-transform: none !important;
  color: #666 !important;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.action-btn {
  margin-left: 4px;
}

/* 头像样式 */
.header-avatar {
  width: 32px !important;
  height: 32px !important;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

/* 下拉菜单样式 */
.network-dropdown {
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  border-radius: 8px !important;
}

.network-dropdown .v-list-item {
  padding: 12px 16px;
  transition: background-color 0.2s ease;
}

.network-dropdown .v-list-item:hover {
  background-color: rgba(25, 118, 210, 0.08) !important;
}

.network-dropdown .v-list-item-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}

.network-dropdown .v-icon {
  margin-right: 8px;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 1024px) {
  .nav-section {
    display: none;
  }
}

@media (max-width: 600px) {
  .user-name {
    display: none;
  }
  
  .header-content {
    padding: 0 12px;
  }
}
</style>
