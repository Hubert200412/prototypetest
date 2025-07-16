<template>
  <div class="community-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">社区分享</h1>
      <p class="page-subtitle">发现和分享智造工厂生成的优秀代码产品和零代码解决方案</p>
    </div>

    <!-- 分类筛选 -->
    <div class="filter-section">
      <v-chip-group v-model="selectedCategory" mandatory class="category-chips">
        <v-chip
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
          filter
        >
          <v-icon left>{{ category.icon }}</v-icon>
          {{ category.label }}
        </v-chip>
      </v-chip-group>
    </div>

    <!-- 分享内容列表 -->
    <div class="content-grid">
      <v-card
        v-for="item in filteredItems"
        :key="item.id"
        class="share-card"
        hover
        @click="viewItem(item)"
      >
        <!-- 卡片头部 -->
        <v-card-title class="card-header">
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <v-chip :color="getCategoryColor(item.category)" size="small" class="category-chip">
              {{ getCategoryLabel(item.category) }}
            </v-chip>
          </div>
          <v-btn
            icon
            size="small"
            @click.stop="toggleFavorite(item)"
            class="favorite-btn"
          >
            <v-icon :color="item.favorited ? 'red' : 'grey'">
              {{ item.favorited ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <!-- 卡片内容 -->
        <v-card-text class="card-content">
          <p class="item-description">{{ item.description }}</p>
          
          <!-- 技术标签 -->
          <div class="tech-tags">
            <v-chip
              v-for="tech in item.technologies"
              :key="tech"
              size="small"
              variant="outlined"
              class="tech-chip"
            >
              {{ tech }}
            </v-chip>
          </div>

          <!-- 生成信息 -->
          <div class="generation-info">
            <div class="info-item">
              <v-icon small class="info-icon">mdi-clock-outline</v-icon>
              <span class="info-text">生成时间: {{ formatTime(item.generatedAt) }}</span>
            </div>
            <div class="info-item">
              <v-icon small class="info-icon">mdi-code-tags</v-icon>
              <span class="info-text">代码行数: {{ item.codeLines }}</span>
            </div>
            <div class="info-item">
              <v-icon small class="info-icon">mdi-download</v-icon>
              <span class="info-text">下载次数: {{ item.downloads }}</span>
            </div>
          </div>
        </v-card-text>

        <!-- 用户信息 -->
        <v-card-actions class="card-actions">
          <v-avatar size="24" class="author-avatar">
            <img v-if="item.author.avatar" :src="item.author.avatar" :alt="item.author.name">
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          <span class="author-name">{{ item.author.name }}</span>
          <v-spacer></v-spacer>
          <v-btn
            size="small"
            variant="outlined"
            @click.stop="downloadItem(item)"
          >
            <v-icon left>mdi-download</v-icon>
            下载
          </v-btn>
          <v-btn
            size="small"
            color="primary"
            @click.stop="viewDemo(item)"
          >
            <v-icon left>mdi-eye</v-icon>
            预览
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- 加载更多 -->
    <div class="load-more-section" v-if="hasMoreItems">
      <v-btn
        @click="loadMoreItems"
        :loading="loading"
        variant="outlined"
        size="large"
      >
        加载更多
      </v-btn>
    </div>

    <!-- 详情对话框 -->
    <v-dialog v-model="showDetailDialog" max-width="800">
      <v-card v-if="selectedItem">
        <v-card-title class="dialog-header">
          <h2>{{ selectedItem.title }}</h2>
          <v-btn
            icon
            @click="showDetailDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="dialog-content">
          <div class="detail-section">
            <h3>项目描述</h3>
            <p>{{ selectedItem.fullDescription }}</p>
          </div>
          
          <div class="detail-section">
            <h3>生成过程</h3>
            <p>{{ selectedItem.generationProcess }}</p>
          </div>
          
          <div class="detail-section">
            <h3>主要功能</h3>
            <ul>
              <li v-for="feature in selectedItem.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="downloadItem(selectedItem)"
          >
            <v-icon left>mdi-download</v-icon>
            下载项目
          </v-btn>
          <v-btn
            variant="outlined"
            @click="viewDemo(selectedItem)"
          >
            <v-icon left>mdi-open-in-new</v-icon>
            在线预览
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Community',
  setup() {
    const selectedCategory = ref('all')
    const loading = ref(false)
    const hasMoreItems = ref(true)
    const showDetailDialog = ref(false)
    const selectedItem = ref(null)

    // 分类定义
    const categories = ref([
      { value: 'all', label: '全部', icon: 'mdi-view-grid' },
      { value: 'webapp', label: 'Web应用', icon: 'mdi-web' },
      { value: 'mobile', label: '移动应用', icon: 'mdi-cellphone' },
      { value: 'api', label: 'API服务', icon: 'mdi-api' },
      { value: 'component', label: '组件库', icon: 'mdi-widgets' },
      { value: 'tool', label: '工具脚本', icon: 'mdi-tools' },
      { value: 'ai', label: 'AI应用', icon: 'mdi-brain' }
    ])

    // 模拟分享数据
    const shareItems = ref([
      {
        id: 1,
        title: '智能客服聊天机器人',
        description: '基于自然语言处理的智能客服系统，支持多轮对话和情感分析',
        fullDescription: '这是一个完整的智能客服解决方案，集成了最新的NLP技术，能够理解用户意图并提供准确的回复。系统支持多种消息类型，包括文字、图片和文件，并具备学习能力。',
        category: 'ai',
        technologies: ['Vue.js', 'Node.js', 'TensorFlow.js', 'Socket.io'],
        author: {
          name: '张开发',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
        },
        generatedAt: '2024-07-15 14:30:00',
        codeLines: 1520,
        downloads: 156,
        favorited: false,
        features: [
          '智能意图识别',
          '多轮对话支持',
          '情感分析',
          '知识库管理',
          '用户会话记录'
        ],
        generationProcess: '通过自然语言描述"创建一个智能客服系统"，智造工厂自动生成了完整的前后端代码，包括聊天界面、NLP处理模块和数据库设计。'
      },
      {
        id: 2,
        title: '电商产品推荐系统',
        description: '基于用户行为分析的商品推荐算法，提升转化率和用户体验',
        fullDescription: '该推荐系统采用协同过滤和内容过滤相结合的方式，能够根据用户的浏览历史、购买记录和偏好标签，为用户推荐最合适的商品。',
        category: 'webapp',
        technologies: ['React', 'Python', 'MongoDB', 'Redis'],
        author: {
          name: '李算法',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        },
        generatedAt: '2024-07-14 09:15:00',
        codeLines: 2350,
        downloads: 89,
        favorited: true,
        features: [
          '协同过滤推荐',
          '实时个性化',
          'A/B测试支持',
          '推荐效果分析',
          '商品冷启动处理'
        ],
        generationProcess: '输入需求"开发电商推荐系统，要求支持个性化推荐和效果分析"，系统自动生成了推荐算法、用户界面和分析仪表板。'
      },
      {
        id: 3,
        title: '移动端任务管理App',
        description: '简洁高效的任务管理应用，支持团队协作和进度跟踪',
        fullDescription: '这是一个功能完整的任务管理应用，提供直观的界面设计和强大的协作功能。用户可以创建项目、分配任务、设置提醒，并实时跟踪项目进度。',
        category: 'mobile',
        technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
        author: {
          name: '王移动',
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
        },
        generatedAt: '2024-07-13 16:45:00',
        codeLines: 1890,
        downloads: 234,
        favorited: false,
        features: [
          '任务创建和分配',
          '项目进度跟踪',
          '团队协作功能',
          '消息推送提醒',
          '离线数据同步'
        ],
        generationProcess: '通过描述"创建一个支持团队协作的任务管理移动应用"，智造工厂生成了完整的React Native应用，包括UI组件、状态管理和数据同步逻辑。'
      },
      {
        id: 4,
        title: 'RESTful API生成器',
        description: '零代码快速生成标准API接口，支持多种数据库和认证方式',
        fullDescription: '这个工具可以根据数据模型自动生成完整的RESTful API，包括CRUD操作、数据验证、权限控制和API文档。支持MySQL、PostgreSQL和MongoDB等多种数据库。',
        category: 'api',
        technologies: ['Node.js', 'Express', 'Swagger', 'JWT'],
        author: {
          name: '陈后端',
          avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
        },
        generatedAt: '2024-07-12 11:20:00',
        codeLines: 980,
        downloads: 167,
        favorited: true,
        features: [
          '自动CRUD生成',
          '数据验证',
          'JWT认证',
          'API文档生成',
          '多数据库支持'
        ],
        generationProcess: '输入数据模型和API需求，系统自动生成了完整的后端服务代码，包括路由、中间件、数据库操作和Swagger文档。'
      },
      {
        id: 5,
        title: 'Vue组件库模板',
        description: '可复用的Vue3组件库，包含常用业务组件和设计规范',
        fullDescription: '这是一套完整的Vue3组件库，提供了数据表格、表单组件、图表组件等常用业务组件，同时包含完整的设计系统和使用文档。',
        category: 'component',
        technologies: ['Vue 3', 'TypeScript', 'Vite', 'Storybook'],
        author: {
          name: '刘前端',
          avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        generatedAt: '2024-07-11 13:10:00',
        codeLines: 3200,
        downloads: 312,
        favorited: false,
        features: [
          '20+业务组件',
          'TypeScript支持',
          '完整设计系统',
          'Storybook文档',
          '单元测试覆盖'
        ],
        generationProcess: '描述"创建一套Vue3企业级组件库"，智造工厂生成了组件源码、文档站点、构建配置和测试用例的完整项目结构。'
      },
      {
        id: 6,
        title: '数据可视化仪表板',
        description: '交互式数据可视化平台，支持多种图表类型和实时数据更新',
        fullDescription: '功能强大的数据可视化解决方案，支持多种数据源接入，提供丰富的图表组件和交互功能，适用于业务分析和监控场景。',
        category: 'webapp',
        technologies: ['D3.js', 'Chart.js', 'WebSocket', 'Vue.js'],
        author: {
          name: '赵数据',
          avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
        },
        generatedAt: '2024-07-10 08:30:00',
        codeLines: 2100,
        downloads: 198,
        favorited: true,
        features: [
          '多种图表类型',
          '实时数据更新',
          '拖拽式布局',
          '数据源管理',
          '导出功能'
        ],
        generationProcess: '通过"构建数据可视化仪表板平台"的需求描述，系统生成了图表组件、数据处理逻辑和仪表板编辑器的完整代码。'
      }
    ])

    // 计算属性
    const filteredItems = computed(() => {
      if (selectedCategory.value === 'all') {
        return shareItems.value
      }
      return shareItems.value.filter(item => item.category === selectedCategory.value)
    })

    // 方法
    const getCategoryLabel = (category) => {
      const cat = categories.value.find(c => c.value === category)
      return cat ? cat.label : category
    }

    const getCategoryColor = (category) => {
      const colors = {
        webapp: 'blue',
        mobile: 'green',
        api: 'orange',
        component: 'purple',
        tool: 'teal',
        ai: 'red'
      }
      return colors[category] || 'grey'
    }

    const formatTime = (timeStr) => {
      const date = new Date(timeStr)
      return date.toLocaleDateString('zh-CN')
    }

    const toggleFavorite = (item) => {
      item.favorited = !item.favorited
    }

    const viewItem = (item) => {
      selectedItem.value = item
      showDetailDialog.value = true
    }

    const downloadItem = (item) => {
      // 模拟下载
      alert(`开始下载: ${item.title}`)
      item.downloads++
    }

    const viewDemo = (item) => {
      // 模拟预览
      alert(`打开预览: ${item.title}`)
    }

    const loadMoreItems = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        hasMoreItems.value = false
      }, 1000)
    }

    onMounted(() => {
      // 初始化数据
    })

    return {
      selectedCategory,
      loading,
      hasMoreItems,
      showDetailDialog,
      selectedItem,
      categories,
      shareItems,
      filteredItems,
      getCategoryLabel,
      getCategoryColor,
      formatTime,
      toggleFavorite,
      viewItem,
      downloadItem,
      viewDemo,
      loadMoreItems
    }
  }
}
</script>

