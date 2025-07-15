// 用户数据管理
export const userData = {
  // 基本用户信息
  userInfo: {
    id: 1,
    username: 'Sonetto_2004',
    displayName: 'Sonetto_2004',
    email: 'sonetto@example.com',
    phone: '138****8888',
    location: '北京市海淀区',
    avatar: '/icons/用户头像.jpg', // 需要用户添加头像图片
    role: '员工',
    joinDate: '2024年1月15日',
    lastLogin: '2025年7月11日 14:30',
    status: 'active',
    verified: true
  },

  // 项目统计数据
  projectStats: {
    total: 23,
    deployed: 18,
    developing: 3,
    failed: 2,
    totalUsageHours: 156,
    customMCP: 7
  },

  // 套餐信息
  userSubscription: {
    planId: 'basic',
    planName: '基础套餐',
    status: 'active',
    startDate: '2024-06-01',
    expiryDate: '2025-06-01',
    autoRenew: true,
    projectQuota: 10,
    apiLimit: '10,000次/月',
    expertModes: '基础模式',
    features: [
      '基础项目创建',
      '10GB云存储',
      'API基础访问',
      '社区技术支持',
      '基础专家模式'
    ],
    usageStats: {
      projectsUsed: 23,
      storageUsed: '45.6GB',
      apiCallsThisMonth: 23456
    }
  },

  // 最近活动记录
  recentActivities: [
    {
      id: 1,
      type: 'deployment',
      title: '部署了新项目',
      description: '智能CRM系统已成功部署到生产环境',
      time: '2小时前',
      timestamp: '2025-07-11T12:30:00Z',
      icon: '/icons/账户管理-成功部署.svg',
      status: 'success'
    },
    {
      id: 2,
      type: 'mcp',
      title: '创建了自定义MCP',
      description: '新增了"微信支付"MCP扩展模块',
      time: '1天前',
      timestamp: '2025-07-10T15:20:00Z',
      icon: '/icons/账户管理-自定义MCP.svg',
      status: 'success'
    },
    {
      id: 3,
      type: 'report',
      title: '生成了数据报告',
      description: '用户行为分析报告已生成完成',
      time: '3天前',
      timestamp: '2025-07-08T09:15:00Z',
      icon: '/icons/账户管理-已创建项目.svg',
      status: 'completed'
    },
    {
      id: 4,
      type: 'project',
      title: '创建了新项目',
      description: '电商推荐系统项目创建成功',
      time: '5天前',
      timestamp: '2025-07-06T16:45:00Z',
      icon: '/icons/账户管理-已创建项目.svg',
      status: 'success'
    },
    {
      id: 5,
      type: 'usage',
      title: '使用时长达到新里程碑',
      description: '累计使用时长突破150小时',
      time: '1周前',
      timestamp: '2025-07-04T10:30:00Z',
      icon: '/icons/账户管理-使用时长.svg',
      status: 'milestone'
    }
  ],

  // 安全设置
  securitySettings: [
    {
      id: 'password',
      title: '登录密码',
      description: '上次修改：2024年6月15日',
      status: 'good',
      action: '修改密码',
      actionType: 'change',
      lastModified: '2024-06-15',
      strength: 'strong'
    },
    {
      id: 'twoFactor',
      title: '双重验证',
      description: '通过短信验证码保护账户安全',
      status: 'disabled',
      action: '启用',
      actionType: 'enable',
      enabled: false,
      methods: ['sms', 'email', 'authenticator']
    },
    {
      id: 'apiKey',
      title: 'API密钥',
      description: '用于第三方集成的访问密钥管理',
      status: 'active',
      action: '管理',
      actionType: 'manage',
      keysCount: 3,
      lastUsed: '2025-07-10'
    },
    {
      id: 'loginHistory',
      title: '登录历史',
      description: '查看最近的登录记录和异常登录',
      status: 'normal',
      action: '查看',
      actionType: 'view',
      recentLogins: 15,
      suspiciousLogins: 0
    }
  ],

  // 登录历史记录
  loginHistory: [
    {
      id: '1',
      timestamp: '2025-07-10 14:30:25',
      location: '北京市',
      device: 'Chrome on Windows',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: '2', 
      timestamp: '2025-07-10 09:15:42',
      location: '北京市',
      device: 'Edge on Windows',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2025-07-09 18:22:15',
      location: '上海市',
      device: 'Safari on iPhone',
      ip: '120.230.45.67',
      status: 'suspicious'
    },
    {
      id: '4',
      timestamp: '2025-07-09 16:45:30',
      location: '北京市',
      device: 'Chrome on Android',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: '5',
      timestamp: '2025-07-08 22:10:18',
      location: '深圳市',
      device: 'Chrome on Windows',
      ip: '183.45.67.89',
      status: 'failed'
    },
    {
      id: '6',
      timestamp: '2025-07-08 15:33:45',
      location: '广州市',
      device: 'Firefox on Linux',
      ip: '221.56.78.90',
      status: 'success'
    },
    {
      id: '7',
      timestamp: '2025-07-07 20:15:22',
      location: '杭州市',
      device: 'Chrome on Windows',
      ip: '172.18.56.89',
      status: 'success'
    },
    {
      id: '8',
      timestamp: '2025-07-07 11:28:17',
      location: '未知位置',
      device: 'Unknown Browser',
      ip: '58.42.123.45',
      status: 'suspicious'
    }
  ],

  // API密钥记录
  apiKeys: [
    {
      id: '1',
      name: '智造工厂API',
      description: '用于智造工厂系统集成',
      createdAt: '2024-06-15',
      lastUsed: '2025-07-10',
      status: 'active',
      permissions: ['read:projects', 'write:projects'],
      key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    {
      id: '2',
      name: '数据分析API',
      description: '用于数据分析和报表生成',
      createdAt: '2024-07-01',
      lastUsed: '2025-07-08',
      status: 'active',
      permissions: ['read:analytics'],
      key: 'sk-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
    },
    {
      id: '3',
      name: '测试API',
      description: '开发测试用',
      createdAt: '2024-07-05',
      lastUsed: '从未使用',
      status: 'inactive',
      permissions: ['read:user'],
      key: 'sk-zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
    }
  ],

  // 偏好设置
  preferences: {
    theme: 'light', // light, dark, auto
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    notifications: {
      email: true,
      sms: false,
      push: true,
      projectUpdates: true,
      systemAnnouncements: true,
      securityAlerts: true
    },
    dashboard: {
      showActivityFeed: true,
      showProjectStats: true,
      showQuickActions: true,
      defaultProjectView: 'grid' // grid, list
    }
  }
}

// 获取用户基本信息
export const getUserInfo = () => {
  return userData.userInfo
}

// 获取项目统计
export const getProjectStats = () => {
  return userData.projectStats
}

// 获取套餐信息
export const getUserSubscription = () => {
  return userData.userSubscription
}

// 获取最近活动
export const getRecentActivities = (limit = 5) => {
  return userData.recentActivities.slice(0, limit)
}

// 获取安全设置
export const getSecuritySettings = () => {
  return userData.securitySettings
}

// 获取登录历史
export const getLoginHistory = () => {
  return userData.loginHistory
}

// 获取API密钥列表
export const getApiKeys = () => {
  return userData.apiKeys
}

// 添加新的API密钥
export const addApiKey = (apiKeyData) => {
  const newApiKey = {
    id: Date.now().toString(),
    createdAt: new Date().toLocaleDateString('zh-CN'),
    lastUsed: '从未使用',
    status: 'active',
    key: 'sk-' + Math.random().toString(36).substr(2, 32),
    ...apiKeyData
  }
  userData.apiKeys.push(newApiKey)
  return newApiKey
}

// 删除API密钥
export const removeApiKey = (apiKeyId) => {
  const index = userData.apiKeys.findIndex(key => key.id === apiKeyId)
  if (index > -1) {
    userData.apiKeys.splice(index, 1)
    return true
  }
  return false
}

// 更新API密钥状态
export const updateApiKeyStatus = (apiKeyId, status) => {
  const apiKey = userData.apiKeys.find(key => key.id === apiKeyId)
  if (apiKey) {
    apiKey.status = status
    return apiKey
  }
  return null
}

// 添加登录记录
export const addLoginRecord = (loginData) => {
  const newRecord = {
    id: Date.now().toString(),
    timestamp: new Date().toLocaleString('zh-CN'),
    ...loginData
  }
  userData.loginHistory.unshift(newRecord)
  
  // 保持最多50条登录记录
  if (userData.loginHistory.length > 50) {
    userData.loginHistory = userData.loginHistory.slice(0, 50)
  }
  
  return newRecord
}

// 标记可疑登录
export const markSuspiciousLogin = (loginId, isSuspicious = true) => {
  const loginRecord = userData.loginHistory.find(record => record.id === loginId)
  if (loginRecord) {
    loginRecord.status = isSuspicious ? 'suspicious' : 'success'
    return loginRecord
  }
  return null
}

// 更新用户信息
export const updateUserInfo = (field, value) => {
  if (userData.userInfo.hasOwnProperty(field)) {
    userData.userInfo[field] = value
    return true
  }
  return false
}

// 更新偏好设置
export const updateUserPreferences = (preferences) => {
  userData.preferences = { ...userData.preferences, ...preferences }
  return userData.preferences
}

// 更新安全设置
export const updateSecuritySetting = (settingId, updates) => {
  const setting = userData.securitySettings.find(s => s.id === settingId)
  if (setting) {
    Object.assign(setting, updates)
    return setting
  }
  return null
}

// 切换双重验证状态
export const toggleTwoFactorAuth = (enabled, methods = []) => {
  const twoFactorSetting = userData.securitySettings.find(s => s.id === 'twoFactor')
  if (twoFactorSetting) {
    twoFactorSetting.enabled = enabled
    twoFactorSetting.status = enabled ? 'enabled' : 'disabled'
    twoFactorSetting.action = enabled ? '管理' : '启用'
    if (enabled && methods.length > 0) {
      twoFactorSetting.currentMethods = methods
      const methodNames = methods.map(m => getTwoFactorMethodName(m)).join('、')
      twoFactorSetting.description = `已启用${methodNames}验证`
    } else {
      twoFactorSetting.description = '通过短信验证码保护账户安全'
      delete twoFactorSetting.currentMethods
    }
    return twoFactorSetting
  }
  return null
}

// 获取双重验证方式名称
export const getTwoFactorMethodName = (method) => {
  const methods = {
    'sms': '短信',
    'email': '邮箱',
    'authenticator': '身份验证器应用'
  }
  return methods[method] || method
}

// 添加新活动记录
export const addActivity = (activity) => {
  const newActivity = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...activity
  }
  userData.recentActivities.unshift(newActivity)
  // 保持最多20条记录
  if (userData.recentActivities.length > 20) {
    userData.recentActivities = userData.recentActivities.slice(0, 20)
  }
  return newActivity
}

// 格式化时间显示
export const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInSeconds = Math.floor((now - time) / 1000)
  
  if (diffInSeconds < 60) {
    return '刚刚'
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟前`
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时前`
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}天前`
  } else {
    return time.toLocaleDateString('zh-CN')
  }
}

// 计算套餐使用率
export const calculateUsageRate = () => {
  const subscription = userData.userSubscription
  const stats = userData.projectStats
  
  return {
    projectUsage: Math.round((stats.total / subscription.projectQuota) * 100),
    storageUsage: Math.round((parseFloat(subscription.usageStats.storageUsed) / 100) * 100), // 假设100GB总容量
    apiUsage: Math.round((subscription.usageStats.apiCallsThisMonth / 100000) * 100) // 假设10万次限制
  }
}
