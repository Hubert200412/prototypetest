<template>
  <div class="atomic-ai-models">
    <v-container>
      <!-- 页面标题 -->
      <v-row class="page-header">
        <v-col cols="12">
          <h1 class="page-title">
            <v-icon left size="large" color="primary">mdi-brain</v-icon>
            AI数据模型体系
          </h1>
          <p class="page-subtitle">
            涵盖模型产品、模型应用和模型能力三个部分，累计模型研发79个，集团算法模型平台建立模型研发项目36个
          </p>
        </v-col>
      </v-row>

      <!-- 核心能力卡片 -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="capability-card" elevation="3">
            <v-card-title class="card-header primary white--text">
              <v-icon left>mdi-package</v-icon>
              模型产品
            </v-card-title>
            <v-card-text class="card-content">
              <div class="capability-list">
                <div class="capability-item">
                  <v-icon left color="primary" size="small">mdi-chart-line</v-icon>
                  高价值户识别
                </div>
                <div class="capability-item">
                  <v-icon left color="primary" size="small">mdi-target</v-icon>
                  保险精准推荐
                </div>
                <div class="capability-item">
                  <v-icon left color="primary" size="small">mdi-account-search</v-icon>
                  用户细分识别
                </div>
                <div class="capability-item">
                  <v-icon left color="primary" size="small">mdi-star</v-icon>
                  专门户复购预测
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="capability-card" elevation="3">
            <v-card-title class="card-header success white--text">
              <v-icon left>mdi-application</v-icon>
              模型应用
            </v-card-title>
            <v-card-text class="card-content">
              <div class="capability-list">
                <div class="capability-item">
                  <v-icon left color="success" size="small">mdi-shield-check</v-icon>
                  风险防控
                </div>
                <div class="capability-item">
                  <v-icon left color="success" size="small">mdi-thumb-up</v-icon>
                  智能推荐
                </div>
                <div class="capability-item">
                  <v-icon left color="success" size="small">mdi-account-group</v-icon>
                  客户分层分级可视化操作平台
                </div>
                <div class="capability-item">
                  <v-icon left color="success" size="small">mdi-chart-pie</v-icon>
                  高效双活满足用户识别
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="capability-card" elevation="3">
            <v-card-title class="card-header warning white--text">
              <v-icon left>mdi-brain</v-icon>
              模型能力
            </v-card-title>
            <v-card-text class="card-content">
              <div class="capability-list">
                <div class="capability-item">
                  <v-icon left color="warning" size="small">mdi-text-recognition</v-icon>
                  自然语言处理
                </div>
                <div class="capability-item">
                  <v-icon left color="warning" size="small">mdi-image-search</v-icon>
                  图像处理
                </div>
                <div class="capability-item">
                  <v-icon left color="warning" size="small">mdi-database</v-icon>
                  OCR识别
                </div>
                <div class="capability-item">
                  <v-icon left color="warning" size="small">mdi-voice</v-icon>
                  大语言模型等能力
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 统计数据 -->
      <v-row class="stats-section">
        <v-col cols="12">
          <v-card elevation="2" class="stats-card">
            <v-card-title class="text-center">
              <v-icon left size="large" color="primary">mdi-chart-bar</v-icon>
              平台数据统计
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="3" class="text-center">
                  <div class="stat-number primary--text">79+</div>
                  <div class="stat-label">累计模型研发</div>
                </v-col>
                <v-col cols="6" md="3" class="text-center">
                  <div class="stat-number success--text">36</div>
                  <div class="stat-label">模型研发项目</div>
                </v-col>
                <v-col cols="6" md="3" class="text-center">
                  <div class="stat-number warning--text">6189</div>
                  <div class="stat-label">数据源原子</div>
                </v-col>
                <v-col cols="6" md="3" class="text-center">
                  <div class="stat-number error--text">3975</div>
                  <div class="stat-label">代码原子</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 应用场景 -->
      <v-row class="scenarios-section">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="primary">mdi-lightbulb</v-icon>
            应用场景
          </h2>
        </v-col>
        <v-col cols="12" md="6" lg="3" v-for="scenario in scenarios" :key="scenario.id">
          <v-card class="scenario-card" elevation="2" @click="selectScenario(scenario)">
            <v-card-text class="text-center">
              <v-icon :color="scenario.color" size="48">{{ scenario.icon }}</v-icon>
              <h3 class="scenario-title">{{ scenario.title }}</h3>
              <p class="scenario-desc">{{ scenario.description }}</p>
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
  name: 'AtomicAIModels',
  setup() {
    const scenarios = ref([
      {
        id: 1,
        title: '通信行业',
        description: '面向通信、金融、乡村、双碳等行业机构',
        icon: 'mdi-wifi',
        color: 'primary'
      },
      {
        id: 2,
        title: '金融服务',
        description: '支付金融与通信金融商品模型',
        icon: 'mdi-bank',
        color: 'success'
      },
      {
        id: 3,
        title: '政务服务',
        description: '政务等行业客户调查一站式服务',
        icon: 'mdi-city',
        color: 'warning'
      },
      {
        id: 4,
        title: '乡村振兴',
        description: '助力数字乡村建设和乡村振兴',
        icon: 'mdi-home-group',
        color: 'error'
      }
    ])

    const selectScenario = (scenario) => {
      console.log('选择场景:', scenario.title)
      // 可以在这里添加场景详情展示逻辑
    }

    return {
      scenarios,
      selectScenario
    }
  }
}
</script>

<style scoped>
.atomic-ai-models {
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

.capability-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.capability-card:hover {
  transform: translateY(-5px);
}

.card-header {
  text-align: center;
  padding: 16px;
}

.card-content {
  padding: 20px;
}

.capability-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.capability-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
}

.stats-section {
  margin: 40px 0;
}

.stats-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.scenarios-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.scenario-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.scenario-title {
  margin: 15px 0 10px;
  color: #333;
  font-weight: 600;
}

.scenario-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
