<template>
  <div class="right-panel" :class="{ active: isActive }">
    <div class="panel-toggle" @click="togglePanel">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path :d="isActive ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'"/>
      </svg>
    </div>
    
    <div class="panel-content">
      <div class="panel-header">
        <h3>智造详情</h3>
        <button class="close-btn" @click="togglePanel">×</button>
      </div>
      
      <div class="panel-tabs">
        <div 
          class="tab" 
          :class="{ active: activeTab === 'progress' }"
          @click="activeTab = 'progress'"
        >
          智造进度
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'code' }"
          @click="activeTab = 'code'"
        >
          智造源码
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'materials' }"
          @click="activeTab = 'materials'"
        >
          智造资料
        </div>
      </div>
      
      <div class="panel-body">
        <!-- 智造进度 -->
        <div v-if="activeTab === 'progress'" class="progress-content">
          <div class="progress-header">
            <h4>项目进度概览</h4>
            <div class="progress-summary">
              <span class="progress-text">总体进度: {{ overallProgress }}%</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: overallProgress + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div class="progress-stages">
            <div 
              v-for="stage in progressStages" 
              :key="stage.id"
              class="progress-stage"
              :class="{ 
                completed: stage.status === 'completed',
                active: stage.status === 'active',
                pending: stage.status === 'pending'
              }"
            >
              <div class="stage-icon">
                <div class="stage-dot"></div>
              </div>
              <div class="stage-content">
                <h5>{{ stage.title }}</h5>
                <p>{{ stage.description }}</p>
                <div class="stage-time">{{ stage.time }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 智造源码 -->
        <div v-if="activeTab === 'code'" class="code-content">
          <div class="code-header">
            <h4>源码结构</h4>
            <button class="export-btn" @click="exportCode">导出代码</button>
          </div>
          
          <div class="code-tree">
            <div class="tree-item" v-for="item in codeStructure" :key="item.id">
              <div class="tree-node" @click="toggleCodeItem(item.id)">
                <span class="tree-icon">{{ item.expanded ? '📂' : '📁' }}</span>
                <span class="tree-name">{{ item.name }}</span>
                <span class="tree-type">{{ item.type }}</span>
              </div>
              <div v-if="item.expanded" class="tree-children">
                <div v-for="child in item.children" :key="child.id" class="tree-child">
                  <span class="child-icon">📄</span>
                  <span class="child-name">{{ child.name }}</span>
                  <span class="child-size">{{ child.size }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 智造资料 -->
        <div v-if="activeTab === 'materials'" class="materials-content">
          <div class="materials-header">
            <h4>收集资料</h4>
            <div class="materials-stats">
              <span>共 {{ materials.length }} 条资料</span>
            </div>
          </div>
          
          <div class="materials-list">
            <div v-for="material in materials" :key="material.id" class="material-item">
              <div class="material-icon">
                <span>{{ getMaterialIcon(material.type) }}</span>
              </div>
              <div class="material-content">
                <h5>{{ material.title }}</h5>
                <p>{{ material.description }}</p>
                <div class="material-meta">
                  <span class="material-type">{{ material.type }}</span>
                  <span class="material-time">{{ material.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'RightPanel',
  setup() {
    const isActive = ref(false)
    const activeTab = ref('progress')
    
    const togglePanel = () => {
      isActive.value = !isActive.value
    }
    
    const overallProgress = computed(() => {
      const completedStages = progressStages.value.filter(stage => stage.status === 'completed').length
      return Math.round((completedStages / progressStages.value.length) * 100)
    })
    
    const progressStages = ref([
      {
        id: 1,
        title: '需求分析',
        description: '分析用户需求，确定项目范围和功能要求',
        status: 'completed',
        time: '2025-01-08 10:30'
      },
      {
        id: 2,
        title: '架构设计',
        description: '设计系统架构，确定技术栈和项目结构',
        status: 'completed',
        time: '2025-01-08 14:20'
      },
      {
        id: 3,
        title: '前端开发',
        description: '构建用户界面，实现交互功能',
        status: 'active',
        time: '2025-01-08 16:45'
      },
      {
        id: 4,
        title: '后端开发',
        description: '开发API接口，实现业务逻辑',
        status: 'pending',
        time: '预计 2025-01-09 09:00'
      },
      {
        id: 5,
        title: '用例测试',
        description: '系统测试',
        status: 'pending',
        time: '预计 2025-01-09 15:00'
      },
      {
        id: 6,
        title: '项目部署',
        description: '部署上线',
        status: 'pending',
        time: '预计 2025-01-10 15:00'
      }
    ])
    
    const codeStructure = ref([
      {
        id: 1,
        name: 'frontend',
        type: 'Vue项目',
        expanded: false,
        children: [
          { id: 11, name: 'src/components/Header.vue', size: '3.2KB' },
          { id: 12, name: 'src/components/Sidebar.vue', size: '5.1KB' },
          { id: 13, name: 'src/views/Home.vue', size: '2.8KB' },
          { id: 14, name: 'src/App.vue', size: '1.5KB' }
        ]
      },
      {
        id: 2,
        name: 'backend',
        type: 'Node.js API',
        expanded: false,
        children: [
          { id: 21, name: 'server.js', size: '2.4KB' },
          { id: 22, name: 'routes/api.js', size: '3.8KB' },
          { id: 23, name: 'models/User.js', size: '1.9KB' }
        ]
      },
      {
        id: 3,
        name: 'database',
        type: 'SQL脚本',
        expanded: false,
        children: [
          { id: 31, name: 'schema.sql', size: '1.2KB' },
          { id: 32, name: 'data.sql', size: '0.8KB' }
        ]
      }
    ])
    
    const materials = ref([
      {
        id: 1,
        title: '用户需求文档',
        description: '详细的用户需求说明和功能要求',
        type: '需求分析',
        time: '2025-01-08 09:15'
      },
      {
        id: 2,
        title: '技术调研报告',
        description: 'Vue3 + Vite 技术栈调研结果',
        type: '技术资料',
        time: '2025-01-08 11:30'
      },
      {
        id: 3,
        title: '设计规范参考',
        description: '现代化UI设计规范和最佳实践',
        type: '设计资料',
        time: '2025-01-08 13:45'
      },
      {
        id: 4,
        title: '类似项目案例',
        description: '参考的优秀项目案例和解决方案',
        type: '参考案例',
        time: '2025-01-08 15:20'
      }
    ])
    
    const toggleCodeItem = (id) => {
      const item = codeStructure.value.find(item => item.id === id)
      if (item) {
        item.expanded = !item.expanded
      }
    }
    
    const exportCode = () => {
      // 实现代码导出功能
      console.log('导出代码...')
    }
    
    const getMaterialIcon = (type) => {
      const icons = {
        '需求分析': '📋',
        '技术资料': '🔧',
        '设计资料': '🎨',
        '参考案例': '💡'
      }
      return icons[type] || '📄'
    }
    
    return {
      isActive,
      activeTab,
      togglePanel,
      overallProgress,
      progressStages,
      codeStructure,
      materials,
      toggleCodeItem,
      exportCode,
      getMaterialIcon
    }
  }
}
</script>

<style scoped>
.right-panel {
  position: fixed;
  top: 60px;
  right: -400px;
  width: 400px;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 200;
  transition: right 0.3s ease;
}

.right-panel.active {
  right: 0;
}

.panel-toggle {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-right: none;
  border-radius: 6px 0 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
}

.panel-toggle:hover {
  background: rgba(25, 118, 210, 0.1);
  color: #1976d2;
}

.panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.1);
  color: #f44336;
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.tab {
  flex: 1;
  padding: 15px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.tab:hover,
.tab.active {
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* 进度内容样式 */
.progress-header {
  margin-bottom: 20px;
}

.progress-header h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.progress-summary {
  margin-bottom: 15px;
}

.progress-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  transition: width 0.3s ease;
}

.progress-stages {
  position: relative;
}

.progress-stages::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 30px;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.progress-stage {
  position: relative;
  padding-left: 40px;
  margin-bottom: 20px;
}

.stage-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e0e0e0;
  transition: all 0.3s ease;
}

.progress-stage.completed .stage-dot {
  background: #4caf50;
}

.progress-stage.active .stage-dot {
  background: #1976d2;
  animation: pulse 2s infinite;
}

.stage-content h5 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.stage-content p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
}

.stage-time {
  font-size: 12px;
  color: #999;
}

/* 代码内容样式 */
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.code-header h4 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.export-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #1565c0;
}

.code-tree {
  font-family: 'Courier New', monospace;
}

.tree-item {
  margin-bottom: 10px;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.tree-node:hover {
  background: rgba(25, 118, 210, 0.1);
}

.tree-icon {
  font-size: 16px;
}

.tree-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.tree-type {
  font-size: 12px;
  color: #666;
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 3px;
}

.tree-children {
  margin-left: 20px;
  border-left: 1px solid #e0e0e0;
  padding-left: 10px;
}

.tree-child {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  font-size: 13px;
}

.child-icon {
  font-size: 14px;
}

.child-name {
  flex: 1;
  color: #555;
}

.child-size {
  color: #999;
  font-size: 12px;
}

/* 资料内容样式 */
.materials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.materials-header h4 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.materials-stats {
  font-size: 12px;
  color: #666;
}

.materials-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.material-item {
  display: flex;
  gap: 12px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.material-item:hover {
  background: rgba(25, 118, 210, 0.05);
}

.material-icon {
  font-size: 20px;
  width: 24px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.material-content {
  flex: 1;
}

.material-content h5 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.material-content p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
}

.material-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
}

.material-type {
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
}

.material-time {
  color: #999;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
</style>
