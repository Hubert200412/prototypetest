<template>
  <div class="project-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载项目详情中...</p>
    </div>

    <!-- 项目未找到 -->
    <div v-else-if="!project" class="not-found-container">
      <div class="not-found-content">
        <h2>项目未找到</h2>
        <p>请检查项目ID是否正确</p>
        <button @click="goBack" class="back-btn">返回项目列表</button>
      </div>
    </div>

    <!-- 项目详情内容 -->
    <div v-else class="project-detail-content">
      <!-- 页面头部 -->
      <header class="project-header">
        <div class="header-nav">
          <button @click="goBack" class="back-button">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            返回
          </button>
          <div class="breadcrumb">
            <span>项目管理</span>
            <span class="separator">/</span>
            <span>{{ project.name }}</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="action-btn secondary" @click="editProject">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            编辑
          </button>
          <button 
            v-if="project.status === 'developing'" 
            class="action-btn primary" 
            @click="deployProject"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            部署项目
          </button>
          <button 
            v-if="project.status === 'deployed'" 
            class="action-btn primary" 
            @click="openProject"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
            访问项目
          </button>
        </div>
      </header>

      <!-- 项目基本信息卡片 -->
      <div class="project-overview">
        <div class="overview-main">
          <div class="project-title-section">
            <h1 class="project-title">{{ project.name }}</h1>
            <div class="project-badges">
              <span class="category-badge" :class="getCategoryClass(project.category)">
                {{ project.category }}
              </span>
              <span class="status-badge" :class="project.status">
                {{ getStatusText(project.status) }}
              </span>
              <span class="version-badge">v{{ project.version }}</span>
            </div>
          </div>
          <p class="project-description">{{ project.description }}</p>
          
          <!-- 项目标签 -->
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        
        <!-- 快速信息面板 -->
        <div class="overview-sidebar">
          <div class="quick-info">
            <div class="info-item">
              <span class="label">创建时间</span>
              <span class="value">{{ formatDate(project.createTime) }}</span>
            </div>
            <div class="info-item">
              <span class="label">更新时间</span>
              <span class="value">{{ formatDate(project.updateTime) }}</span>
            </div>
            <div class="info-item">
              <span class="label">开发周期</span>
              <span class="value">{{ project.developmentTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">项目复杂度</span>
              <span class="value complexity" :class="project.complexity">{{ project.complexity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目详细信息 -->
      <div class="project-details">
        <div class="details-grid">
          <!-- 技术架构 -->
          <div class="detail-card">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              技术架构
            </h3>
            <div class="tech-info">
              <div class="tech-item">
                <span class="tech-label">前端框架</span>
                <span class="tech-value">{{ project.framework }}</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">数据库</span>
                <span class="tech-value">{{ project.database }}</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">API数量</span>
                <span class="tech-value">{{ project.apiCount }}个</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">页面数量</span>
                <span class="tech-value">{{ project.pageCount }}个</span>
              </div>
              <div class="tech-item">
                <span class="tech-label">组件数量</span>
                <span class="tech-value">{{ project.componentCount }}个</span>
              </div>
            </div>
          </div>

          <!-- 功能特性 -->
          <div class="detail-card">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11H7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9h2V7a1 1 0 0 0-1-1h-3V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a1 1 0 0 0-1 1v2h2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9h2z"/>
              </svg>
              功能特性
            </h3>
            <div class="features-list">
              <div v-for="feature in project.features" :key="feature" class="feature-item">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                {{ feature }}
              </div>
            </div>
          </div>

          <!-- 使用组件 -->
          <div class="detail-card">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              使用组件
            </h3>
            <div class="components-grid">
              <span v-for="component in project.usedComponents" :key="component" class="component-tag">
                {{ component }}
              </span>
            </div>
          </div>

          <!-- 团队成员 -->
          <div class="detail-card">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.002 3.002 0 0 0 17.5 7c-.83 0-1.5.67-1.5 1.5V10h-3c-.55 0-1 .45-1 1v11h3v-6h2v6h3z"/>
              </svg>
              团队成员
            </h3>
            <div class="team-list">
              <div v-for="member in project.teamMembers" :key="member" class="team-member">
                <div class="member-avatar">{{ member.charAt(0) }}</div>
                <span class="member-name">{{ member }}</span>
              </div>
            </div>
          </div>

          <!-- 性能指标 -->
          <div class="detail-card" v-if="project.status === 'deployed'">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 16.49z"/>
              </svg>
              性能指标
            </h3>
            <div class="performance-grid">
              <div class="performance-item">
                <span class="performance-label">响应时间</span>
                <span class="performance-value good">{{ project.performance.responseTime }}</span>
              </div>
              <div class="performance-item">
                <span class="performance-label">运行时间</span>
                <span class="performance-value excellent">{{ project.performance.uptime }}</span>
              </div>
              <div class="performance-item">
                <span class="performance-label">日访问量</span>
                <span class="performance-value">{{ project.performance.dailyVisits }}</span>
              </div>
            </div>
          </div>

          <!-- 部署信息 -->
          <div class="detail-card" v-if="project.status === 'deployed'">
            <h3 class="card-title">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              部署信息
            </h3>
            <div class="deployment-info">
              <div class="deploy-item">
                <span class="deploy-label">访问地址</span>
                <a :href="project.deployUrl" target="_blank" class="deploy-link">
                  {{ project.deployUrl }}
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>
              <div class="deploy-item">
                <span class="deploy-label">部署时间</span>
                <span class="deploy-value">{{ formatDateTime(project.lastDeployTime) }}</span>
              </div>
              <div class="deploy-item">
                <span class="deploy-label">代码仓库</span>
                <a :href="project.gitRepo" target="_blank" class="deploy-link">
                  查看源码
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllProjects, getProjectById, formatDate, getStatusText } from '../utils/projectsData.js'

export default {
  name: 'ProjectDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const project = ref(null)

    // 获取项目详情
    const fetchProject = () => {
      loading.value = true
      const projectId = parseInt(route.params.id)
      const foundProject = getProjectById(projectId)
      
      setTimeout(() => {
        project.value = foundProject
        loading.value = false
      }, 500) // 模拟加载延迟
    }

    // 获取类别样式类
    const getCategoryClass = (category) => {
      return category.replace(/智造/g, '').toLowerCase()
    }

    // 格式化日期时间
    const formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return '-'
      return new Date(dateTimeString).toLocaleString('zh-CN')
    }

    // 返回上一页
    const goBack = () => {
      router.go(-1)
    }

    // 编辑项目
    const editProject = () => {
      // TODO: 实现编辑项目功能
      console.log('编辑项目:', project.value.name)
    }

    // 部署项目
    const deployProject = () => {
      // TODO: 实现部署项目功能
      console.log('部署项目:', project.value.name)
    }

    // 打开项目
    const openProject = () => {
      if (project.value.deployUrl) {
        window.open(project.value.deployUrl, '_blank')
      }
    }

    onMounted(() => {
      fetchProject()
    })

    return {
      loading,
      project,
      getCategoryClass,
      formatDate,
      formatDateTime,
      getStatusText,
      goBack,
      editProject,
      deployProject,
      openProject
    }
  }
}
</script>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.loading-container, .not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.not-found-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.back-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.project-detail-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 页面头部 */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.breadcrumb {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.separator {
  margin: 0 8px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #00d4aa;
  color: white;
}

.action-btn.primary:hover {
  background: #00b894;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 项目概览 */
.project-overview {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.overview-main {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-title-section {
  margin-bottom: 20px;
}

.project-title {
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.project-badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.category-badge, .status-badge, .version-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.category-badge.web { background: rgba(59, 130, 246, 0.3); color: #93c5fd; }
.category-badge.移动端 { background: rgba(16, 185, 129, 0.3); color: #6ee7b7; }
.category-badge.流程自动化 { background: rgba(245, 158, 11, 0.3); color: #fbbf24; }

.status-badge.deployed { background: rgba(34, 197, 94, 0.3); color: #86efac; }
.status-badge.developing { background: rgba(249, 115, 22, 0.3); color: #fdba74; }
.status-badge.pending { background: rgba(107, 114, 128, 0.3); color: #d1d5db; }

.version-badge {
  background: rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
}

.project-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.6;
  margin: 20px 0;
}

.project-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.overview-sidebar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
}

.quick-info .info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.quick-info .info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.info-item .value {
  color: white;
  font-weight: 500;
}

.value.complexity.高 { color: #ff6b6b; }
.value.complexity.中 { color: #feca57; }
.value.complexity.低 { color: #48dbfb; }

/* 详细信息网格 */
.project-details {
  margin-top: 30px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.tech-info .tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-item:last-child {
  border-bottom: none;
}

.tech-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.tech-value {
  color: white;
  font-weight: 500;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.feature-item svg {
  color: #00d4aa;
}

.components-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.component-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.member-name {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.performance-grid {
  display: grid;
  gap: 16px;
}

.performance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.performance-item:last-child {
  border-bottom: none;
}

.performance-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.performance-value {
  color: white;
  font-weight: 600;
}

.performance-value.good { color: #feca57; }
.performance-value.excellent { color: #00d4aa; }

.deployment-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.deploy-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.deploy-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.deploy-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00d4aa;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.deploy-link:hover {
  color: #48dbfb;
}

.deploy-value {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .project-detail-page {
    padding: 10px;
  }
  
  .project-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .project-overview {
    grid-template-columns: 1fr;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .project-title {
    font-size: 24px;
  }
}
</style>
