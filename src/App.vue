<template>
  <v-app>
    <Header v-if="shouldShowHeader" @toggle-settings="toggleSettings" />
    <v-main>
      <div class="main-content" :class="{ 'login-layout': isLoginPage }">
        <Sidebar v-if="shouldShowSidebar" />
        <div class="content-area" :style="contentAreaStyle">
          <router-view />
        </div>
      </div>
    </v-main>
    
    <!-- 设置弹窗 -->
    <SettingsModal 
      v-if="shouldShowHeader"
      :visible="showSettings" 
      @close="closeSettings" 
    />
  </v-app>
</template>

<script>
import { ref, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import SettingsModal from './components/SettingsModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    SettingsModal
  },
  setup() {
    const route = useRoute()
    const sidebarCollapsed = ref(false)
    const rightPanelActive = ref(false)
    const showSettings = ref(false)
    
    const shouldShowSidebar = computed(() => {
      // 只在首页和对话页面显示侧边栏，且不在公共页面
      const publicPages = ['/login', '/register', '/forgot-password']
      return (route.path === '/' || route.path === '/chat') && !publicPages.includes(route.path)
    })
    
    const shouldShowHeader = computed(() => {
      // 不在公共页面时显示Header
      const publicPages = ['/login', '/register', '/forgot-password']
      return !publicPages.includes(route.path)
    })
    
    const isLoginPage = computed(() => {
      // 判断是否为公共页面（不需要Header和Sidebar的页面）
      const publicPages = ['/login', '/register', '/forgot-password']
      return publicPages.includes(route.path)
    })
    
    // 计算内容区域的左右边距
    const contentAreaStyle = computed(() => {
      // 如果是公共页面，不设置任何边距
      if (isLoginPage.value) {
        return {
          marginLeft: '0px',
          marginRight: '0px'
        }
      }
      
      let marginLeft = 0
      let marginRight = 0
      
      if (shouldShowSidebar.value && !sidebarCollapsed.value) {
        marginLeft = 280
      }
      
      if (route.path === '/chat' && rightPanelActive.value) {
        marginRight = 400
      }
      
      return {
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`
      }
    })
    
    // 设置弹窗控制函数
    const toggleSettings = () => {
      showSettings.value = !showSettings.value
    }
    
    const closeSettings = () => {
      showSettings.value = false
    }
    
    // 提供全局状态
    provide('sidebarCollapsed', sidebarCollapsed)
    provide('rightPanelActive', rightPanelActive)
    
    return {
      shouldShowSidebar,
      shouldShowHeader,
      isLoginPage,
      contentAreaStyle,
      showSettings,
      toggleSettings,
      closeSettings
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  min-height: calc(100vh - 64px);
}

.main-content.login-layout {
  min-height: 100vh;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: calc(100vh - 64px);
}

.login-layout .content-area {
  padding: 0;
  min-height: 100vh;
}
</style>
