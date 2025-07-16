<template>
  <div class="atomic-data-insights">
    <v-container>
      <!-- 页面标题 -->
      <v-row class="page-header">
        <v-col cols="12">
          <h1 class="page-title">
            <v-icon left size="large" color="primary">mdi-chart-line</v-icon>
            大数据洞察平台
          </h1>
          <p class="page-subtitle">
            融合客户全域数据实现圈群-洞察-触达-效果分析闭环，助力数字中国建设
          </p>
        </v-col>
      </v-row>

      <!-- 能力介绍 -->
      <v-row class="capability-intro">
        <v-col cols="12">
          <v-card elevation="3" class="intro-card">
            <v-card-title class="text-center primary white--text">
              <v-icon left>mdi-lightbulb</v-icon>
              能力介绍
            </v-card-title>
            <v-card-text class="intro-content">
              <p>
                创新大数据、人工智能、隐私计算等技术融合应用，深度挖掘通信、支付
                金融、外部三方（合并网）数据数据要素融合价值，打造"场景-客户-数
                据-产品服务连接器"，构建特色化客户分类、分群、分层、分级服务，形
                成差异化产品服务精准匹配能力，赋能客户价值经营与智慧运营，助力数
                字中国建设
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 应用场景 -->
      <v-row class="scenarios-section">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="primary">mdi-target</v-icon>
            应用场景
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="scenarios-card">
            <v-card-text class="scenarios-content">
              <p class="scenarios-desc">
                面向通信、金融、乡村、双碳、政务等行业机构，提供政务政通本网+异网客
                户调查一站式服务，包含支付金融与通信金融商品模型标签（特征/规则/模
                型）、客户分层分级可视化操作平台，差异化产品服务匹配策略与自动化触
                达策略、异网客户数据策略，有效赋能行业机构开展客户拉新、线索实现、
                促活、老化、续费、信贷、借款、金融等多个场景
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 大数据洞察平台流程图 -->
      <v-row class="platform-flow">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="success">mdi-sitemap</v-icon>
            大数据洞察平台
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="flow-card">
            <v-card-text class="flow-content">
              <!-- 流程步骤 -->
              <div class="flow-steps">
                <div class="flow-step" v-for="(step, index) in flowSteps" :key="index">
                  <div class="step-circle" :class="step.color">
                    <v-icon color="white">{{ step.icon }}</v-icon>
                  </div>
                  <div class="step-content">
                    <h4 class="step-title">{{ step.title }}</h4>
                    <p class="step-desc">{{ step.description }}</p>
                  </div>
                  <v-icon v-if="index < flowSteps.length - 1" class="flow-arrow" color="primary">
                    mdi-arrow-right
                  </v-icon>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 产品优势 -->
      <v-row class="advantages-section">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="success">mdi-trophy</v-icon>
            产品优势
          </h2>
        </v-col>
        <v-col cols="12" md="4" v-for="advantage in advantages" :key="advantage.id">
          <v-card class="advantage-card" elevation="2">
            <v-card-title class="advantage-header" :class="advantage.color">
              <v-icon left color="white">{{ advantage.icon }}</v-icon>
              <span class="white--text">{{ advantage.title }}</span>
            </v-card-title>
            <v-card-text class="advantage-content">
              <ul class="advantage-list">
                <li v-for="item in advantage.items" :key="item">{{ item }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 运营服务 -->
      <v-row class="services-section">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="error">mdi-cogs</v-icon>
            运营服务
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="services-card">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="service-group">
                    <h4 class="service-group-title">
                      <v-icon left color="primary">mdi-file-document</v-icon>
                      服务清单
                    </h4>
                    <ul class="service-list">
                      <li>支付金融特色分层分级标签集</li>
                      <li>反欺诈、营销、风险等客群辅助筛查</li>
                      <li>客户经营策略、权益服务</li>
                      <li>客户分类分层分级可视化操作平台</li>
                      <li>联合建模、运营</li>
                    </ul>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="service-stats">
                    <h4 class="service-group-title">
                      <v-icon left color="success">mdi-chart-bar</v-icon>
                      服务数据
                    </h4>
                    <div class="stats-grid">
                      <div class="stat-item">
                        <div class="stat-value primary--text">700+</div>
                        <div class="stat-label">支付金融特色标签</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-value success--text">3亿+</div>
                        <div class="stat-label">覆盖联通本网客户</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-value warning--text">4300万</div>
                        <div class="stat-label">异网约客户</div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
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
  name: 'AtomicDataInsights',
  setup() {
    const flowSteps = ref([
      {
        title: '洞察客户',
        description: '客户画像洞察',
        icon: 'mdi-account-search',
        color: 'primary'
      },
      {
        title: '甄别场景',
        description: '场景需求识别',
        icon: 'mdi-target',
        color: 'success'
      },
      {
        title: '管控渠道',
        description: '渠道管理控制',
        icon: 'mdi-account-supervisor',
        color: 'warning'
      },
      {
        title: '赋能商户',
        description: '商户能力赋能',
        icon: 'mdi-store',
        color: 'error'
      },
      {
        title: '挖掘异网',
        description: '异网客户挖掘',
        icon: 'mdi-network',
        color: 'info'
      }
    ])

    const advantages = ref([
      {
        id: 1,
        title: '客户调查"更精准"',
        icon: 'mdi-target-account',
        color: 'primary',
        items: [
          '挖掘支付金融特色标签700+，上架特色模型18类',
          '覆盖联通本网3亿+，异网约4300万客户，沉淀客户分层分级客群分层分群群分级服务',
          '打造立体式客户调查全局，精细化分类分群分层分级服务'
        ]
      },
      {
        id: 2,
        title: '客户服务"更智能"',
        icon: 'mdi-brain',
        color: 'success',
        items: [
          '拖拽式客群圈选，一键生成，即刻触达',
          '多客群并行测试，效果实时回收，最优客群锁定，沉淀有效经验群群40+',
          '运营策略智能推荐，差异化产品服务精准匹配'
        ]
      },
      {
        id: 3,
        title: '客户保护"更安全"',
        icon: 'mdi-shield-check',
        color: 'error',
        items: [
          '隐蔽查询，安全多方计算等技术，有效防止客户数据泄失',
          '创新多种联邦算法模型，实现多方客户数据可用，不可见'
        ]
      }
    ])

    return {
      flowSteps,
      advantages
    }
  }
}
</script>

