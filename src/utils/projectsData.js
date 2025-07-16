// 项目数据共享模块
export const projectsData = [
  {
    id: 1,
    name: '行业风险监测平台',
    description: '自动收集全球舆情数据，通过聚类分析识别高风险国家/企业，生成可视化报告。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2024-05-15',
    updateTime: '2024-06-20',
    // 零代码开发平台项目属性
    version: '1.2.0',
    framework: 'Vue 3',
    database: 'MySQL',
    deployUrl: 'https://risk-monitor.example.com',
    gitRepo: 'https://github.com/smartfactory/risk-monitor',
    teamMembers: ['张三', '李四', '王五'],
    developmentTime: '45天',
    lastDeployTime: '2024-06-20 14:30:00',
    tags: ['数据分析', '风险控制', '可视化'],
    complexity: '高',
    apiCount: 12,
    pageCount: 8,
    componentCount: 25,
    usedComponents: ['数据表格', '图表组件', '筛选器', '导出功能'],
    features: ['舆情数据采集', '风险分析算法', '可视化报告', '实时监控'],
    performance: {
      responseTime: '200ms',
      uptime: '99.9%',
      dailyVisits: 1200
    }
  },
  {
    id: 2,
    name: '客户分群洞察工具',
    description: '基于用户行为数据，通过联邦学习和隐私计算技术，自动分群客户并生成画像报告。',
    category: 'WEB智造',
    status: 'developing',
    createTime: '2024-05-20',
    updateTime: '2024-06-25',
    version: '0.8.0',
    framework: 'React',
    database: 'PostgreSQL',
    deployUrl: '',
    gitRepo: 'https://github.com/smartfactory/customer-insights',
    teamMembers: ['李四', '王五', '赵六'],
    developmentTime: '35天',
    lastDeployTime: '',
    tags: ['机器学习', '用户画像', '数据挖掘'],
    complexity: '高',
    apiCount: 15,
    pageCount: 6,
    componentCount: 18,
    usedComponents: ['数据可视化', '分群算法', '用户画像', '报告生成'],
    features: ['行为数据采集', '联邦学习算法', '自动分群', '画像报告'],
    performance: {
      responseTime: '150ms',
      uptime: '98.5%',
      dailyVisits: 800
    }
  },
  {
    id: 3,
    name: '沃找茬h5页面',
    description: '生成手机端沃找茬app的H5页面，支持设备适配和交互功能。',
    category: '移动端智造',
    status: 'deployed',
    createTime: '2024-04-10',
    updateTime: '2024-06-15',
    version: '2.1.0',
    framework: 'Vue 3 + Vant',
    database: 'Redis',
    deployUrl: 'https://m.wochacha.example.com',
    gitRepo: 'https://github.com/smartfactory/wochacha-h5',
    teamMembers: ['王五', '赵六'],
    developmentTime: '20天',
    lastDeployTime: '2024-06-15 10:15:00',
    tags: ['移动端', 'H5', '游戏'],
    complexity: '中',
    apiCount: 8,
    pageCount: 5,
    componentCount: 12,
    usedComponents: ['移动适配', '触摸交互', '游戏引擎', '积分系统'],
    features: ['找茬游戏', '积分奖励', '排行榜', '社交分享'],
    performance: {
      responseTime: '100ms',
      uptime: '99.8%',
      dailyVisits: 5000
    }
  },
  {
    id: 4,
    name: '沃易贷h5页面',
    description: '生成手机端沃易贷app的H5页面，支持设备适配和交互功能。',
    category: '移动端智造',
    status: 'developing',
    createTime: '2024-05-05',
    updateTime: '2024-06-18',
    version: '1.5.0',
    framework: 'Vue 3 + Vant',
    database: 'MySQL',
    deployUrl: '',
    gitRepo: 'https://github.com/smartfactory/woyidai-h5',
    teamMembers: ['赵六', '钱七'],
    developmentTime: '25天',
    lastDeployTime: '',
    tags: ['移动端', 'H5', '金融'],
    complexity: '中',
    apiCount: 10,
    pageCount: 6,
    componentCount: 15,
    usedComponents: ['移动适配', '表单验证', '支付组件', '身份认证'],
    features: ['在线申请', '实时审批', '电子签约', '进度查询'],
    performance: {
      responseTime: '120ms',
      uptime: '99.2%',
      dailyVisits: 3200
    }
  },
  {
    id: 5,
    name: '客服工作台小程序',
    description: '生成小程序，实现任务分配、话术管理和黑名单功能，提升客服响应效率。',
    category: '流程自动化智造',
    status: 'deployed',
    createTime: '2024-04-25',
    updateTime: '2024-06-10',
    version: '2.3.0',
    framework: '微信小程序',
    database: 'MongoDB',
    deployUrl: 'https://miniapp.customer-service.com',
    gitRepo: 'https://github.com/smartfactory/customer-service',
    teamMembers: ['李四', '王五', '赵六'],
    developmentTime: '30天',
    lastDeployTime: '2024-06-10 16:20:00',
    tags: ['小程序', '客服', '自动化'],
    complexity: '高',
    apiCount: 18,
    pageCount: 12,
    componentCount: 32,
    usedComponents: ['任务管理', '智能话术', '黑名单系统', '工单流转'],
    features: ['智能分配', '话术推荐', '黑名单管理', '绩效统计'],
    performance: {
      responseTime: '180ms',
      uptime: '99.7%',
      dailyVisits: 2800
    }
  },
  {
    id: 6,
    name: '商户审核助手小程序',
    description: '通过OCR和决策引擎原子能力，自动审核商户资质，生成审核报告。',
    category: '流程自动化智造',
    status: 'pending',
    createTime: '2024-05-30',
    updateTime: '2024-06-28',
    version: '1.0.0',
    framework: '微信小程序',
    database: 'PostgreSQL',
    deployUrl: '',
    gitRepo: 'https://github.com/smartfactory/merchant-audit',
    teamMembers: ['张三', '李四'],
    developmentTime: '28天',
    lastDeployTime: '',
    tags: ['小程序', 'OCR', '审核'],
    complexity: '高',
    apiCount: 14,
    pageCount: 8,
    componentCount: 20,
    usedComponents: ['OCR识别', '决策引擎', '审核流程', '报告生成'],
    features: ['证件识别', '智能审核', '风险评估', '结果通知'],
    performance: {
      responseTime: '300ms',
      uptime: '98.0%',
      dailyVisits: 500
    }
  },
  {
    id: 7,
    name: '智能CRM系统',
    description: '开发CRM系统前端，初步设计整合客户画像、行为分析和营销自动化等功能。',
    category: 'WEB智造',
    status: 'developing',
    createTime: '2024-03-15',
    updateTime: '2024-06-22',
    version: '0.9.0',
    framework: 'React + Ant Design',
    database: 'MySQL',
    deployUrl: '',
    gitRepo: 'https://github.com/smartfactory/intelligent-crm',
    teamMembers: ['王五', '赵六', '钱七', '孙八'],
    developmentTime: '98天',
    lastDeployTime: '',
    tags: ['CRM', '客户管理', '营销自动化'],
    complexity: '高',
    apiCount: 35,
    pageCount: 25,
    componentCount: 68,
    usedComponents: ['客户画像', '行为分析', '营销引擎', '数据看板'],
    features: ['客户管理', '销售跟进', '营销活动', '数据分析'],
    performance: {
      responseTime: '250ms',
      uptime: '99.1%',
      dailyVisits: 1800
    }
  },
  {
    id: 8,
    name: '金融风控平台',
    description: '构建完整平台，集成决策引擎、联邦学习模型和实时监控，用于信贷风险评估。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2024-03-20',
    updateTime: '2024-06-12'
  },
  {
    id: 9,
    name: '数据分析dashboard',
    description: '实时数据可视化分析平台，支持多维度数据钻取和自定义报表生成。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2024-02-10',
    updateTime: '2024-05-15'
  },
  {
    id: 10,
    name: '移动端用户画像系统',
    description: '基于移动端行为数据构建用户画像，支持在移动端对用户精准推送和个性化推荐。',
    category: '移动端智造',
    status: 'deployed',
    createTime: '2024-01-20',
    updateTime: '2024-04-30'
  },
  {
    id: 11,
    name: '供应链管理平台',
    description: '智能供应链管理系统，实现供应商管理、库存优化和需求预测。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2024-01-15',
    updateTime: '2024-05-20'
  },
  {
    id: 12,
    name: '营销自动化工具',
    description: '多渠道营销自动化平台，支持邮件营销、社交媒体推广和用户分群。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2023-12-05',
    updateTime: '2024-04-18'
  },
  {
    id: 13,
    name: '智能客服chatbot',
    description: '基于NLP技术的智能客服机器人，支持多轮对话和知识库问答。',
    category: '流程自动化智造',
    status: 'deployed',
    createTime: '2023-11-20',
    updateTime: '2024-03-25'
  },
  {
    id: 14,
    name: '项目管理协作平台',
    description: '团队协作和项目管理工具，支持任务分配、进度跟踪和文档协作。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2023-11-10',
    updateTime: '2024-03-15'
  },
  {
    id: 15,
    name: '电商数据分析系统',
    description: '电商平台数据分析工具，提供销售分析、用户行为分析和商品推荐。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2023-10-25',
    updateTime: '2024-02-28'
  },
  {
    id: 16,
    name: '沃享赢活动页面',
    description: '生成手机端沃享赢活动页面，支持设备适配和交互功能。',
    category: '移动端智造',
    status: 'deployed',
    createTime: '2023-10-15',
    updateTime: '2024-02-20'
  },
  {
    id: 17,
    name: '内容管理系统',
    description: '企业级内容管理平台，支持多媒体内容管理、版本控制和权限管理。',
    category: 'WEB智造',
    status: 'deployed',
    createTime: '2023-09-30',
    updateTime: '2024-01-25'
  },
  {
    id: 18,
    name: '智能推荐引擎',
    description: '基于机器学习的个性化推荐系统，支持协同过滤和内容推荐。',
    category: '移动端智造',
    status: 'deployed',
    createTime: '2023-09-20',
    updateTime: '2024-01-15'
  },
  {
    id: 19,
    name: '实时通讯系统',
    description: '企业级即时通讯平台，支持文字、语音、视频通话和文件传输。',
    category: '流程自动化智造',
    status: 'developing',
    createTime: '2024-06-01',
    updateTime: '2024-06-30'
  },
  {
    id: 20,
    name: '区块链溯源平台',
    description: '基于区块链技术的产品溯源系统，确保产品质量和供应链透明度。',
    category: 'WEB智造',
    status: 'developing',
    createTime: '2024-05-25',
    updateTime: '2024-06-28'
  },
  {
    id: 21,
    name: '人工智能训练平台',
    description: 'AI模型训练和部署平台，支持深度学习模型的训练、调优和部署。',
    category: '移动端智造',
    status: 'developing',
    createTime: '2024-05-10',
    updateTime: '2024-06-25'
  },
  {
    id: 22,
    name: '物联网设备管理',
    description: 'IoT设备统一管理平台，支持设备监控、远程控制和数据采集。',
    category: 'WEB智造',
    status: 'developing',
    createTime: '2024-04-20',
    updateTime: '2024-06-20'
  },
  {
    id: 23,
    name: '虚拟现实展示平台',
    description: 'VR/AR内容展示平台，支持3D模型展示、虚拟漫游和交互体验。',
    category: '移动端智造',
    status: 'developing',
    createTime: '2024-04-15',
    updateTime: '2024-06-18'
  },
  {
    id: 24,
    name: '云计算资源管理',
    description: '云资源自动化管理系统，支持资源分配、监控和成本优化。',
    category: 'WEB智造',
    status: 'developing',
    createTime: '2024-04-05',
    updateTime: '2024-06-15'
  }
]

// 获取所有项目
export function getAllProjects() {
  return projectsData
}

// 根据ID获取项目
export function getProjectById(id) {
  return projectsData.find(project => project.id === parseInt(id))
}

// 根据类别获取项目
export function getProjectsByCategory(category) {
  return projectsData.filter(project => project.category === category)
}

// 获取项目统计数据
export function getProjectStats() {
  return {
    total: projectsData.length,
    developing: projectsData.filter(p => p.status === 'developing').length,
    deployed: projectsData.filter(p => p.status === 'deployed').length,
    pending: projectsData.filter(p => p.status === 'pending').length
  }
}

// 获取项目类别
export function getProjectCategories() {
  return ['WEB智造', '移动端智造', '流程自动化智造']
}

// 格式化日期
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 获取状态文本
export function getStatusText(status) {
  const statusMap = {
    'developing': '开发中',
    'deployed': '已部署',
    'pending': '待发布'
  }
  return statusMap[status] || status
}
