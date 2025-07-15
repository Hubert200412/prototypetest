<template>
  <div class="knowledge-base">
    <!-- 知识库头部 -->
    <div class="kb-header">
      <h3 class="kb-title">企业知识库</h3>
      <div class="kb-actions">
        <button class="action-btn" @click="showImportModal = true">
          导入
        </button>
        <button class="action-btn" @click="showCreateModal = true">
          新建
        </button>
      </div>
    </div>

    <!-- 知识库类型导航 -->
    <div class="kb-nav">
      <button 
        v-for="type in knowledgeTypes" 
        :key="type.key"
        class="kb-nav-item"
        :class="{ active: activeType === type.key }"
        @click="switchType(type.key)"
      >
        <img :src="type.icon" :alt="type.label" class="nav-icon" />
        <span>{{ type.label }}</span>
      </button>
    </div>

    <!-- 权限提示 -->
    <div v-if="!hasPermission" class="permission-notice">
      <img src="/icons/权限锁定.svg" alt="权限锁定" class="notice-icon" />
      <span>您当前没有访问此知识库的权限</span>
    </div>

    <!-- 知识卡片列表 -->
    <div v-else class="kb-content">
      <div class="knowledge-grid">
        <div 
          v-for="item in filteredKnowledge" 
          :key="item.id"
          class="knowledge-card"
          @click="showKnowledgeDetail(item)"
        >
          <div class="card-header">
            <div class="card-type">
              <img :src="getTypeIcon(item.type)" :alt="item.type" class="type-icon" />
              <span class="type-label">{{ item.type }}</span>
            </div>
            <button class="favorite-btn" :class="{ favorited: item.favorited }" @click.stop="toggleFavorite(item)">
              <img :src="item.favorited ? '/icons/知识库-收藏.svg' : '/icons/知识库-未收藏.svg'" 
                   :alt="item.favorited ? '已收藏' : '未收藏'" 
                   class="favorite-icon" />
            </button>
          </div>
          <h4 class="card-title">{{ item.title }}</h4>
          <p class="card-summary">{{ item.aiSummary }}</p>
          <div class="card-footer">
            <div class="card-stats">
              <span class="stat-item">
                <img src="/icons/知识库-收藏.svg" alt="收藏" class="stat-icon" />
                <span>{{ item.favoriteCount }}</span>
              </span>
              <span class="stat-item">
                <img src="/icons/知识库-解决方案.svg" alt="解决方案" class="stat-icon" />
                <span>{{ item.solutionCount }}个解决方案</span>
              </span>
            </div>
            <div class="card-source">
              <span class="source-tag">{{ item.source }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导入模态框 -->
    <div v-if="showImportModal" class="modal-overlay" @click="closeImportModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>导入知识</h3>
          <button class="close-btn" @click="closeImportModal">×</button>
        </div>
        <div class="modal-body">
          <div class="import-options">
            <div class="import-option" @click="selectImportType('api')">
              <img src="/icons/知识库-API导入.svg" alt="API导入" class="option-icon" />
              <div class="option-content">
                <h4>API导入</h4>
                <p>通过API接口导入外部数据源</p>
              </div>
            </div>
            <div class="import-option" @click="selectImportType('file')">
              <img src="/icons/知识库-文件导入选项.svg" alt="本地文件" class="option-icon" />
              <div class="option-content">
                <h4>本地文件</h4>
                <p>上传本地文档、视频、图片等文件</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新建模态框 -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>新建知识</h3>
          <button class="close-btn" @click="closeCreateModal">×</button>
        </div>
        <div class="modal-body">
          <form class="create-form" @submit.prevent="createKnowledge">
            <div class="form-group">
              <label>标题</label>
              <input v-model="newKnowledge.title" type="text" placeholder="请输入知识标题" required />
            </div>
            <div class="form-group">
              <label>类型</label>
              <select v-model="newKnowledge.type" required>
                <option value="">请选择类型</option>
                <option value="文档">文档</option>
                <option value="视频">视频</option>
                <option value="流程图">流程图</option>
              </select>
            </div>
            <div class="form-group">
              <label>内容</label>
              <textarea v-model="newKnowledge.content" placeholder="请输入知识内容" rows="6"></textarea>
            </div>
            <div class="form-group">
              <label>数据来源</label>
              <select v-model="newKnowledge.source">
                <option value="支付金融标签">支付金融标签</option>
                <option value="模型应用">模型应用</option>
                <option value="原子能力集">原子能力集</option>
                <option value="自定义">自定义</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closeCreateModal">取消</button>
              <button type="submit" class="submit-btn" :disabled="isCreating">
                {{ isCreating ? '创建中...' : '创建' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 知识详情模态框已移动到Home页面 -->
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'

export default {
  name: 'KnowledgeBase',
  emits: ['show-knowledge-detail'],
  setup(props, { emit }) {
    const showImportModal = ref(false)
    const showCreateModal = ref(false)
    const activeType = ref('企业')
    const isCreating = ref(false)
    
    // 用户权限模拟（实际应从后端获取）
    const userRole = ref('员工') // 领导、部门经理、员工
    
    const knowledgeTypes = ref([
      { key: '导入', label: 'API导入', icon: '/icons/知识库-API导入.svg' },
      { key: '本地', label: '本地文件', icon: '/icons/知识库-文件导入选项.svg' },
      { key: '收藏', label: '我的收藏', icon: '/icons/知识库-收藏.svg' },
      { key: '企业', label: '企业知识库', icon: '/icons/知识库-企业.svg' },
      { key: '广场', label: '公共广场', icon: '/icons/知识库-广场.svg' }
    ])
    
    const newKnowledge = reactive({
      title: '',
      type: '',
      content: '',
      source: ''
    })
    
    // 模拟知识库数据
    const knowledgeData = ref([
      {
        id: 1,
        title: '支付系统风险控制最佳实践',
        type: '文档',
        aiSummary: '基于机器学习的实时风险评估系统，包含反欺诈策略、交易监控和异常检测机制。适用于金融支付场景的风险管控。',
        source: '支付金融标签',
        favoriteCount: 126,
        solutionCount: 8,
        favorited: true,
        category: '企业',
        createTime: '2024-06-15',
        content: '详细的支付风险控制文档内容...',
        solutions: [
          { id: 1, title: '反欺诈检测系统' },
          { id: 2, title: '实时交易监控平台' }
        ]
      },
      {
        id: 2,
        title: 'MCP模块开发指南视频',
        type: '视频',
        aiSummary: '详细介绍了MCP（Model Context Protocol）模块的开发流程，包括接口设计、数据处理和集成方法。',
        source: '模型应用',
        favoriteCount: 89,
        solutionCount: 5,
        favorited: false,
        category: '企业',
        createTime: '2024-06-10',
        videoUrl: '/videos/mcp-guide.mp4',
        solutions: [
          { id: 3, title: 'MCP开发框架' },
          { id: 4, title: 'API集成工具' }
        ]
      },
      {
        id: 3,
        title: '智造工厂业务流程图',
        type: '流程图',
        aiSummary: '展示了智造工厂平台的完整业务流程，从需求输入到应用部署的全链路处理流程。',
        source: '原子能力集',
        favoriteCount: 67,
        solutionCount: 3,
        favorited: true,
        category: '企业',
        createTime: '2024-06-08',
        imageUrl: '/icons/知识库-业务流程图.svg',
        solutions: [
          { id: 5, title: '自动化部署系统' }
        ]
      }
    ])
    
    // 权限检查
    const hasPermission = computed(() => {
      if (activeType.value === '企业') {
        return ['领导', '部门经理', '员工'].includes(userRole.value)
      }
      if (activeType.value === '收藏') {
        return true
      }
      return ['领导', '部门经理'].includes(userRole.value)
    })
    
    // 过滤知识数据
    const filteredKnowledge = computed(() => {
      return knowledgeData.value.filter(item => {
        if (activeType.value === '收藏') {
          return item.favorited
        }
        return item.category === activeType.value
      })
    })
    
    const switchType = (type) => {
      activeType.value = type
    }
    
    const getTypeIcon = (type) => {
      const iconMap = {
        '文档': '/icons/文档.svg',
        '视频': '/icons/视频.svg',
        '流程图': '/icons/知识库-业务流程图.svg'
      }
      return iconMap[type] || '/icons/文档.svg'
    }
    
    const toggleFavorite = (item) => {
      item.favorited = !item.favorited
      if (item.favorited) {
        item.favoriteCount++
      } else {
        item.favoriteCount--
      }
    }
    
    const showKnowledgeDetail = (item) => {
      emit('show-knowledge-detail', item)
    }
    
    const closeImportModal = () => {
      showImportModal.value = false
    }
    
    const closeCreateModal = () => {
      showCreateModal.value = false
      // 重置表单
      Object.assign(newKnowledge, {
        title: '',
        type: '',
        content: '',
        source: '支付金融标签'
      })
    }
    
    const selectImportType = (type) => {
      console.log('选择导入类型:', type)
      // 这里可以实现具体的导入逻辑
      closeImportModal()
    }
    
    const createKnowledge = async () => {
      isCreating.value = true
      
      // 模拟创建过程
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 生成AI总结（模拟）
      const aiSummary = await generateAISummary(newKnowledge.content)
      
      const newItem = {
        id: Date.now(),
        title: newKnowledge.title,
        type: newKnowledge.type,
        content: newKnowledge.content,
        source: newKnowledge.source,
        aiSummary: aiSummary,
        favoriteCount: 0,
        solutionCount: 0,
        favorited: false,
        category: '企业',
        createTime: new Date().toISOString().split('T')[0],
        solutions: []
      }
      
      knowledgeData.value.unshift(newItem)
      
      isCreating.value = false
      closeCreateModal()
    }
    
    const generateAISummary = async (content) => {
      // 模拟调用Deepseek模型生成总结
      const summaries = [
        '基于深度学习的智能分析系统，提供自动化的数据处理和决策支持功能。',
        '集成多种算法模型的综合解决方案，适用于复杂业务场景的智能化处理。',
        '采用先进的机器学习技术，实现高效的数据分析和预测功能。'
      ]
      return summaries[Math.floor(Math.random() * summaries.length)]
    }
    
    const jumpToSolution = (solution) => {
      console.log('跳转到解决方案:', solution.title)
      // 这里可以实现跳转到解决方案的逻辑
    }
    
    return {
      showImportModal,
      showCreateModal,
      activeType,
      isCreating,
      userRole,
      knowledgeTypes,
      newKnowledge,
      hasPermission,
      filteredKnowledge,
      switchType,
      getTypeIcon,
      toggleFavorite,
      showKnowledgeDetail,
      closeImportModal,
      closeCreateModal,
      selectImportType,
      createKnowledge,
      jumpToSolution
    }
  }
}
</script>

<style scoped>
.knowledge-base {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  max-height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.kb-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.kb-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.kb-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: #1565c0;
}

.action-btn.small {
  padding: 6px 12px;
  font-size: 12px;
}

.kb-nav {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.kb-nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}

.kb-nav-item:hover {
  background: #e3f2fd;
  border-color: #1976d2;
  color: #1976d2;
}

.kb-nav-item.active {
  background: #1976d2;
  color: white;
  border-color: #1976d2;
}

.nav-icon {
  font-size: 16px;
}

.permission-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  color: #856404;
  text-align: center;
  justify-content: center;
}

.notice-icon {
  font-size: 18px;
}

.kb-content {
  flex: 1;
  overflow: hidden;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}

.knowledge-card {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.knowledge-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-color: #1976d2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.card-summary {
  color: #666;
  font-size: 12px;
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-type {
  display: flex;
  align-items: center;
  gap: 4px;
}

.type-icon {
  font-size: 14px;
}

.type-label {
  font-size: 10px;
  color: #666;
  background: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.card-stats {
  display: flex;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #666;
}

/* 图标样式 */
.nav-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.notice-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.action-icon {
  width: 12px;
  height: 12px;
  object-fit: contain;
  margin-right: 4px;
}

.type-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.favorite-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.stat-icon {
  width: 12px;
  height: 12px;
  object-fit: contain;
}

.option-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.ai-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  margin-right: 6px;
}

.source-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.fullscreen {
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-content.large {
  max-width: 900px;
  max-height: 90vh;
}

.modal-content.fullscreen-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1200px;
  height: 90vh;
  max-height: 900px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f5f5f5;
}

.modal-body {
  padding: 20px 24px;
}

.import-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.import-option {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.import-option:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.option-icon {
  margin-bottom: 12px;
}

.option-content h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.option-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #1976d2;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
}

.cancel-btn {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e9ecef;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .knowledge-base {
    padding: 16px;
  }
  
  .kb-nav {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .import-options {
    grid-template-columns: 1fr;
  }
}
</style>
