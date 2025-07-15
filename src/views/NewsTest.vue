<template>
  <v-container fluid class="news-page">
    <!-- 页面标题 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="page-header">
          <h1 class="page-title">企业动态</h1>
          <p class="page-subtitle">了解智造工厂最新动态和行业资讯</p>
        </div>
      </v-col>
    </v-row>

    <!-- 调试信息 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card class="pa-4">
          <h3>调试信息</h3>
          <p>加载状态: {{ loading }}</p>
          <p>新闻数量: {{ filteredNews.length }}</p>
          <p>分页新闻数量: {{ paginatedNews.length }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- 新闻列表 -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="news-container">
          <v-card-text class="pa-0">
            <div v-if="loading" class="text-center py-8">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <p class="mt-4">加载中...</p>
            </div>
            
            <div v-else-if="filteredNews.length === 0" class="text-center py-8">
              <v-icon size="64" color="grey-lighten-1">mdi-newspaper-variant-outline</v-icon>
              <p class="mt-4 text-grey">暂无相关新闻</p>
            </div>
            
            <v-list v-else class="pa-0">
              <v-list-item
                v-for="(newsItem, index) in paginatedNews"
                :key="newsItem.id"
                class="news-item"
              >
                <template v-slot:prepend>
                  <v-avatar size="80" class="news-avatar">
                    <v-icon>mdi-newspaper</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-content class="news-content">
                  <v-list-item-title class="news-title">
                    {{ newsItem.title }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="news-summary">
                    {{ newsItem.summary }}
                  </v-list-item-subtitle>

                  <div class="news-meta mt-2">
                    <span class="text-grey">{{ newsItem.author }}</span>
                    <span class="text-grey mx-2">•</span>
                    <span class="text-grey">{{ newsItem.publishDate }}</span>
                  </div>
                </v-list-item-content>

                <v-divider v-if="index < paginatedNews.length - 1" class="mt-4"></v-divider>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'News',
  setup() {
    // 响应式数据
    const loading = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    // 硬编码测试数据
    const testNews = [
      {
        id: 1,
        title: "智造工厂完成新一轮技术升级",
        summary: "平台新增AI智能优化功能，大幅提升制造效率",
        author: "技术部",
        publishDate: "2025-07-10"
      },
      {
        id: 2,
        title: "智造工厂用户突破10万大关",
        summary: "平台注册用户数量持续增长，服务覆盖全国各大制造企业",
        author: "运营部",
        publishDate: "2025-07-08"
      },
      {
        id: 3,
        title: "新增企业级定制化服务",
        summary: "针对大型制造企业推出专属定制解决方案",
        author: "产品部",
        publishDate: "2025-07-05"
      }
    ]

    // 新闻数据
    const filteredNews = ref(testNews)

    // 分页计算
    const totalPages = computed(() => {
      return Math.ceil(filteredNews.value.length / itemsPerPage.value)
    })

    const paginatedNews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredNews.value.slice(start, end)
    })

    // 生命周期
    onMounted(() => {
      console.log('News组件已挂载')
      console.log('测试新闻数据:', testNews)
    })

    return {
      // 数据
      loading,
      currentPage,
      filteredNews,
      paginatedNews,
      totalPages
    }
  }
}
</script>

<style scoped>
.news-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.news-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.news-item {
  padding: 20px;
}

.news-avatar {
  border-radius: 8px;
  margin-right: 16px;
}

.news-content {
  flex: 1;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
}

.news-summary {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
</style>
