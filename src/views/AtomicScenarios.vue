<template>
  <div class="atomic-scenarios">
    <v-container>
      <!-- 页面标题 -->
      <v-row class="page-header">
        <v-col cols="12">
          <h1 class="page-title">
            <v-icon left size="large" color="primary">mdi-application-cog</v-icon>
            原子化能力应用场景
          </h1>
          <p class="page-subtitle">
            金融、风控、审核、模型智能决策等多场景覆盖，全方位赋能业务发展
          </p>
        </v-col>
      </v-row>

      <!-- 场景总览 -->
      <v-row class="scenarios-overview">
        <v-col cols="12">
          <v-card elevation="3" class="overview-card">
            <v-card-title class="text-center primary white--text">
              <v-icon left>mdi-sitemap</v-icon>
              决策引擎 - 多场景智能决策平台
            </v-card-title>
            <v-card-text class="overview-content">
              <div class="decision-engine">
                <div class="center-circle">
                  <v-icon size="48" color="white">mdi-cogs</v-icon>
                  <div class="center-text">决策引擎</div>
                  <div class="center-subtitle">数据整合与分析</div>
                  <div class="center-subtitle">风险控制与智能预警</div>
                </div>
                
                <div class="scenario-circles">
                  <div class="scenario-circle" v-for="scenario in mainScenarios" :key="scenario.id">
                    <div class="circle-content" :class="scenario.color">
                      <v-icon color="white" size="32">{{ scenario.icon }}</v-icon>
                      <div class="circle-title">{{ scenario.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 详细场景介绍 -->
      <v-row class="detailed-scenarios">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="success">mdi-view-grid</v-icon>
            应用场景详情
          </h2>
        </v-col>
        <v-col cols="12" md="6" v-for="scenario in detailedScenarios" :key="scenario.id">
          <v-card class="scenario-detail-card" elevation="3">
            <v-card-title class="scenario-header" :class="scenario.color">
              <v-icon left color="white" size="large">{{ scenario.icon }}</v-icon>
              <span class="white--text">{{ scenario.title }}</span>
            </v-card-title>
            <v-card-text class="scenario-content">
              <p class="scenario-description">{{ scenario.description }}</p>
              
              <div class="features-section">
                <h4 class="features-title">核心功能</h4>
                <div class="features-list">
                  <div class="feature-item" v-for="feature in scenario.features" :key="feature">
                    <v-icon left :color="scenario.iconColor" size="small">mdi-check-circle</v-icon>
                    {{ feature }}
                  </div>
                </div>
              </div>

              <div class="benefits-section">
                <h4 class="benefits-title">应用价值</h4>
                <div class="benefits-list">
                  <v-chip
                    v-for="benefit in scenario.benefits"
                    :key="benefit"
                    :color="scenario.chipColor"
                    variant="outlined"
                    class="benefit-chip"
                  >
                    {{ benefit }}
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 技术架构 -->
      <v-row class="tech-stack">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="warning">mdi-layers</v-icon>
            技术架构体系
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="tech-card">
            <v-card-text class="tech-content">
              <div class="tech-layers">
                <div class="tech-layer" v-for="layer in techLayers" :key="layer.name">
                  <div class="layer-header" :class="layer.color">
                    <v-icon left color="white">{{ layer.icon }}</v-icon>
                    <span class="white--text layer-name">{{ layer.name }}</span>
                  </div>
                  <div class="layer-components">
                    <div class="component-grid">
                      <v-card
                        v-for="component in layer.components"
                        :key="component.name"
                        class="component-card"
                        elevation="1"
                      >
                        <v-card-text class="component-content">
                          <v-icon :color="component.color" size="large">{{ component.icon }}</v-icon>
                          <div class="component-name">{{ component.name }}</div>
                          <div class="component-desc">{{ component.description }}</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 实施案例 -->
      <v-row class="case-studies">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="error">mdi-briefcase</v-icon>
            实施案例
          </h2>
        </v-col>
        <v-col cols="12" md="4" v-for="case_study in caseStudies" :key="case_study.id">
          <v-card class="case-card" elevation="3">
            <v-img
              :src="case_study.image"
              height="200"
              class="case-image"
              cover
            >
              <div class="case-overlay">
                <v-icon color="white" size="48">{{ case_study.icon }}</v-icon>
              </div>
            </v-img>
            <v-card-title class="case-title">{{ case_study.title }}</v-card-title>
            <v-card-text class="case-content">
              <p class="case-description">{{ case_study.description }}</p>
              <div class="case-results">
                <h5 class="results-title">实施效果</h5>
                <ul class="results-list">
                  <li v-for="result in case_study.results" :key="result">{{ result }}</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 合作流程 -->
      <v-row class="cooperation-process">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="info">mdi-timeline</v-icon>
            合作流程
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="process-card">
            <v-card-text class="process-content">
              <div class="process-timeline">
                <div class="process-step" v-for="(step, index) in cooperationSteps" :key="step.id">
                  <div class="step-number" :class="step.color">{{ index + 1 }}</div>
                  <div class="step-content">
                    <h4 class="step-title">{{ step.title }}</h4>
                    <p class="step-description">{{ step.description }}</p>
                    <div class="step-duration">预估时间：{{ step.duration }}</div>
                  </div>
                  <v-icon v-if="index < cooperationSteps.length - 1" class="step-arrow" color="primary">
                    mdi-arrow-right
                  </v-icon>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AtomicScenarios',
  setup() {
    const mainScenarios = ref([
      { id: 1, title: '渠道管理', icon: 'mdi-store', color: 'orange' },
      { id: 2, title: '风控管理', icon: 'mdi-shield-check', color: 'red' },
      { id: 3, title: '商户审核', icon: 'mdi-account-check', color: 'blue' },
      { id: 4, title: '模型产品', icon: 'mdi-brain', color: 'green' }
    ])

    const detailedScenarios = ref([
      {
        id: 1,
        title: '金融分期渠道全流程管控',
        icon: 'mdi-bank',
        color: 'orange',
        iconColor: 'orange',
        chipColor: 'orange',
        description: '使用决策引擎的规则库及决策流功能，基于用户、营业员、渠道的特征变量，可灵活方便地可视化配置风险策略，并准确输出风控结果。',
        features: [
          '花呗先享',
          '联通口碑',
          '聚合风控',
          '重点风险',
          '校验分期'
        ],
        benefits: ['风险控制', '流程优化', '效率提升', '成本降低']
      },
      {
        id: 2,
        title: '信贷全流程风控管理',
        icon: 'mdi-credit-card',
        color: 'red',
        iconColor: 'red',
        chipColor: 'red',
        description: '预防个人信贷风险，提升资方路由效率，对贷前或贷后环节的客户进行风作识别与风险分类，并根据不同风作风险等级制定相应策略，从而有效地控制欺诈风险，实现数据量化、智能科学的欺作风险管理。',
        features: [
          '决策线',
          '资方路由',
          '资方前置',
          '智能化审核',
          '经营数据',
          '评级数据'
        ],
        benefits: ['风险预防', '智能审核', '效率提升', '数据驱动']
      },
      {
        id: 3,
        title: '商户智能化审核',
        icon: 'mdi-store-check',
        color: 'blue',
        iconColor: 'blue',
        chipColor: 'blue',
        description: '决策引擎通过整合工商信息、法人身份验证等数据，结合商户历史经营数据，通过评分模型量化商户风险等级，实时校验商户营业执照、经营场所真实性等基础资质，营传统人工审核流程，提升开户效率。',
        features: [
          '工商信息',
          '法人信息',
          '智能化审核',
          '商户申核',
          '经营数据',
          '评级数据'
        ],
        benefits: ['自动化审核', '风险识别', '效率提升', '人工替代']
      },
      {
        id: 4,
        title: '模型全生命周期管理',
        icon: 'mdi-brain',
        color: 'green',
        iconColor: 'green',
        chipColor: 'green',
        description: '构建全面的模型全生命周期管理能力，可以提高模型训练和部署的效率，并通过对模型性能的持续监控，确保模型的准确性和可靠性。',
        features: [
          '联通用户画像',
          '支付金融数据',
          '模型能力',
          '模型输出',
          '场景化画像',
          '外部数据'
        ],
        benefits: ['模型优化', '性能监控', '生命周期管理', '数据融合']
      }
    ])

    const techLayers = ref([
      {
        name: '应用层',
        icon: 'mdi-application',
        color: 'primary',
        components: [
          { name: '金融服务', icon: 'mdi-bank', color: 'primary', description: '分期、信贷、支付' },
          { name: '风控管理', icon: 'mdi-shield', color: 'success', description: '风险识别与控制' },
          { name: '审核系统', icon: 'mdi-check-circle', color: 'warning', description: '智能审核流程' },
          { name: '决策引擎', icon: 'mdi-brain', color: 'error', description: '智能决策支持' }
        ]
      },
      {
        name: '平台层',
        icon: 'mdi-layers',
        color: 'success',
        components: [
          { name: '数据整合', icon: 'mdi-database-sync', color: 'primary', description: '多源数据融合' },
          { name: '实时处理', icon: 'mdi-lightning-bolt', color: 'success', description: '实时数据处理' },
          { name: '模型服务', icon: 'mdi-chart-line', color: 'warning', description: 'AI模型服务' },
          { name: '规则引擎', icon: 'mdi-cogs', color: 'error', description: '业务规则管理' }
        ]
      },
      {
        name: '数据层',
        icon: 'mdi-database',
        color: 'warning',
        components: [
          { name: '内部数据', icon: 'mdi-server', color: 'primary', description: '企业内部数据' },
          { name: '外部数据', icon: 'mdi-cloud', color: 'success', description: '第三方数据源' },
          { name: '实时数据', icon: 'mdi-pulse', color: 'warning', description: '实时数据流' },
          { name: '历史数据', icon: 'mdi-archive', color: 'error', description: '历史数据存储' }
        ]
      }
    ])

    const caseStudies = ref([
      {
        id: 1,
        title: '某大型银行风控系统',
        icon: 'mdi-bank',
        image: '/api/placeholder/400/200',
        description: '为某大型银行构建全流程风控决策系统，实现贷前、贷中、贷后全链路风险管控。',
        results: [
          '风险识别准确率提升40%',
          '审批效率提高60%',
          '不良贷款率降低25%',
          '运营成本节省30%'
        ]
      },
      {
        id: 2,
        title: '互联网金融平台',
        icon: 'mdi-cellphone',
        image: '/api/placeholder/400/200',
        description: '为互联网金融平台提供智能风控和用户画像服务，优化用户体验。',
        results: [
          '用户转化率提升35%',
          '风险损失降低50%',
          '审核时间缩短80%',
          '客户满意度提升45%'
        ]
      },
      {
        id: 3,
        title: '电商支付风控',
        icon: 'mdi-shopping',
        image: '/api/placeholder/400/200',
        description: '为大型电商平台构建支付风控体系，保障交易安全和用户资金安全。',
        results: [
          '欺诈交易拦截率99.5%',
          '误杀率控制在0.1%以下',
          '处理速度提升10倍',
          '年度损失降低70%'
        ]
      }
    ])

    const cooperationSteps = ref([
      {
        id: 1,
        title: '需求调研',
        description: '深入了解客户业务需求，分析现有系统架构和数据情况',
        duration: '1-2周',
        color: 'primary'
      },
      {
        id: 2,
        title: '方案设计',
        description: '基于需求分析，设计定制化的技术方案和实施计划',
        duration: '2-3周',
        color: 'success'
      },
      {
        id: 3,
        title: '系统开发',
        description: '按照设计方案进行系统开发、测试和优化',
        duration: '4-8周',
        color: 'warning'
      },
      {
        id: 4,
        title: '部署上线',
        description: '系统部署、数据迁移、性能调优和上线运行',
        duration: '1-2周',
        color: 'error'
      },
      {
        id: 5,
        title: '运维支持',
        description: '提供持续的技术支持、系统维护和功能优化',
        duration: '长期',
        color: 'info'
      }
    ])

    return {
      mainScenarios,
      detailedScenarios,
      techLayers,
      caseStudies,
      cooperationSteps
    }
  }
}
</script>

<style scoped>
.atomic-scenarios {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px 0;
}

.page-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.scenarios-overview {
  margin-bottom: 40px;
}

.overview-content {
  padding: 40px;
}

.decision-engine {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.center-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  z-index: 2;
}

.center-text {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 8px;
}

.center-subtitle {
  font-size: 0.8rem;
  margin-top: 4px;
  opacity: 0.9;
}

.scenario-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scenario-circle {
  position: absolute;
  width: 120px;
  height: 120px;
}

.scenario-circle:nth-child(1) { top: 50px; left: 50%; transform: translateX(-50%); }
.scenario-circle:nth-child(2) { right: 50px; top: 50%; transform: translateY(-50%); }
.scenario-circle:nth-child(3) { bottom: 50px; left: 50%; transform: translateX(-50%); }
.scenario-circle:nth-child(4) { left: 50px; top: 50%; transform: translateY(-50%); }

.circle-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.circle-content.orange { background: linear-gradient(135deg, #ff9800, #ff5722); }
.circle-content.red { background: linear-gradient(135deg, #f44336, #e91e63); }
.circle-content.blue { background: linear-gradient(135deg, #2196f3, #3f51b5); }
.circle-content.green { background: linear-gradient(135deg, #4caf50, #8bc34a); }

.circle-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
}

.detailed-scenarios {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.scenario-detail-card {
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.scenario-detail-card:hover {
  transform: translateY(-5px);
}

.scenario-header {
  text-align: center;
  padding: 16px;
}

.scenario-content {
  padding: 24px;
}

.scenario-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
  text-align: justify;
}

.features-section, .benefits-section {
  margin-bottom: 20px;
}

.features-title, .benefits-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
}

.benefits-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.benefit-chip {
  margin: 2px;
}

.tech-stack {
  margin-bottom: 40px;
}

.tech-content {
  padding: 30px;
}

.tech-layers {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tech-layer {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.layer-header {
  padding: 16px;
  text-align: center;
}

.layer-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.layer-components {
  padding: 24px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.component-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.component-card:hover {
  transform: translateY(-3px);
}

.component-content {
  padding: 16px;
}

.component-name {
  font-weight: bold;
  color: #333;
  margin: 8px 0 4px;
}

.component-desc {
  font-size: 0.9rem;
  color: #666;
}

.case-studies {
  margin-bottom: 40px;
}

.case-card {
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
}

.case-image {
  position: relative;
}

.case-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.case-content {
  padding: 20px;
}

.case-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.results-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.results-list {
  list-style: none;
  padding: 0;
}

.results-list li {
  padding: 4px 0;
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;
  color: #555;
}

.results-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.cooperation-process {
  margin-bottom: 40px;
}

.process-content {
  padding: 30px;
}

.process-timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.process-step {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  min-width: 150px;
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.step-number.primary { background-color: #1976d2; }
.step-number.success { background-color: #4caf50; }
.step-number.warning { background-color: #ff9800; }
.step-number.error { background-color: #f44336; }
.step-number.info { background-color: #2196f3; }

.step-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.step-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
}

.step-duration {
  font-size: 0.8rem;
  color: #999;
  font-style: italic;
}

.step-arrow {
  font-size: 1.5rem;
  margin: 0 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .decision-engine {
    min-height: 300px;
  }
  
  .center-circle {
    width: 150px;
    height: 150px;
  }
  
  .scenario-circle {
    width: 80px;
    height: 80px;
  }
  
  .circle-title {
    font-size: 0.8rem;
  }
  
  .process-timeline {
    flex-direction: column;
  }
  
  .step-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }
  
  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
