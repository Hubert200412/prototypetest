// 网站通用数据配置
// 用于分离页面数据和业务逻辑，方便后端连接

// 网站基本信息
export const siteConfig = {
  name: '智造工厂',
  description: '智能制造综合平台',
  version: '2.5.0',
  company: '智造工厂科技有限公司',
  logo: '/icons/智造工厂-logo.svg', // 需要用户添加
  contact: {
    email: 'contact@zhizao.com',
    phone: '400-888-9999',
    address: '北京市海淀区中关村科技园'
  },
  social: {
    weibo: 'https://weibo.com/zhizao',
    wechat: 'zhizao_factory',
    qq: '800888999'
  }
}

// 用户数据结构
export const userConfig = {
  defaultUser: {
    id: 1,
    username: 'Sonetto_2004',
    email: 'sonetto@example.com',
    avatar: '/icons/用户头像.svg', // 需要用户添加
    role: 'admin',
    joinDate: '2024-01-15',
    lastLogin: '2025-07-11',
    profile: {
      realName: '用户姓名',
      company: '示例公司',
      position: '产品经理',
      phone: '138****8888',
      location: '北京市'
    },
    preferences: {
      theme: 'light',
      language: 'zh-CN',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  }
}

// 导航菜单配置
export const navigationConfig = {
  mainNavigation: [
    {
      id: 'home',
      name: '首页',
      path: '/',
      icon: 'mdi-home',
      description: '平台首页和概览',
      showInNav: true
    },
    {
      id: 'docs',
      name: '使用文档',
      path: '/docs',
      icon: 'mdi-file-document',
      description: '平台使用文档和帮助',
      showInNav: true
    },
    {
      id: 'network',
      name: '协作网络',
      path: '/network',
      icon: 'mdi-network',
      description: '团队协作和项目管理',
      showInNav: true
    },
    {
      id: 'news',
      name: '企业动态',
      path: '/news',
      icon: 'mdi-newspaper',
      description: '公司新闻和行业资讯',
      showInNav: true
    },
    {
      id: 'plans',
      name: '套餐选择',
      path: '/plans',
      icon: 'mdi-package-variant',
      description: '服务套餐和价格',
      showInNav: true
    },
    {
      id: 'profile',
      name: '账户管理',
      path: '/profile',
      icon: 'mdi-account-cog',
      description: '个人账户设置',
      showInNav: true
    },
    {
      id: 'projects',
      name: '项目管理',
      path: '/projects',
      icon: 'mdi-folder-multiple',
      description: '项目列表和管理',
      showInNav: false
    },
    {
      id: 'chat',
      name: '智能助手',
      path: '/chat',
      icon: 'mdi-robot',
      description: 'AI智能对话助手',
      showInNav: false
    }
  ],
  
  quickActions: [
    {
      id: 'create-project',
      name: '创建项目',
      path: '/projects/create',
      icon: 'mdi-plus-circle',
      color: 'primary',
      description: '快速创建新项目'
    },
    {
      id: 'upload-file',
      name: '上传文件',
      action: 'upload',
      icon: 'mdi-upload',
      color: 'green',
      description: '上传项目文件'
    },
    {
      id: 'ai-chat',
      name: 'AI助手',
      path: '/chat',
      icon: 'mdi-robot',
      color: 'purple',
      description: '打开AI对话助手'
    }
  ]
}

// 首页数据配置
export const homePageConfig = {
  hero: {
    title: '智造工厂',
    subtitle: '智能制造综合平台',
    description: '提供一站式智能制造解决方案，助力企业数字化转型',
    backgroundImage: '/images/首页-背景.jpg', // 需要用户添加
    ctaButtons: [
      {
        text: '开始体验',
        action: 'navigate',
        target: '/projects/create',
        variant: 'elevated',
        color: 'primary'
      },
      {
        text: '了解更多',
        action: 'navigate',
        target: '/docs',
        variant: 'outlined',
        color: 'primary'
      }
    ]
  },
  
  features: [
    {
      id: 'web-manufacturing',
      title: 'WEB端智造',
      description: '基于Web技术的智能制造解决方案',
      icon: '/icons/首页-WEB端.svg',
      details: [
        '响应式Web应用开发',
        '实时数据监控面板',
        '可视化工艺流程管理',
        '多终端设备兼容'
      ]
    },
    {
      id: 'mobile-manufacturing',
      title: '移动端智造',
      description: '移动设备上的智能制造管理',
      icon: '/icons/首页-移动端.svg',
      details: [
        '移动端原生应用',
        '离线数据同步',
        '扫码快速操作',
        '移动设备优化'
      ]
    },
    {
      id: 'automation',
      title: '流程自动化智造',
      description: '智能化流程管理和自动化控制',
      icon: '/icons/首页-自动化.svg',
      details: [
        '工作流程自动化',
        '智能决策支持',
        '异常自动预警',
        '效率优化建议'
      ]
    },
    {
      id: 'file-upload',
      title: '文件上传智造',
      description: '安全可靠的文件管理和处理',
      icon: '/icons/首页-文件上传.svg',
      details: [
        '大文件分片上传',
        '多格式文件支持',
        '版本控制管理',
        '安全存储加密'
      ]
    }
  ],
  
  statistics: [
    {
      label: '注册用户',
      value: '100,000+',
      icon: 'mdi-account-group',
      color: 'blue'
    },
    {
      label: '成功项目',
      value: '50,000+',
      icon: 'mdi-check-circle',
      color: 'green'
    },
    {
      label: '合作企业',
      value: '5,000+',
      icon: 'mdi-domain',
      color: 'orange'
    },
    {
      label: '覆盖城市',
      value: '300+',
      icon: 'mdi-map-marker',
      color: 'red'
    }
  ]
}

// API端点配置
export const apiConfig = {
  baseURL: process.env.VUE_APP_API_URL || 'https://api.zhizao.com',
  timeout: 10000,
  endpoints: {
    // 用户相关
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      register: '/auth/register',
      refresh: '/auth/refresh',
      profile: '/auth/profile'
    },
    
    // 项目相关
    projects: {
      list: '/projects',
      create: '/projects',
      detail: '/projects/:id',
      update: '/projects/:id',
      delete: '/projects/:id',
      deploy: '/projects/:id/deploy'
    },
    
    // 新闻相关
    news: {
      list: '/news',
      detail: '/news/:id',
      categories: '/news/categories',
      search: '/news/search'
    },
    
    // 协作网络
    network: {
      members: '/network/members',
      permissions: '/network/permissions',
      messages: '/network/messages',
      documents: '/network/documents'
    },
    
    // 套餐相关
    plans: {
      list: '/plans',
      detail: '/plans/:id',
      subscribe: '/plans/:id/subscribe',
      unsubscribe: '/plans/:id/unsubscribe'
    },
    
    // 文件上传
    upload: {
      single: '/upload/single',
      multiple: '/upload/multiple',
      chunk: '/upload/chunk'
    }
  }
}

