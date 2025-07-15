<template>
  <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
    <div class="sidebar-toggle" @click="toggleSidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path :d="sidebarCollapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'"/>
      </svg>
    </div>
    
    <div class="sidebar-content">
      <div class="sidebar-header">
        <h3 v-show="!sidebarCollapsed">智造车间</h3>
        <button class="overview-btn" @click="goToProjectsPage" v-show="!sidebarCollapsed">
          项目总览 >
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <!-- WEB智造车间 -->
        <div class="workshop-section">
          <div 
            class="workshop-title" 
            @click="toggleWorkshop('web')"
            :class="{ active: expandedWorkshops.web }"
          >
            <div class="workshop-title-container">
              <span class="add-project" @click.stop="createNewProject('WEB智造')">+</span>
              <span class="workshop-icon">
                <div>&nbsp;&nbsp;&nbsp;</div>
                <img src="/icons/首页-WEB端.svg" alt="WEB智造车间" class="icon-svg" />
              </span>
              <span v-show="!sidebarCollapsed">WEB智造车间</span>
            </div>
            <div class="workshop-actions" v-show="!sidebarCollapsed">
              <span class="expand-icon">{{ expandedWorkshops.web ? '▼' : '▶' }}</span>
            </div>
          </div>
          <div v-show="expandedWorkshops.web && !sidebarCollapsed" class="product-list">
            <div class="product-item" v-for="product in webProjects" :key="product.id">
              <span class="project-name">{{ product.name }}</span>
              <span class="project-status" :class="product.status">{{ getStatusText(product.status) }}</span>
            </div>
          </div>
        </div>
        
        <!-- 移动端智造车间 -->
        <div class="workshop-section">
          <div 
            class="workshop-title" 
            @click="toggleWorkshop('mobile')"
            :class="{ active: expandedWorkshops.mobile }"
          >
            <div class="workshop-title-container">
              <span class="add-project" @click.stop="createNewProject('移动端智造')">+</span>
              <span class="workshop-icon">
                <div>&nbsp;&nbsp;&nbsp;</div>
                <img src="/icons/首页-移动端.svg" alt="移动端智造车间" class="icon-svg" />
              </span>
              <span v-show="!sidebarCollapsed">移动端智造车间</span>
            </div>
            <div class="workshop-actions" v-show="!sidebarCollapsed">
              <span class="expand-icon">{{ expandedWorkshops.mobile ? '▼' : '▶' }}</span>
            </div>
          </div>
          <div v-show="expandedWorkshops.mobile && !sidebarCollapsed" class="product-list">
            <div class="product-item" v-for="product in mobileProjects" :key="product.id">
              <span class="project-name">{{ product.name }}</span>
              <span class="project-status" :class="product.status">{{ getStatusText(product.status) }}</span>
            </div>
          </div>
        </div>

        <!-- 流程自动化智造车间 -->
        <div class="workshop-section">
          <div 
            class="workshop-title" 
            @click="toggleWorkshop('automation')"
            :class="{ active: expandedWorkshops.automation }"
          >
            <div class="workshop-title-container">
              <span class="add-project" @click.stop="createNewProject('流程自动化智造')">+</span>
              <span class="workshop-icon">
                <div>&nbsp;&nbsp;&nbsp;</div>
                <img src="/icons/首页-自动化.svg" alt="流程自动化智造车间" class="icon-svg" />
              </span>
              <span v-show="!sidebarCollapsed">流程自动化智造车间</span>
            </div>
            <div class="workshop-actions" v-show="!sidebarCollapsed">
              <span class="expand-icon">{{ expandedWorkshops.automation ? '▼' : '▶' }}</span>
            </div>
          </div>
          <div v-show="expandedWorkshops.automation && !sidebarCollapsed" class="product-list">
            <div class="product-item" v-for="product in automationProjects" :key="product.id">
              <span class="project-name">{{ product.name }}</span>
              <span class="project-status" :class="product.status">{{ getStatusText(product.status) }}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getProjectsByCategory, getStatusText } from '../utils/projectsData.js'

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter()
    const sidebarCollapsed = inject('sidebarCollapsed', ref(false))
    const expandedWorkshops = ref({
      web: false,
      mobile: false,
      automation: false
    })

    // 从项目数据中获取对应类别的项目
    const webProjects = computed(() => getProjectsByCategory('WEB智造'))
    const mobileProjects = computed(() => getProjectsByCategory('移动端智造'))
    const automationProjects = computed(() => getProjectsByCategory('流程自动化智造'))

    const toggleWorkshop = (workshop) => {
      if (sidebarCollapsed.value) return
      expandedWorkshops.value[workshop] = !expandedWorkshops.value[workshop]
    }

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    const goToProjectsPage = () => {
      router.push('/projects')
    }

    // 创建新项目的方法
    const createNewProject = (category) => {
      // 导航到项目创建页面，并传递项目类别
      router.push({ 
        path: '/projects/create', 
        query: { category }
      })
    }

    return {
      sidebarCollapsed,
      expandedWorkshops,
      webProjects,
      mobileProjects,
      automationProjects,
      toggleWorkshop,
      toggleSidebar,
      goToProjectsPage,
      getStatusText,
      createNewProject
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: -280px;
  width: 280px;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px 0;
  z-index: 100;
  transition: left 0.15s ease;
}

.sidebar:not(.collapsed) {
  left: 0;
}

.sidebar.collapsed {
  left: -60px;
  width: 60px;
}

.sidebar-toggle {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-left: none;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.15s ease;
}

.sidebar-toggle:hover {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.sidebar.collapsed .sidebar-header {
  padding: 0 10px 20px;
}

.sidebar-header h3 {
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin: 0;
}

.overview-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.overview-btn:hover {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
}

.workshop-section {
  margin-bottom: 15px;
}

.workshop-title {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #333;
  background: rgba(0, 0, 0, 0.02);
}

.workshop-title-container {
  display: flex;
  align-items: center;
}

.workshop-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-project {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-project:hover {
  background: rgba(25, 118, 210, 0.2);
  transform: scale(1.1);
}

.sidebar.collapsed .workshop-title {
  justify-content: center;
  padding: 12px 10px;
}

.workshop-title:hover,
.workshop-title.active {
  background: rgba(25, 118, 210, 0.1);
  border-left-color: #1976d2;
  color: #1976d2;
}

.workshop-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.sidebar.collapsed .workshop-icon {
  margin-right: 0;
}

.icon-svg {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.expand-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.product-list {
  background: rgba(0, 0, 0, 0.02);
  animation: slideDown 0.3s ease;
}

.product-item {
  padding: 10px 20px 10px 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 14px;
  border-left: 3px solid transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInUp 0.4s ease forwards;
}

.product-item:nth-child(1) {
  animation-delay: 0.05s;
}

.product-item:nth-child(2) {
  animation-delay: 0.1s;
}

.product-item:nth-child(3) {
  animation-delay: 0.15s;
}

.product-item:nth-child(4) {
  animation-delay: 0.2s;
}

.product-item:nth-child(5) {
  animation-delay: 0.25s;
}

.product-item:nth-child(n+6) {
  animation-delay: 0.3s;
}

.product-item:hover {
  background: rgba(25, 118, 210, 0.08);
  border-left-color: #1976d2;
  color: #1976d2;
}

.project-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
}

.project-status {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 500;
  flex-shrink: 0;
}

.project-status.developing {
  background: #fff3e0;
  color: #f57c00;
}

.project-status.deployed {
  background: #e8f5e8;
  color: #2e7d32;
}

.project-status.pending {
  background: #ffebee;
  color: #d32f2f;
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 200px;
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
