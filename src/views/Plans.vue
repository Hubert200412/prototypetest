<template>
  <div class="plans-page">
    <div class="page-header">
      <h1 class="page-title">选择适合您的套餐</h1>
      <p class="page-subtitle">根据您的需求选择最适合的开发套餐</p>
    </div>
    
    <div class="plans-container">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        class="plan-card"
        :class="plan.featured ? 'featured' : ''"
      >
        <div class="plan-header">
          <h2 class="plan-name">{{ plan.name }}</h2>
          <p class="plan-subtitle">{{ plan.subtitle }}</p>
        </div>
        
        <div class="plan-highlight">
          <p class="highlight-text">{{ plan.highlight }}</p>
        </div>
        
        <div class="plan-features">
          <div 
            v-for="(feature, index) in plan.features" 
            :key="index"
            class="feature-item"
            :class="{ 'unavailable': !feature.available }"
          >
            <span class="feature-icon">
              {{ feature.available ? '✓' : '❌' }}
            </span>
            <span class="feature-text">{{ feature.name }}</span>
          </div>
        </div>
        
        <div class="plan-action">
          <button 
            class="details-btn"
            @click="goToPlanDetail(plan.id)"
          >
            详情 >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Plans',
  data() {
    return {
      plans: [
        {
          id: 'basic',
          name: '基础套餐',
          subtitle: '适用于新产品智能开发',
          highlight: '自然语言驱动新产品生成',
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
        {
          id: 'advanced',
          name: '高级套餐',
          subtitle: '提供数科原子能力嵌入',
          highlight: '数科原子化能力嵌入',
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
        {
          id: 'premium',
          name: '尊享套餐',
          subtitle: '涵盖产品开发运维全生命周期',
          highlight: '一站式服务，产品全生命周期',
          featured: true,
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
      ]
    }
  },
  methods: {
    goToPlanDetail(planId) {
      this.$router.push(`/plans/${planId}`)
    }
  }
}
</script>

<style scoped>
.plans-page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.plans-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  justify-items: center;
}

.plan-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.plan-card.featured {
  border-color: #d32f2f;
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
}

.plan-card.featured::before {
  content: '推荐';
  position: absolute;
  top: -1px;
  right: 20px;
  background: #d32f2f;
  color: white;
  padding: 8px 16px;
  border-radius: 0 0 8px 8px;
  font-size: 12px;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.plan-name {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.plan-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.plan-highlight {
  background: rgba(25, 118, 210, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.highlight-text {
  font-size: 16px;
  font-weight: 600;
  color: #1976d2;
  margin: 0;
}

.plan-features {
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item.unavailable {
  opacity: 0.5;
}

.feature-icon {
  margin-right: 12px;
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.feature-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.feature-item.unavailable .feature-text {
  color: #999;
  text-decoration: line-through;
}

.plan-action {
  text-align: center;
}

.details-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.details-btn:hover {
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
}

.featured .details-btn:hover {
  color: #d32f2f;
  background: rgba(211, 47, 47, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .plans-container {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .plan-card {
    max-width: none;
  }
}
</style>