// 主题配置
export const themeConfig = {
  light: {
    primary: '#1976d2',
    secondary: '#424242',
    accent: '#82b1ff',
    error: '#ff5252',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107',
    background: '#ffffff',
    surface: '#ffffff'
  },
  dark: {
    primary: '#2196f3',
    secondary: '#616161',
    accent: '#ff4081',
    error: '#ff5252',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107',
    background: '#121212',
    surface: '#1e1e1e'
  }
}

// 错误消息配置
export const errorMessages = {
  network: '网络连接异常，请检查网络设置',
  timeout: '请求超时，请稍后重试',
  serverError: '服务器异常，请稍后重试',
  unauthorized: '登录已过期，请重新登录',
  forbidden: '权限不足，无法执行此操作',
  notFound: '请求的资源不存在',
  validation: '输入数据格式不正确',
  uploadFailed: '文件上传失败，请重试',
  unknown: '未知错误，请联系管理员'
}

// 成功消息配置
export const successMessages = {
  login: '登录成功',
  logout: '退出成功',
  register: '注册成功',
  projectCreated: '项目创建成功',
  projectUpdated: '项目更新成功',
  projectDeleted: '项目删除成功',
  projectDeployed: '项目部署成功',
  fileUploaded: '文件上传成功',
  settingsSaved: '设置保存成功',
  memberAdded: '成员添加成功',
  memberRemoved: '成员移除成功'
}
