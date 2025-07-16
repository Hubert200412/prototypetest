<template>
  <div class="projects-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">项目管理</h1>
        <p class="page-subtitle">查看和管理您的智造工厂项目</p>
      </div>
      <div class="header-actions">
        <button class="create-btn" @click="createProject">
          <span class="create-icon">+</span>
          创建项目
        </button>
      </div>
    </div>

    <!-- 项目统计 -->
    <div class="project-stats">
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-label">总项目数</div>
          <div class="stat-value">{{ projectStats.total }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">开发中</div>
          <div class="stat-value developing">{{ projectStats.developing }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">已部署</div>
          <div class="stat-value deployed">{{ projectStats.deployed }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">待发布</div>
          <div class="stat-value pending">{{ projectStats.pending }}</div>
        </div>
      </div>
    </div>

    <!-- 项目过滤 -->
    <div class="project-filters">
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.key"
          class="filter-tab"
          :class="{ active: activeFilter === tab.key }"
          @click="switchFilter(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="filter-actions">
        <div class="search-box">
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索项目..."
            class="search-input"
          />
        </div>
      </div>
    </div>

    <!-- 项目列表 -->
    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="project-card"
        @click="viewProject(project)"
      >
        <div class="project-header">
          <div class="project-type">
            <span class="type-badge" :class="project.category.replace(/智造/g, '')">{{ project.category }}</span>
          </div>
          <div class="project-status">
            <span class="status-badge" :class="project.status">{{ getStatusText(project.status) }}</span>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
        </div>
        <div class="project-footer">
          <div class="project-meta">
            <span class="create-time">{{ formatDate(project.createTime) }}</span>
            <span class="update-time">更新于 {{ formatDate(project.updateTime) }}</span>
          </div>
          <div class="project-actions">
            <button class="action-btn" @click.stop="editProject(project)">编辑</button>
            <button class="action-btn" @click.stop="deployProject(project)" v-if="project.status === 'developing'">部署</button>
            <button class="action-btn" @click.stop="viewDeployment(project)" v-if="project.status === 'deployed'">查看</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        class="page-btn"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        上一页
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button 
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllProjects, getProjectStats, formatDate, getStatusText } from '../utils/projectsData'

export default {
  name: 'ProjectsPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const searchKeyword = ref('')
    const activeFilter = ref('all')
    const currentPage = ref(1)
    const pageSize = 8

    // 初始化时检查查询参数
    onMounted(() => {
      if (route.query.filter) {
        activeFilter.value = route.query.filter
      }
    })

    const filterTabs = ref([
      { key: 'all', label: '全部项目' },
      { key: 'developing', label: '开发中' },
      { key: 'deployed', label: '已部署' },
      { key: 'pending', label: '待发布' }
    ])

    // 项目数据
    const projects = ref(getAllProjects())
    const projectStats = computed(() => getProjectStats())

    // 过滤后的项目
    const filteredProjects = computed(() => {
      let filtered = projects.value

      // 状态过滤
      if (activeFilter.value !== 'all') {
        filtered = filtered.filter(p => p.status === activeFilter.value)
      }

      // 搜索过滤
      if (searchKeyword.value) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
          p.description.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
          p.category.toLowerCase().includes(searchKeyword.value.toLowerCase())
        )
      }

      return filtered
    })

    // 分页相关
    const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize))
    const paginatedProjects = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      const end = start + pageSize
      return filteredProjects.value.slice(start, end)
    })

    // 方法
    const switchFilter = (key) => {
      activeFilter.value = key
      currentPage.value = 1
    }

    const changePage = (page) => {
      currentPage.value = page
    }

    const createProject = () => {
      router.push('/projects/create')
    }

    const viewProject = (project) => {
      router.push(`/projects/${project.id}`)
    }

    const editProject = (project) => {
      console.log('编辑项目:', project)
    }

    const deployProject = (project) => {
      console.log('部署项目:', project)
      project.status = 'deployed'
    }

    const viewDeployment = (project) => {
      console.log('查看部署:', project)
    }

    return {
      searchKeyword,
      activeFilter,
      currentPage,
      filterTabs,
      projects,
      projectStats,
      filteredProjects: paginatedProjects,
      totalPages,
      switchFilter,
      changePage,
      formatDate,
      getStatusText,
      createProject,
      viewProject,
      editProject,
      deployProject,
      viewDeployment
    }
  }
}
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  border-radius: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.page-subtitle {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
}

.create-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.create-btn:hover {
  background: #1565c0;
}

.create-icon {
  font-size: 20px;
  font-weight: bold;
}

.project-stats {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats-row {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.stat-value.developing {
  color: #ff9800;
}

.stat-value.deployed {
  color: #4caf50;
}

.stat-value.pending {
  color: #f44336;
}

.project-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: #1976d2;
  color: #1976d2;
}

.filter-tab.active {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.search-input {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 300px;
  font-size: 14px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.project-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.type-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.type-badge.WEB {
  background: #e8f5e8;
  color: #2e7d32;
}

.type-badge.移动端 {
  background: #fff3e0;
  color: #f57c00;
}

.type-badge.流程自动化 {
  background: #f3e5f5;
  color: #7b1fa2;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.developing {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.deployed {
  background: #e8f5e8;
  color: #2e7d32;
}

.status-badge.pending {
  background: #ffebee;
  color: #d32f2f;
}

.project-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.project-description {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.create-time, .update-time {
  font-size: 12px;
  color: #999;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  border-color: #1976d2;
  color: #1976d2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #1976d2;
  color: #1976d2;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-filters {
    flex-direction: column;
    gap: 16px;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>
