<template>
  <div class="home">
    <HeroSection />
    <MainSection @show-knowledge-detail="showKnowledgeDetail" />
    
    <!-- 知识详情模态框 -->
    <div v-if="showDetailModal" class="modal-overlay detail-modal fullscreen" @click="closeDetailModal">
      <div class="modal-content large fullscreen-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedKnowledge.title }}</h3>
          <div class="header-actions">
            <button class="action-btn small" @click="generateAIAdvice">
              <img src="/icons/知识库-AI建议.svg" alt="AI优化建议" class="action-icon" />
              AI优化建议
            </button>
            <button class="close-btn" @click="closeDetailModal">×</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="detail-content">
            <div class="content-preview">
              <div v-if="selectedKnowledge.type === '文档'" class="document-preview">
                <div class="doc-content">{{ selectedKnowledge.content }}</div>
              </div>
              <div v-else-if="selectedKnowledge.type === '视频'" class="video-preview">
                <video controls class="video-player">
                  <source :src="selectedKnowledge.videoUrl" type="video/mp4">
                  您的浏览器不支持视频播放
                </video>
              </div>
              <div v-else-if="selectedKnowledge.type === '流程图'" class="flowchart-preview">
                <div class="flowchart-container">
                  <img :src="selectedKnowledge.imageUrl" alt="流程图" class="flowchart-image" />
                </div>
              </div>
            </div>
            <div class="content-sidebar">
              <div class="info-section">
                <h4>基本信息</h4>
                <div class="info-item">
                  <span class="info-label">类型:</span>
                  <span class="info-value">{{ selectedKnowledge.type }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">来源:</span>
                  <span class="info-value">{{ selectedKnowledge.source }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">创建时间:</span>
                  <span class="info-value">{{ selectedKnowledge.createTime }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">收藏数:</span>
                  <span class="info-value">{{ selectedKnowledge.favoriteCount }}</span>
                </div>
              </div>
              <div class="summary-section">
                <h4>AI总结</h4>
                <p class="ai-summary">{{ selectedKnowledge.aiSummary }}</p>
              </div>
              <div class="solutions-section">
                <h4>关联解决方案</h4>
                <div class="solution-list">
                  <div 
                    v-for="solution in selectedKnowledge.solutions" 
                    :key="solution.id"
                    class="solution-item"
                    @click="jumpToSolution(solution)"
                  >
                    <span class="solution-title">{{ solution.title }}</span>
                    <span class="solution-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="aiAdvice" class="ai-advice-section">
            <h4>
              <img src="/icons/知识库-AI建议.svg" alt="AI建议" class="ai-icon" />
              AI优化建议
            </h4>
            <div class="advice-content">{{ aiAdvice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import MainSection from '../components/MainSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    MainSection
  },
  setup() {
    const showDetailModal = ref(false)
    const selectedKnowledge = ref({})
    const aiAdvice = ref('')
    
    const showKnowledgeDetail = (knowledgeItem) => {
      selectedKnowledge.value = knowledgeItem
      showDetailModal.value = true
      aiAdvice.value = ''
    }
    
    const closeDetailModal = () => {
      showDetailModal.value = false
      selectedKnowledge.value = {}
      aiAdvice.value = ''
    }
    
    const generateAIAdvice = async () => {
      // 模拟调用MCP接口生成优化建议
      aiAdvice.value = '正在生成AI优化建议...'
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const advices = [
        '建议优化文档结构，增加更多实际案例和代码示例，提高可读性和实用性。',
        '可以添加相关的技术架构图和流程说明，帮助读者更好地理解实现细节。',
        '建议补充常见问题解答章节，并提供相关的最佳实践建议。'
      ]
      
      aiAdvice.value = advices[Math.floor(Math.random() * advices.length)]
    }
    
    const jumpToSolution = (solution) => {
      console.log('跳转到解决方案:', solution.title)
      // 这里可以实现跳转到解决方案的逻辑
    }
    
    return {
      showDetailModal,
      selectedKnowledge,
      aiAdvice,
      showKnowledgeDetail,
      closeDetailModal,
      generateAIAdvice,
      jumpToSolution
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.action-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
}

.action-btn:hover {
  background: #1565c0;
}

.action-btn.small {
  padding: 6px 12px;
  font-size: 12px;
}

.action-icon {
  width: 12px;
  height: 12px;
  object-fit: contain;
  margin-right: 4px;
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

/* 详情模态框样式 */
.detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

.content-preview {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.document-preview {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.doc-content {
  line-height: 1.6;
  color: #333;
}

.video-preview {
  padding: 20px;
  text-align: center;
}

.video-player {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.flowchart-preview {
  padding: 20px;
  text-align: center;
}

.flowchart-image {
  max-width: 100%;
  height: auto;
}

.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-section,
.summary-section,
.solutions-section {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
}

.info-section h4,
.summary-section h4,
.solutions-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-label {
  color: #666;
}

.info-value {
  color: #333;
  font-weight: 500;
}

.ai-summary {
  color: #666;
  line-height: 1.5;
  font-size: 14px;
  margin: 0;
}

.solution-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.solution-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.solution-item:hover {
  background: #e3f2fd;
}

.solution-title {
  font-size: 14px;
  color: #333;
}

.solution-arrow {
  color: #1976d2;
  font-weight: 600;
}

.ai-advice-section {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
}

.ai-advice-section h4 {
  margin: 0 0 12px 0;
  color: #333;
}

.ai-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  margin-right: 6px;
}

.advice-content {
  background: #f0f8f4;
  border: 1px solid #4caf50;
  border-radius: 8px;
  padding: 16px;
  color: #2e7d32;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
  
  .modal-content.large {
    max-width: 95%;
  }
  
  .modal-content.fullscreen-modal {
    width: 95vw;
    height: 95vh;
  }
}
</style>
