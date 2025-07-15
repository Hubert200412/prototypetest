<template>
  <div class="project-create-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">创建新项目</h1>
        <p class="page-subtitle">{{ getCategoryDescription() }}</p>
      </div>
      <div class="header-actions">
        <button class="back-btn" @click="goBack">
          返回项目列表
        </button>
      </div>
    </div>

    <div class="create-form">
      <div class="form-section">
        <h2>基本信息</h2>
        <div class="form-group">
          <label>项目类别</label>
          <select v-model="projectData.category" class="form-control">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>项目名称</label>
          <input type="text" v-model="projectData.name" class="form-control" placeholder="输入项目名称">
        </div>
        <div class="form-group">
          <label>项目描述</label>
          <textarea v-model="projectData.description" class="form-control" rows="3" placeholder="简要描述项目功能和目标"></textarea>
        </div>
      </div>

      <div class="form-section">
        <h2>项目模板</h2>
        <div class="templates-grid">
          <div 
            v-for="template in getTemplatesByCategory()"
            :key="template.id"
            class="template-card"
            :class="{ active: projectData.templateId === template.id }"
            @click="selectTemplate(template)"
          >
            <div class="template-icon">
              <img :src="template.icon" alt="模板图标">
            </div>
            <div class="template-info">
              <h3>{{ template.name }}</h3>
              <p>{{ template.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="cancel-btn" @click="goBack">取消</button>
        <button class="submit-btn" @click="createProject" :disabled="!isFormValid">创建项目</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProjectCategories } from '../utils/projectsData'

export default {
  name: 'ProjectCreatePage',
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const categories = ref(getProjectCategories())
    
    const projectData = ref({
      name: '',
      description: '',
      category: props.category || route.query.category || categories.value[0],
      templateId: null,
      status: 'developing'
    })

    // 项目模板数据
    const templates = ref([
      {
        id: 0,
        name: '自定义项目',
        description: '创建空白项目，自由定制项目结构和功能模块',
        category: 'WEB智造',
        icon: '/icons/设置.svg'
      },
      {
        id: 0,
        name: '自定义项目',
        description: '创建空白项目，自由定制项目结构和功能模块',
        category: '移动端智造',
        icon: '/icons/设置.svg'
      },
      {
        id: 0,
        name: '自定义项目',
        description: '创建空白项目，自由定制项目结构和功能模块',
        category: '流程自动化智造',
        icon: '/icons/设置.svg'
      },
      {
        id: 1,
        name: '企业官网',
        description: '响应式企业官网模板，包含首页、产品服务、新闻动态等模块',
        category: 'WEB智造',
        icon: '/icons/首页-WEB端.svg'
      },
      {
        id: 2,
        name: '数据可视化平台',
        description: '集成多种图表和数据展示组件，用于构建数据分析和监控系统',
        category: 'WEB智造',
        icon: '/icons/首页-WEB端.svg'
      },
      {
        id: 3,
        name: '后台管理系统',
        description: '功能完善的后台管理框架，包含权限管理、用户管理、数据管理等功能',
        category: 'WEB智造',
        icon: '/icons/首页-WEB端.svg'
      },
      {
        id: 4,
        name: '电子商务平台',
        description: '完整的电商系统，包含商品展示、购物车、订单管理和支付系统',
        category: 'WEB智造',
        icon: '/icons/首页-WEB端.svg'
      },
      {
        id: 5,
        name: '移动应用',
        description: '基于Flutter的跨平台移动应用模板，支持iOS和Android系统',
        category: '移动端智造',
        icon: '/icons/首页-移动端.svg'
      },
      {
        id: 6,
        name: '小程序模板',
        description: '微信小程序通用模板，包含常用组件和功能模块',
        category: '移动端智造',
        icon: '/icons/首页-移动端.svg'
      },
      {
        id: 7,
        name: '移动商城',
        description: '移动端电商应用模板，提供流畅的购物体验',
        category: '移动端智造',
        icon: '/icons/首页-移动端.svg'
      },
      {
        id: 8,
        name: '工作流自动化',
        description: '可视化工作流设计和自动化执行平台',
        category: '流程自动化智造',
        icon: '/icons/首页-自动化.svg'
      },
      {
        id: 9,
        name: '智能表单系统',
        description: '动态表单设计与自动处理系统，适用于各类审批流程',
        category: '流程自动化智造',
        icon: '/icons/首页-自动化.svg'
      },
      {
        id: 10,
        name: '数据处理管道',
        description: '用于构建数据ETL流程，支持多种数据源和目标系统',
        category: '流程自动化智造',
        icon: '/icons/首页-自动化.svg'
      }
    ])

    // 根据类别获取项目模板
    const getTemplatesByCategory = () => {
      const filteredTemplates = templates.value.filter(t => t.category === projectData.value.category)
      // 确保自定义项目排在最后
      return filteredTemplates.sort((a, b) => {
        if (a.name === '自定义项目') return 1
        if (b.name === '自定义项目') return -1
        return a.id - b.id
      })
    }

    // 获取类别描述
    const getCategoryDescription = () => {
      const categoryMap = {
        'WEB智造': '创建WEB端项目，包括企业官网、管理系统、数据平台等',
        '移动端智造': '创建移动应用、小程序等移动端项目',
        '流程自动化智造': '创建工作流、审批系统等自动化流程项目'
      }
      return categoryMap[projectData.value.category] || '选择项目类型，创建新项目'
    }

    // 选择模板
    const selectTemplate = (template) => {
      projectData.value.templateId = template.id
    }

    // 表单验证
    const isFormValid = computed(() => {
      return projectData.value.name && 
             projectData.value.description && 
             projectData.value.templateId
    })

    // 创建项目
    const createProject = () => {
      // 这里可以发送请求到后端创建项目
      // 实际操作中会将项目数据发送给后端API
      
      console.log('创建项目:', projectData.value)
      
      // 模拟创建成功，跳转回项目列表
      setTimeout(() => {
        alert('项目创建成功！')
        router.push('/projects')
      }, 1000)
    }

    // 返回项目列表
    const goBack = () => {
      router.push('/projects')
    }

    return {
      categories,
      projectData,
      templates,
      getTemplatesByCategory,
      getCategoryDescription,
      selectTemplate,
      isFormValid,
      createProject,
      goBack
    }
  }
}
</script>

<style scoped>
.project-create-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  border-radius: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.page-subtitle {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
}

.back-btn {
  background: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(25, 118, 210, 0.1);
}

.create-form {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 40px;
}

.form-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease;
}

.form-control:focus {
  border-color: #1976d2;
  outline: none;
}

textarea.form-control {
  resize: none;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.template-card {
  border: 2px solid #eee;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.template-card:hover {
  border-color: #1976d2;
  transform: translateY(-2px);
}

.template-card.active {
  border-color: #1976d2;
  background: rgba(25, 118, 210, 0.05);
}

.template-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(25, 118, 210, 0.1);
}

.template-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.template-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.template-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.cancel-btn {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  border-color: #999;
  color: #333;
}

.submit-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #1565c0;
}

.submit-btn:disabled {
  background: #b0bec5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .back-btn {
    width: 100%;
  }
}
</style>
