<template>
  <v-app>
    <Header @toggle-settings="toggleSettings" />
    <v-main>
      <div class="main-content">
        <Sidebar v-if="shouldShowSidebar" />
        <div class="content-area" :style="contentAreaStyle">
          <router-view />
        </div>
      </div>
    </v-main>
    
    <!-- 设置弹窗 -->
    <SettingsModal 
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
      // 只在首页和对话页面显示侧边栏
      return route.path === '/' || route.path === '/chat'
    })
    
    // 计算内容区域的左右边距
    const contentAreaStyle = computed(() => {
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

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: calc(100vh - 64px);
}
</style>
