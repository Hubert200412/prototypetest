<template>
  <section class="main-section">
    <div class="main-content">
      <!-- 左侧：项目案例展示 -->
      <div class="left-panel">
        <!-- 案例分类导航 -->
        <div class="case-categories">
          <h2 class="section-title">项目案例展示</h2>
          <div class="category-tabs">
            <button 
              v-for="(category, index) in categories" 
              :key="index"
              class="category-tab"
              :class="{ active: activeCategory === index }"
              @click="selectCategory(index)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- 案例展示区域 -->
        <div class="cases-container">
          <div class="cases-grid">
            <div 
              v-for="(project, index) in currentProjects" 
              :key="index"
              class="case-card"
              @click="showProjectDetail(project)"
            >
              <div class="case-header">
                <h3>{{ project.name }}</h3>
              </div>
              <div class="case-content">
                <p>{{ project.usage }}</p>
              </div>
              <div class="case-footer">
                <span class="view-detail">查看详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：企业知识库 -->
      <div class="right-panel">
        <KnowledgeBase @show-knowledge-detail="showKnowledgeDetail" />
      </div>
    </div>

    <!-- 项目详情弹窗 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedProject.name }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="detail-section">
            <h4>大致用途</h4>
            <p>{{ selectedProject.usage }}</p>
          </div>
          <div class="detail-section">
            <h4>需求背景</h4>
            <p>{{ selectedProject.background }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="primary-btn" @click="closeModal">开始构建</button>
          <button class="secondary-btn" @click="closeModal">关闭</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import KnowledgeBase from './KnowledgeBase.vue'

export default {
  name: 'MainSection',
  components: {
    KnowledgeBase
  },
  emits: ['show-knowledge-detail'],
  setup(props, { emit }) {
    const activeCategory = ref(0)
    const showModal = ref(false)
    const selectedProject = ref({})
    
    const showKnowledgeDetail = (knowledgeItem) => {
      emit('show-knowledge-detail', knowledgeItem)
    }
    
    const categories = ref([
      {
        name: '市场调研',
        projects: [
          {
            name: '行业风险监测平台',
            usage: '自动收集全球舆情数据（金融、通信行业），通过聚类分析识别高风险国家/企业，生成可视化报告（如地图热力图和风险排名），支持实时预警。',
            background: '我是一名国际信贷风险经理，在管理跨国贷款项目时遇到手动跟踪舆情效率低、易遗漏关键风险信号的问题，因此决定用智造工厂的NL2流程自动化和大数据洞察的原子能力，快速构建自动化监测工具。'
          },
          {
            name: '客户分群洞察工具',
            usage: '基于用户行为数据（交易、浏览记录等），通过联邦学习和隐私计算技术，自动分群客户并生成画像报告，辅助营销策略制定。',
            background: '我是一名金融产品运营专员，在推广新服务时遇到客户群体定位不准、数据孤岛导致洞察不全面的问题，因此决定用智造工厂的隐私计算原子能力集和决策引擎，低成本生成分群工具。'
          }
        ]
      },
      {
        name: '产品原型构思',
        projects: [
          {
            name: '智能营销策略生成器',
            usage: '根据自然语言描述，如"针对年轻用户推优惠券"，自动生成营销方案原型，包括策略文档、UI草图和A/B测试计划。',
            background: '我是一名市场营销经理，在策划活动时缺乏创新灵感且原型设计耗时，因此决定用智造工厂的NL2新产品能力和决策引擎原子能力，构思并验证多种策略原型。'
          },
          {
            name: '风险管控仪表盘原型',
            usage: '输入需求，如"实时监控贷款欺诈"，生成可视化仪表盘原型，集成决策引擎规则和模型输出，支持动态调整。',
            background: '我是一名风控分析师，在处理信贷审核时遇到原型开发周期长、规则配置不灵活的问题，因此决定用智造工厂的决策引擎原子能力集四和任务推理功能，快速构思交互式原型。'
          }
        ]
      },
      {
        name: '小程序生成',
        projects: [
          {
            name: '客服工作台小程序',
            usage: '生成小程序，实现任务分配、话术管理和黑名单功能，提升客服响应效率。',
            background: '我是一名客服主管，在管理团队时遇到人工分配任务慢、话术更新不及时的问题，因此决定用智造工厂的MCP集成和NL2新产品能力，一键生成并部署小程序。'
          },
          {
            name: '商户审核助手小程序',
            usage: '通过OCR和决策引擎原子能力，自动审核商户资质，生成审核报告并集成到移动端。',
            background: '我是一名商户运营专员，在处理入网审核时遇到手动验证效率低、错误率高的问题，因此决定用智造工厂的原子能力集和决策引擎，快速开发安全合规的小程序。'
          }
        ]
      },
      {
        name: '全栈产品开发',
        projects: [
          {
            name: '智能CRM系统',
            usage: '开发全栈系统，整合客户画像、行为分析和营销自动化，支持Web端和移动端。',
            background: '我是一名销售总监，在管理客户关系时遇到数据分散、系统定制开发成本高的问题，因此决定用智造工厂的大数据洞察原子能力集和全栈组装功能，零代码生成统一CRM平台。'
          },
          {
            name: '金融风控平台',
            usage: '构建完整平台，集成决策引擎、联邦学习模型和实时监控，用于信贷风险评估和预警。',
            background: '我是一名金融科技工程师，在开发风控系统时遇到模型部署复杂、多源数据整合难的问题，因此决定用智造工厂的原子能力集和MCP封装，自动化生成可扩展的全栈产品。'
          }
        ]
      }
    ])

    const currentProjects = computed(() => {
      return categories.value[activeCategory.value].projects
    })

    const selectCategory = (index) => {
      activeCategory.value = index
    }

    const showProjectDetail = (project) => {
      selectedProject.value = project
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      selectedProject.value = {}
    }

    return {
      activeCategory,
      showModal,
      selectedProject,
      categories,
      currentProjects,
      selectCategory,
      showProjectDetail,
      closeModal,
      showKnowledgeDetail
    }
  }
}
</script>

<style scoped>
.main-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(10px);
}

.main-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.left-panel {
  flex: 2;
  min-width: 0;
}

.right-panel {
  flex: 1;
  min-width: 400px;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.category-tab {
  padding: 12px 24px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  background: white;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  border-color: #1976d2;
  color: #1976d2;
}

.category-tab.active {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.cases-container {
  margin-top: 40px;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.case-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #1976d2;
}

.case-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.case-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.case-footer {
  display: flex;
  justify-content: flex-end;
}

.view-detail {
  color: #1976d2;
  font-weight: 500;
  font-size: 14px;
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
  border-radius: 16px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
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
  padding: 24px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h4 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.detail-section p {
  color: #666;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #e9ecef;
}

.primary-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background: #1565c0;
}

.secondary-btn {
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: #e9ecef;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .right-panel {
    min-width: auto;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main-section {
    padding: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .category-tabs {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .category-tab {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .cases-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .right-panel {
    padding: 15px;
  }
}
</style>
