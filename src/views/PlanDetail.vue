<template>
  <div class="plan-detail-page" v-if="plan">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        ← 返回套餐选择
      </button>
      <div class="plan-title-section">
        <h1 class="plan-title">{{ plan.name }}</h1>
        <p class="plan-description">{{ plan.subtitle }}</p>
        <div class="plan-highlight-detail">
          <p class="highlight-detail-text">{{ plan.highlight }}</p>
        </div>
      </div>
    </div>

    <div class="detail-content">
      <div class="features-section">
        <h2 class="section-title">套餐功能</h2>
        <div class="features-grid">
          <div 
            v-for="(feature, index) in plan.features" 
            :key="index"
            class="feature-detail-card"
            :class="{ 'unavailable': !feature.available }"
          >
            <div class="feature-status">
              <span class="status-icon">
                {{ feature.available ? '✓' : '❌' }}
              </span>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">{{ feature.name }}</h3>
              <p class="feature-description">{{ getFeatureDescription(feature.name) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="pricing-section">
        <h2 class="section-title">价格信息</h2>
        <div class="pricing-card">
          <div class="price-info">
            <div class="price-main">
              <span class="currency">¥</span>
              <span class="amount">{{ plan.price }}</span>
              <span class="period">/{{ plan.period }}</span>
            </div>
            <p class="price-description">{{ plan.priceDescription }}</p>
          </div>
          <div class="price-features">
            <h4>价格包含：</h4>
            <ul>
              <li v-for="item in plan.priceIncludes" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="contact-section">
        <h2 class="section-title">联系我们</h2>
        <div class="contact-card">
          <div class="contact-info">
            <h3>开始使用{{ plan.name }}</h3>
            <p>如需了解更多详情或定制服务，请联系我们的专业团队</p>
          </div>
          <div class="contact-actions">
            <button class="contact-btn primary">立即咨询</button>
            <button class="contact-btn secondary">申请试用</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>套餐不存在</h2>
    <button class="back-btn" @click="goBack">返回套餐选择</button>
  </div>
</template>

<script>
export default {
  name: 'PlanDetail',
  props: ['planId'],
  data() {
    return {
      plansData: {
        basic: {
          id: 'basic',
          name: '基础套餐',
          subtitle: '适用于新产品智能开发',
          highlight: '自然语言驱动新产品生成',
          price: '999',
          period: '年',
          priceDescription: '适合初创团队和小型项目',
          priceIncludes: [
            '基础开发工具包',
            '标准技术支持',
            '在线文档与教程',
            '社区支持'
          ],
          features: [
            { name: '新产品积木式搭建', available: true },
            { name: 'SAAS化服务', available: true },
            { name: '本地部署', available: true },
            { name: '生成产品升级迭代', available: true },
            { name: '原子化接口', available: false },
            { name: '原子化页面', available: false },
            { name: '原子化数据服务', available: false },
            { name: '原子化模型服务', available: false },
            { name: '定制化服务', available: false },
            { name: '专人运维、运营服务', available: false }
          ]
        },
        advanced: {
          id: 'advanced',
          name: '高级套餐',
          subtitle: '提供数科原子能力嵌入',
          highlight: '数科原子化能力嵌入',
          price: '1,999',
          period: '年',
          priceDescription: '适合成长型企业和中大型项目',
          priceIncludes: [
            '高级开发工具包',
            '优先技术支持',
            '原子化组件库',
            'API接口服务',
            '数据服务支持'
          ],
          features: [
            { name: '新产品积木式搭建', available: true },
            { name: 'SAAS化服务', available: true },
            { name: '本地部署', available: true },
            { name: '生成产品升级迭代', available: true },
            { name: '原子化接口', available: true },
            { name: '原子化页面', available: true },
            { name: '原子化数据服务', available: true },
            { name: '原子化模型服务', available: true },
            { name: '定制化服务', available: false },
            { name: '专人运维、运营服务', available: false }
          ]
        },
        premium: {
          id: 'premium',
          name: '尊享套餐',
          subtitle: '涵盖产品开发运维全生命周期',
          highlight: '一站式服务，产品全生命周期',
          price: '联系我们',
          period: '定制',
          priceDescription: '适合大型企业和复杂项目',
          priceIncludes: [
            '全功能开发平台',
            '7x24专人服务',
            '定制化开发',
            '专属运维团队',
            '全生命周期管理',
            '企业级安全保障'
          ],
          features: [
            { name: '新产品积木式搭建', available: true },
            { name: 'SAAS化服务', available: true },
            { name: '本地部署', available: true },
            { name: '生成产品升级迭代', available: true },
            { name: '原子化接口', available: true },
            { name: '原子化页面', available: true },
            { name: '原子化数据服务', available: true },
            { name: '原子化模型服务', available: true },
            { name: '定制化服务', available: true },
            { name: '专人运维、运营服务', available: true }
          ]
        }
      }
    }
  },
  computed: {
    plan() {
      return this.plansData[this.planId]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/plans')
    },
    getFeatureDescription(featureName) {
      const descriptions = {
        '新产品积木式搭建': '通过模块化组件快速构建新产品，降低开发复杂度',
        'SAAS化服务': '提供云端服务，无需部署维护，开箱即用',
        '本地部署': '支持私有化部署，确保数据安全和系统稳定',
        '生成产品升级迭代': '智能分析用户需求，自动生成产品升级方案',
        '原子化接口': '提供标准化API接口，支持快速集成和扩展',
        '原子化页面': '预制页面模板，支持快速页面搭建和定制',
        '原子化数据服务': '提供数据处理、存储、分析等基础数据服务',
        '原子化模型服务': '集成AI模型服务，支持智能化功能开发',
        '定制化服务': '根据具体需求提供个性化定制开发服务',
        '专人运维、运营服务': '配备专业团队，提供7x24小时运维和运营支持'
      }
      return descriptions[featureName] || '功能详细说明，请联系客服了解更多'
    }
  }
}
</script>

<style scoped>
.plan-detail-page {
  min-height: calc(100vh - 60px);
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}

.detail-header {
  margin-bottom: 40px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.plan-title-section {
  text-align: center;
}

.plan-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.plan-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.plan-highlight-detail {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
}

.highlight-detail-text {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.detail-content {
  display: grid;
  gap: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.feature-detail-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
}

.feature-detail-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.feature-detail-card.unavailable {
  opacity: 0.6;
  background: rgba(255, 255, 255, 0.05);
}

.feature-status {
  flex-shrink: 0;
}

.status-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.feature-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin: 0;
}

.pricing-section, .contact-section {
  max-width: 800px;
  margin: 0 auto;
}

.pricing-card, .contact-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.price-info {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.price-main {
  margin-bottom: 10px;
}

.currency {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  vertical-align: top;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  color: white;
}

.period {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
}

.price-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.price-features h4 {
  font-size: 18px;
  color: white;
  margin-bottom: 15px;
}

.price-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.price-features li {
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  padding-left: 20px;
}

.price-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.contact-info {
  text-align: center;
  margin-bottom: 30px;
}

.contact-info h3 {
  font-size: 24px;
  color: white;
  margin-bottom: 15px;
}

.contact-info p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.contact-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.contact-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn.primary {
  background: #1976d2;
  color: white;
}

.contact-btn.primary:hover {
  background: #1565c0;
  transform: translateY(-2px);
}

.contact-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.contact-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
  color: white;
}

.not-found h2 {
  font-size: 36px;
  margin-bottom: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .plan-title {
    font-size: 36px;
  }
  
  .amount {
    font-size: 36px;
  }
}
</style>
