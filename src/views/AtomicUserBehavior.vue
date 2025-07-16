<template>
  <div class="atomic-user-behavior">
    <v-container>
      <!-- 页面标题 -->
      <v-row class="page-header">
        <v-col cols="12">
          <h1 class="page-title">
            <v-icon left size="large" color="primary">mdi-account-search</v-icon>
            用户行为分析平台
          </h1>
          <p class="page-subtitle">
            通过全触点数据采集、实时处理、多模型平台分析，深度挖掘用户行为偏好，实现用户旅程全生命周期管理
          </p>
        </v-col>
      </v-row>

      <!-- 核心能力概述 -->
      <v-row class="capability-overview">
        <v-col cols="12">
          <v-card elevation="3" class="overview-card">
            <v-card-title class="text-center primary white--text">
              <v-icon left>mdi-target</v-icon>
              核心能力
            </v-card-title>
            <v-card-text class="overview-content">
              <p class="overview-text">
                赋能精准营销、体验优化、产品迭代等，助力数据驱动业务增长。
                通过全触点数据采集、实时处理、多模型平台分析，深度挖掘用户行为及偏好，
                实现用户旅程全生命周期管理，赋能精准营销、体验优化、产品迭代等，助力数据驱动业务增长。
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 用户旅程分析流程 -->
      <v-row class="journey-analysis">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="success">mdi-map-marker-path</v-icon>
            用户旅程全生命周期
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="journey-card">
            <v-card-text class="journey-content">
              <!-- 应用层 -->
              <div class="journey-layer">
                <h3 class="layer-title">应用</h3>
                <div class="layer-items">
                  <div class="journey-item" v-for="app in applications" :key="app">
                    <v-chip :color="getRandomColor()" variant="outlined" class="journey-chip">
                      {{ app }}
                    </v-chip>
                  </div>
                </div>
              </div>

              <!-- 用户行为分析平台 -->
              <div class="analysis-platform">
                <v-card class="platform-card" color="primary" dark>
                  <v-card-title class="text-center">
                    <v-icon left>mdi-chart-line</v-icon>
                    用户行为分析平台
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6" md="2" v-for="analysis in analysisTypes" :key="analysis.name">
                        <div class="analysis-type">
                          <v-icon :color="analysis.color" size="large">{{ analysis.icon }}</v-icon>
                          <div class="analysis-name">{{ analysis.name }}</div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>

              <!-- 数据层 -->
              <div class="journey-layer">
                <h3 class="layer-title">数据</h3>
                <div class="layer-items">
                  <div class="data-sources">
                    <v-row>
                      <v-col cols="6" md="2" v-for="source in dataSources" :key="source.name">
                        <v-card class="data-source-card" :color="source.color">
                          <v-card-text class="text-center white--text">
                            <v-icon color="white" size="large">{{ source.icon }}</v-icon>
                            <div class="source-name">{{ source.name }}</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 分析维度 -->
      <v-row class="analysis-dimensions">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="warning">mdi-cube-outline</v-icon>
            分析维度
          </h2>
        </v-col>
        <v-col cols="12" md="6" lg="4" v-for="dimension in dimensions" :key="dimension.id">
          <v-card class="dimension-card" elevation="2">
            <v-card-title class="dimension-header" :class="dimension.color">
              <v-icon left color="white">{{ dimension.icon }}</v-icon>
              <span class="white--text">{{ dimension.title }}</span>
            </v-card-title>
            <v-card-text class="dimension-content">
              <div class="dimension-list">
                <div class="dimension-item" v-for="item in dimension.items" :key="item">
                  <v-icon left :color="dimension.iconColor" size="small">mdi-check-circle</v-icon>
                  {{ item }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 应用价值 -->
      <v-row class="application-value">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="error">mdi-diamond-stone</v-icon>
            应用价值
          </h2>
        </v-col>
        <v-col cols="12" md="6" v-for="value in applicationValues" :key="value.id">
          <v-card class="value-card" elevation="3">
            <v-card-text class="value-content">
              <div class="value-icon-wrapper">
                <v-icon :color="value.color" size="48">{{ value.icon }}</v-icon>
              </div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-desc">{{ value.description }}</p>
              <ul class="value-benefits">
                <li v-for="benefit in value.benefits" :key="benefit">{{ benefit }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 技术架构 -->
      <v-row class="tech-architecture">
        <v-col cols="12">
          <h2 class="section-title">
            <v-icon left color="info">mdi-sitemap</v-icon>
            技术架构
          </h2>
        </v-col>
        <v-col cols="12">
          <v-card elevation="3" class="architecture-card">
            <v-card-text>
              <div class="architecture-layers">
                <div class="arch-layer" v-for="layer in architecture" :key="layer.name">
                  <div class="layer-header" :class="layer.color">
                    <v-icon left color="white">{{ layer.icon }}</v-icon>
                    <span class="white--text">{{ layer.name }}</span>
                  </div>
                  <div class="layer-components">
                    <v-chip
                      v-for="component in layer.components"
                      :key="component"
                      class="component-chip"
                      :color="layer.chipColor"
                      variant="outlined"
                    >
                      {{ component }}
                    </v-chip>
                  </div>
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
  name: 'AtomicUserBehavior',
  setup() {
    const applications = ref([
      '数据挖掘', '决策支持', '精准营销', '体验中心', '实时数据监控',
      '沃享原', '沃互期', '聚合包', '沃易贷', '电子券', '生活激费', '其他业务'
    ])

    const analysisTypes = ref([
      { name: '场景分析', icon: 'mdi-chart-pie', color: 'yellow' },
      { name: '通用分析', icon: 'mdi-chart-bar', color: 'green' },
      { name: '事件管理', icon: 'mdi-calendar', color: 'blue' },
      { name: '看板概览', icon: 'mdi-monitor-dashboard', color: 'purple' },
      { name: '用户分群', icon: 'mdi-account-group', color: 'orange' }
    ])

    const dataSources = ref([
      { name: 'JS埋点数据', icon: 'mdi-code-braces', color: 'orange' },
      { name: '安卓埋点数据', icon: 'mdi-android', color: 'green' },
      { name: 'iOS埋点数据', icon: 'mdi-apple', color: 'blue' },
      { name: '服务端埋点数据', icon: 'mdi-server', color: 'red' },
      { name: '小程序埋点数据', icon: 'mdi-cellphone', color: 'purple' },
      { name: '追踪埋点数据', icon: 'mdi-map-marker', color: 'teal' }
    ])

    const dimensions = ref([
      {
        id: 1,
        title: '场景分析',
        icon: 'mdi-chart-pie',
        color: 'primary',
        iconColor: 'primary',
        items: ['获取分析', '路径分析', '留存分析', '粘性分析', '用户旅程', '全景视图']
      },
      {
        id: 2,
        title: '通用分析',
        icon: 'mdi-chart-bar',
        color: 'success',
        iconColor: 'success',
        items: ['整体分析', '事件分析', '漏斗分析', '常用分析']
      },
      {
        id: 3,
        title: '事件管理',
        icon: 'mdi-calendar',
        color: 'warning',
        iconColor: 'warning',
        items: ['事件分组', '事件列表', '事件申报', '拦截事件']
      },
      {
        id: 4,
        title: '看板概览',
        icon: 'mdi-monitor-dashboard',
        color: 'info',
        iconColor: 'info',
        items: ['看板功能', '实时概览']
      },
      {
        id: 5,
        title: '用户分群',
        icon: 'mdi-account-group',
        color: 'error',
        iconColor: 'error',
        items: ['创建用户群', '编辑用户群']
      }
    ])

    const applicationValues = ref([
      {
        id: 1,
        title: '精准营销',
        description: '基于用户行为数据，实现精准的用户画像和个性化推荐',
        icon: 'mdi-target',
        color: 'primary',
        benefits: [
          '提升营销转化率30%以上',
          '降低获客成本20%',
          '提高用户生命周期价值'
        ]
      },
      {
        id: 2,
        title: '体验优化',
        description: '通过用户行为路径分析，识别体验痛点，优化产品设计',
        icon: 'mdi-account-heart',
        color: 'success',
        benefits: [
          '提升用户满意度15%',
          '减少用户流失率25%',
          '优化关键业务流程'
        ]
      },
      {
        id: 3,
        title: '产品迭代',
        description: '基于数据驱动的产品决策，加速产品迭代和功能优化',
        icon: 'mdi-rocket',
        color: 'warning',
        benefits: [
          '缩短产品迭代周期40%',
          '提高功能使用率35%',
          '降低开发成本'
        ]
      },
      {
        id: 4,
        title: '业务增长',
        description: '通过深度数据分析，发现业务增长机会，制定增长策略',
        icon: 'mdi-trending-up',
        color: 'error',
        benefits: [
          '发现新的业务增长点',
          '提升业务收入25%',
          '优化资源配置效率'
        ]
      }
    ])

    const architecture = ref([
      {
        name: '应用层',
        icon: 'mdi-application',
        color: 'primary',
        chipColor: 'primary',
        components: ['数据挖掘', '决策支持', '精准营销', '体验中心', '实时数据监控']
      },
      {
        name: '分析平台',
        icon: 'mdi-chart-line',
        color: 'success',
        chipColor: 'success',
        components: ['场景分析', '通用分析', '事件管理', '看板概览', '用户分群']
      },
      {
        name: '数据层',
        icon: 'mdi-database',
        color: 'warning',
        chipColor: 'warning',
        components: ['JS埋点', '安卓埋点', 'iOS埋点', '服务端埋点', '小程序埋点', '追踪埋点']
      }
    ])

    const getRandomColor = () => {
      const colors = ['primary', 'success', 'warning', 'error', 'info']
      return colors[Math.floor(Math.random() * colors.length)]
    }

    return {
      applications,
      analysisTypes,
      dataSources,
      dimensions,
      applicationValues,
      architecture,
      getRandomColor
    }
  }
}
</script>

<style scoped>
.atomic-user-behavior {
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

.capability-overview {
  margin-bottom: 40px;
}

.overview-content {
  padding: 24px;
}

.overview-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

.journey-analysis {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.journey-content {
  padding: 30px;
}

.journey-layer {
  margin: 20px 0;
}

.layer-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 4px solid #1976d2;
}

.layer-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.journey-chip {
  margin: 2px;
}

.analysis-platform {
  margin: 30px 0;
}

.platform-card {
  border-radius: 12px;
}

.analysis-type {
  text-align: center;
  padding: 10px;
}

.analysis-name {
  margin-top: 8px;
  font-size: 0.9rem;
  color: white;
}

.data-sources {
  width: 100%;
}

.data-source-card {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.source-name {
  font-size: 0.8rem;
  margin-top: 5px;
}

.analysis-dimensions {
  margin-bottom: 40px;
}

.dimension-card {
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.dimension-card:hover {
  transform: translateY(-5px);
}

.dimension-header {
  text-align: center;
  padding: 16px;
}

.dimension-content {
  padding: 20px;
}

.dimension-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dimension-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
}

.application-value {
  margin-bottom: 40px;
}

.value-card {
  height: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-content {
  padding: 24px;
  text-align: center;
}

.value-icon-wrapper {
  margin-bottom: 15px;
}

.value-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.value-desc {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.value-benefits {
  list-style: none;
  padding: 0;
  text-align: left;
}

.value-benefits li {
  padding: 5px 0;
  position: relative;
  padding-left: 20px;
}

.value-benefits li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.tech-architecture {
  margin-bottom: 40px;
}

.architecture-layers {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.arch-layer {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.layer-header {
  padding: 12px 16px;
  text-align: center;
  font-weight: bold;
}

.layer-components {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.component-chip {
  margin: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .journey-content {
    padding: 15px;
  }
  
  .value-content {
    padding: 16px;
  }
  
  .analysis-type {
    padding: 5px;
  }
  
  .analysis-name {
    font-size: 0.8rem;
  }
}
</style>