<style scoped>
.community-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.6;
}

.filter-section {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.category-chips {
  justify-content: center;
}

.category-chips .v-chip {
  margin: 4px 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-chips .v-chip--selected {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%) !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.category-chips .v-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
}

.share-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  background: white;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.share-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.card-header {
  padding: 20px 20px 12px 20px;
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
  position: relative;
}

.favorite-btn {
  position: absolute !important;
  top: 12px !important;
  right: 12px !important;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 1) !important;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
}

.category-chip {
  margin-top: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.card-content {
  flex: 1;
  padding-top: 8px;
}

.item-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.tech-tags {
  margin-bottom: 15px;
}

.tech-chip {
  margin-right: 8px;
  margin-bottom: 6px;
  font-weight: 600;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  color: #1976d2;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.generation-info {
  border-top: 2px solid #e2e8f0;
  padding-top: 16px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  margin: 0 -20px -20px -20px;
  padding: 16px 20px 20px 20px;
  border-radius: 0 0 16px 16px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 600;
}

.info-icon {
  margin-right: 8px;
  color: #1976d2;
}

.info-text {
  color: #4a5568;
}

.card-actions {
  border-top: 2px solid #e2e8f0;
  padding: 16px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.author-avatar {
  margin-right: 10px;
  border: 2px solid #e2e8f0;
}

.author-name {
  font-size: 0.95rem;
  color: #2d3748;
  font-weight: 600;
}

.v-btn {
  font-weight: 600;
  text-transform: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.load-more-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.dialog-header {
  border-bottom: 2px solid #e2e8f0;
  padding: 24px 28px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
}

.dialog-header h2 {
  color: #1a202c;
  font-weight: 700;
  font-size: 1.5rem;
}

.dialog-content {
  padding: 24px 28px;
  background: white;
}

.detail-section {
  margin-bottom: 28px;
  padding: 20px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  border-left: 4px solid #1976d2;
}

.detail-section h3 {
  color: #1976d2;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.detail-section ul {
  padding-left: 20px;
}

.detail-section li {
  margin-bottom: 6px;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .community-container {
    padding: 16px;
  }
}
</style>