<style scoped>
.atomic-data-insights {
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

.capability-intro {
  margin-bottom: 40px;
}

.intro-card {
  border-radius: 12px;
}

.intro-content {
  padding: 24px;
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
}

.scenarios-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.scenarios-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

.platform-flow {
  margin-bottom: 40px;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.flow-step {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  min-width: 150px;
}

.step-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.step-circle.primary { background-color: #1976d2; }
.step-circle.success { background-color: #4caf50; }
.step-circle.warning { background-color: #ff9800; }
.step-circle.error { background-color: #f44336; }
.step-circle.info { background-color: #2196f3; }

.step-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.step-desc {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.flow-arrow {
  font-size: 1.5rem;
  margin: 0 10px;
}

.advantages-section {
  margin-bottom: 40px;
}

.advantage-card {
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
}

.advantage-header {
  text-align: center;
  padding: 16px;
}

.advantage-header.primary { background-color: #1976d2; }
.advantage-header.success { background-color: #4caf50; }
.advantage-header.error { background-color: #f44336; }

.advantage-content {
  padding: 20px;
}

.advantage-list {
  list-style: none;
  padding: 0;
}

.advantage-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 20px;
}

.advantage-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.services-section {
  margin-bottom: 40px;
}

.service-group-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.service-list {
  list-style: none;
  padding: 0;
}

.service-list li {
  padding: 8px 0;
  position: relative;
  padding-left: 20px;
}

.service-list li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1976d2;
  font-weight: bold;
}

.service-stats {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .flow-steps {
    flex-direction: column;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
