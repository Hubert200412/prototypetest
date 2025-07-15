<template>
  <v-container fluid class="news-page">
    <!-- 页面标题和搜索栏 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="page-header">
          <h1 class="page-title">企业动态</h1>
          <p class="page-subtitle">了解智造工厂最新动态和行业资讯</p>
        </div>
      </v-col>
    </v-row>

    <!-- 搜索和筛选区域 -->
    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="searchKeyword"
          prepend-inner-icon="mdi-magnify"
          label="搜索新闻..."
          variant="outlined"
          density="compact"
          @input="handleSearch"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categoryOptions"
          label="分类筛选"
          variant="outlined"
          density="compact"
          @update:modelValue="handleCategoryChange"
        ></v-select>
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
                @click="viewNewsDetail(newsItem)"
              >
                <template v-slot:prepend>
                  <v-avatar size="80" class="news-avatar">
                    <v-img :src="newsItem.image" :alt="newsItem.title"></v-img>
                  </v-avatar>
                </template>

                <v-list-item-content class="news-content">
                  <div class="news-header">
                    <v-list-item-title class="news-title">
                      {{ newsItem.title }}
                      <v-chip
                        v-if="newsItem.isHot"
                        size="x-small"
                        color="red"
                        class="ml-2"
                      >
                        热门
                      </v-chip>
                      <v-chip
                        v-if="newsItem.isNew"
                        size="x-small"
                        color="primary"
                        class="ml-2"
                      >
                        最新
                      </v-chip>
                    </v-list-item-title>
                    
                    <div class="news-meta">
                      <v-chip size="small" variant="outlined" class="mr-2">
                        {{ newsItem.category }}
                      </v-chip>
                      <span class="text-grey">{{ newsItem.author }}</span>
                      <span class="text-grey mx-2">•</span>
                      <span class="text-grey">{{ formatDate(newsItem.publishDate) }}</span>
                      <span class="text-grey mx-2">•</span>
                      <span class="text-grey">{{ newsItem.readCount }} 阅读</span>
                    </div>
                  </div>

                  <v-list-item-subtitle class="news-summary">
                    {{ newsItem.summary }}
                  </v-list-item-subtitle>

                  <div class="news-tags mt-2">
                    <v-chip
                      v-for="tag in newsItem.tags"
                      :key="tag"
                      size="x-small"
                      variant="tonal"
                      class="mr-1"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </v-list-item-content>

                <template v-slot:append>
                  <v-btn icon variant="text" size="small">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>

                <v-divider v-if="index < paginatedNews.length - 1" class="mt-4"></v-divider>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 分页 -->
    <v-row v-if="totalPages > 1" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          @update:modelValue="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- 新闻详情对话框 -->
    <v-dialog v-model="showDetailDialog" max-width="800px" scrollable>
      <v-card v-if="selectedNews">
        <v-card-title class="d-flex align-center">
          <v-avatar size="40" class="mr-3">
            <v-img :src="selectedNews.image" :alt="selectedNews.title"></v-img>
          </v-avatar>
          <div class="flex-grow-1">
            <h3>{{ selectedNews.title }}</h3>
            <div class="news-meta mt-1">
              <v-chip size="small" variant="outlined" class="mr-2">
                {{ selectedNews.category }}
              </v-chip>
              <span class="text-grey">{{ selectedNews.author }}</span>
              <span class="text-grey mx-2">•</span>
              <span class="text-grey">{{ formatDate(selectedNews.publishDate) }}</span>
            </div>
          </div>
          <v-btn icon @click="showDetailDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="py-4">
          <p class="text-body-1 mb-4">{{ selectedNews.summary }}</p>
          <p class="text-body-2">{{ selectedNews.content }}</p>
          
          <div class="mt-4">
            <v-chip
              v-for="tag in selectedNews.tags"
              :key="tag"
              size="small"
              variant="tonal"
              class="mr-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDetailDialog = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { getAllNews, getNewsByCategory, searchNews, newsCategories } from '../utils/newsData'

export default {
  name: 'News',
  setup() {
    // 响应式数据
    const loading = ref(false)
    const searchKeyword = ref('')
    const selectedCategory = ref('all')
    const selectedCategoryChip = ref(0)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const showDetailDialog = ref(false)
    const selectedNews = ref(null)

    // 新闻数据
    const allNews = ref([])
    const filteredNews = ref([])

    // 分类数据
    const categories = ref(newsCategories)
    const categoryOptions = computed(() => {
      return categories.value.map(cat => ({
        title: cat.name,
        value: cat.id
      }))
    })

    // 分页计算
    const totalPages = computed(() => {
      return Math.ceil(filteredNews.value.length / itemsPerPage.value)
    })

    const paginatedNews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredNews.value.slice(start, end)
    })

    // 方法
    const loadNews = () => {
      loading.value = true
      console.log('开始加载新闻数据...')
      try {
        const newsDataResult = getAllNews()
        console.log('获取到的新闻数据:', newsDataResult)
        allNews.value = newsDataResult
        filteredNews.value = [...allNews.value]
        console.log('allNews.value:', allNews.value.length)
        console.log('filteredNews.value:', filteredNews.value.length)
      } catch (error) {
        console.error('加载新闻失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleSearch = () => {
      if (searchKeyword.value.trim()) {
        filteredNews.value = searchNews(searchKeyword.value.trim())
      } else {
        filteredNews.value = getNewsByCategory(selectedCategory.value)
      }
      currentPage.value = 1
    }

    const handleCategoryChange = (category) => {
      selectedCategory.value = category
      selectedCategoryChip.value = categories.value.findIndex(cat => cat.id === category)
      
      if (searchKeyword.value.trim()) {
        handleSearch()
      } else {
        filteredNews.value = getNewsByCategory(category)
      }
      currentPage.value = 1
    }

    const handleChipSelect = (index) => {
      if (index !== null) {
        const category = categories.value[index]
        selectedCategory.value = category.id
        handleCategoryChange(category.id)
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const viewNewsDetail = (newsItem) => {
      selectedNews.value = newsItem
      showDetailDialog.value = true
      
      // 增加阅读量（实际项目中应该调用API）
      newsItem.readCount += 1
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // 生命周期
    onMounted(() => {
      loadNews()
    })

    return {
      // 数据
      loading,
      searchKeyword,
      selectedCategory,
      selectedCategoryChip,
      currentPage,
      showDetailDialog,
      selectedNews,
      categories,
      categoryOptions,
      filteredNews,
      paginatedNews,
      totalPages,
      
      // 方法
      handleSearch,
      handleCategoryChange,
      handleChipSelect,
      handlePageChange,
      viewNewsDetail,
      formatDate
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
  cursor: pointer;
  transition: background-color 0.2s;
}

.news-item:hover {
  background-color: #f8f9fa;
}

.news-avatar {
  border-radius: 8px;
  margin-right: 16px;
}

.news-content {
  flex: 1;
}

.news-header {
  margin-bottom: 8px;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.news-summary {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .news-page {
    padding: 12px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .news-item {
    padding: 16px;
  }
  
  .news-avatar {
    width: 60px;
    height: 60px;
  }
  
  .news-title {
    font-size: 1.1rem;
  }
  
  .news-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
