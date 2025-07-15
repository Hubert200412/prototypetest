// API服务管理
// 统一管理所有数据请求，方便后端连接

import { apiConfig, errorMessages, successMessages } from './siteConfig'

// 模拟API延迟
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

// API错误处理
class ApiError extends Error {
  constructor(message, status = 500, code = 'UNKNOWN_ERROR') {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

// 基础API类
class BaseApi {
  constructor() {
    this.baseURL = apiConfig.baseURL
    this.timeout = apiConfig.timeout
  }

  // 模拟HTTP请求
  async mockRequest(endpoint, options = {}) {
    await mockDelay(Math.random() * 500 + 200) // 200-700ms随机延迟
    
    // 模拟网络错误
    if (Math.random() < 0.05) { // 5%概率网络错误
      throw new ApiError(errorMessages.network, 0, 'NETWORK_ERROR')
    }
    
    return { success: true, data: options.mockData || null }
  }

  // 处理错误
  handleError(error) {
    if (error instanceof ApiError) {
      return error
    }
    
    if (error.code === 'NETWORK_ERROR') {
      return new ApiError(errorMessages.network, 0, 'NETWORK_ERROR')
    }
    
    return new ApiError(errorMessages.unknown, 500, 'UNKNOWN_ERROR')
  }
}

// 用户API服务
export class UserApiService extends BaseApi {
  // 用户登录
  async login(credentials) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.auth.login, {
        mockData: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: credentials.username,
            email: credentials.email || 'user@example.com',
            role: 'admin'
          }
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 用户注册
  async register(userData) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.auth.register, {
        mockData: {
          user: {
            id: Date.now(),
            ...userData,
            role: 'user',
            joinDate: new Date().toISOString()
          }
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 获取用户资料
  async getProfile(userId) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.auth.profile, {
        mockData: {
          id: userId,
          username: 'Sonetto_2004',
          email: 'sonetto@example.com',
          role: 'admin',
          profile: {
            realName: '用户姓名',
            company: '示例公司',
            position: '产品经理'
          }
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 更新用户资料
  async updateProfile(userId, profileData) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.auth.profile, {
        mockData: { ...profileData, updatedAt: new Date().toISOString() }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 项目API服务
export class ProjectApiService extends BaseApi {
  // 获取项目列表
  async getProjects(filters = {}) {
    try {
      // 这里会从实际的projectsData导入
      const { projectsData } = await import('./projectsData')
      const response = await this.mockRequest(apiConfig.endpoints.projects.list, {
        mockData: projectsData
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 创建项目
  async createProject(projectData) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.projects.create, {
        mockData: {
          id: Date.now(),
          ...projectData,
          status: 'developing',
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString()
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 获取项目详情
  async getProjectDetail(projectId) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.projects.detail.replace(':id', projectId), {
        mockData: {
          id: projectId,
          name: '项目名称',
          description: '项目描述',
          status: 'developing',
          // 更多项目详情...
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 部署项目
  async deployProject(projectId, deployConfig = {}) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.projects.deploy.replace(':id', projectId), {
        mockData: {
          projectId,
          deploymentId: Date.now(),
          status: 'deployed',
          deployTime: new Date().toISOString(),
          url: `https://app-${projectId}.zhizao.com`
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 新闻API服务
export class NewsApiService extends BaseApi {
  // 获取新闻列表
  async getNews(filters = {}) {
    try {
      const { getAllNews } = await import('./newsData')
      const response = await this.mockRequest(apiConfig.endpoints.news.list, {
        mockData: getAllNews()
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 根据分类获取新闻
  async getNewsByCategory(category) {
    try {
      const { getNewsByCategory } = await import('./newsData')
      const response = await this.mockRequest(apiConfig.endpoints.news.list, {
        mockData: getNewsByCategory(category)
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 搜索新闻
  async searchNews(keyword) {
    try {
      const { searchNews } = await import('./newsData')
      const response = await this.mockRequest(apiConfig.endpoints.news.search, {
        mockData: searchNews(keyword)
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 获取新闻详情
  async getNewsDetail(newsId) {
    try {
      const { getNewsById } = await import('./newsData')
      const response = await this.mockRequest(apiConfig.endpoints.news.detail.replace(':id', newsId), {
        mockData: getNewsById(newsId)
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 协作网络API服务
export class NetworkApiService extends BaseApi {
  // 获取团队成员
  async getTeamMembers() {
    try {
      const { teamMembers } = await import('./networkData')
      const response = await this.mockRequest(apiConfig.endpoints.network.members, {
        mockData: teamMembers
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 添加团队成员
  async addTeamMember(memberData) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.network.members, {
        mockData: {
          id: Date.now(),
          ...memberData,
          joinTime: new Date().toISOString(),
          lastActive: new Date().toISOString()
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 获取权限配置
  async getPermissions() {
    try {
      const { roles, permissionTypes, rolePermissions } = await import('./networkData')
      const response = await this.mockRequest(apiConfig.endpoints.network.permissions, {
        mockData: { roles, permissionTypes, rolePermissions }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 套餐API服务
export class PlanApiService extends BaseApi {
  // 获取套餐列表
  async getPlans() {
    try {
      // 模拟套餐数据
      const plansData = [
        {
          id: 'basic',
          name: '基础版',
          price: 99,
          period: 'monthly',
          features: ['基础功能', '5个项目', '10GB存储'],
          recommended: false
        },
        {
          id: 'pro',
          name: '专业版',
          price: 299,
          period: 'monthly',
          features: ['全部功能', '无限项目', '100GB存储', '优先支持'],
          recommended: true
        },
        {
          id: 'enterprise',
          name: '企业版',
          price: 999,
          period: 'monthly',
          features: ['企业级功能', '无限项目', '1TB存储', '专属客服', '定制开发'],
          recommended: false
        }
      ]
      
      const response = await this.mockRequest(apiConfig.endpoints.plans.list, {
        mockData: plansData
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 订阅套餐
  async subscribePlan(planId, paymentData) {
    try {
      const response = await this.mockRequest(apiConfig.endpoints.plans.subscribe.replace(':id', planId), {
        mockData: {
          subscriptionId: Date.now(),
          planId,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30天后
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 文件上传API服务
export class UploadApiService extends BaseApi {
  // 单文件上传
  async uploadSingle(file, onProgress) {
    try {
      // 模拟上传进度
      if (onProgress) {
        for (let i = 0; i <= 100; i += 10) {
          await mockDelay(100)
          onProgress(i)
        }
      }
      
      const response = await this.mockRequest(apiConfig.endpoints.upload.single, {
        mockData: {
          fileId: Date.now(),
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          url: `https://files.zhizao.com/${Date.now()}-${file.name}`,
          uploadTime: new Date().toISOString()
        }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // 多文件上传
  async uploadMultiple(files, onProgress) {
    try {
      const uploadResults = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const result = await this.uploadSingle(file, (progress) => {
          if (onProgress) {
            const totalProgress = ((i * 100 + progress) / files.length)
            onProgress(Math.round(totalProgress))
          }
        })
        uploadResults.push(result)
      }
      
      return uploadResults
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

// 导出API服务实例
export const userApi = new UserApiService()
export const projectApi = new ProjectApiService()
export const newsApi = new NewsApiService()
export const networkApi = new NetworkApiService()
export const planApi = new PlanApiService()
export const uploadApi = new UploadApiService()

// 默认导出所有API服务
export default {
  user: userApi,
  project: projectApi,
  news: newsApi,
  network: networkApi,
  plan: planApi,
  upload: uploadApi,
  
  // API配置
  config: apiConfig,
  
  // 消息配置
  messages: {
    error: errorMessages,
    success: successMessages
  }
}
