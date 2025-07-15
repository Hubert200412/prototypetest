// 协作网络数据模块
// 包含团队成员、权限配置、消息和文档数据

// 角色定义
export const roles = {
  admin: {
    id: 'admin',
    name: '管理员',
    description: '拥有所有权限，可管理团队成员、项目和系统设置',
    color: '#e91e63'
  },
  developer: {
    id: 'developer',
    name: '开发者',
    description: '负责项目开发，拥有代码访问权限和部署权限',
    color: '#2196f3'
  },
  tester: {
    id: 'tester',
    name: '测试员',
    description: '负责测试项目功能，提交bug报告和改进建议',
    color: '#4caf50'
  },
  viewer: {
    id: 'viewer',
    name: '观察者',
    description: '只有查看权限，无法编辑项目内容',
    color: '#9e9e9e'
  }
}

// 权限类型
export const permissionTypes = {
  project_management: {
    id: 'project_management',
    name: '项目管理权限',
    description: '创建、编辑和删除项目的权限'
  },
  member_management: {
    id: 'member_management',
    name: '成员管理权限',
    description: '添加、移除团队成员和分配角色的权限'
  },
  code_access: {
    id: 'code_access',
    name: '代码访问权限',
    description: '查看和修改代码的权限'
  },
  deployment: {
    id: 'deployment',
    name: '部署权限',
    description: '部署项目到测试或生产环境的权限'
  },
  settings: {
    id: 'settings',
    name: '设置权限',
    description: '修改项目和系统设置的权限'
  },
  document_edit: {
    id: 'document_edit',
    name: '文档编辑权限',
    description: '创建和编辑项目文档的权限'
  }
}

// 角色默认权限配置
export const rolePermissions = {
  admin: [
    'project_management',
    'member_management',
    'code_access',
    'deployment',
    'settings',
    'document_edit'
  ],
  developer: [
    'code_access',
    'deployment',
    'document_edit'
  ],
  tester: [
    'code_access',
    'document_edit'
  ],
  viewer: []
}

// 模拟团队成员数据
export const teamMembers = [
  {
    id: 1,
    name: '李明',
    email: 'liming@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'admin',
    joinTime: '2024-01-15',
    lastActive: '2024-07-08',
    projects: [1, 2, 3, 5]
  },
  {
    id: 2,
    name: '张华',
    email: 'zhanghua@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'developer',
    joinTime: '2024-02-20',
    lastActive: '2024-07-09',
    projects: [1, 3, 4]
  },
  {
    id: 3,
    name: '王芳',
    email: 'wangfang@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'developer',
    joinTime: '2024-03-10',
    lastActive: '2024-07-10',
    projects: [2, 5]
  },
  {
    id: 4,
    name: '刘静',
    email: 'liujing@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'tester',
    joinTime: '2024-04-05',
    lastActive: '2024-07-09',
    projects: [1, 2, 3]
  },
  {
    id: 5,
    name: '陈强',
    email: 'chenqiang@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    role: 'tester',
    joinTime: '2024-05-12',
    lastActive: '2024-07-08',
    projects: [4, 5]
  },
  {
    id: 6,
    name: '赵燕',
    email: 'zhaoyan@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    role: 'viewer',
    joinTime: '2024-06-18',
    lastActive: '2024-07-07',
    projects: [1]
  }
]

// 操作日志
export const activityLogs = [
  {
    id: 1,
    userId: 1,
    action: '创建项目',
    target: '行业风险监测平台',
    timestamp: '2024-05-15 09:30:22',
    details: '创建了新项目"行业风险监测平台"，项目ID为1'
  },
  {
    id: 2,
    userId: 1,
    action: '添加成员',
    target: '张华',
    timestamp: '2024-05-15 10:15:45',
    details: '将张华添加到项目"行业风险监测平台"，角色为开发者'
  },
  {
    id: 3,
    userId: 2,
    action: '提交代码',
    target: '行业风险监测平台',
    timestamp: '2024-05-16 14:20:10',
    details: '提交了10个文件更改，添加了数据分析模块'
  },
  {
    id: 4,
    userId: 4,
    action: '创建测试报告',
    target: '行业风险监测平台',
    timestamp: '2024-05-18 11:05:33',
    details: '创建了第一轮功能测试报告，发现5个问题'
  },
  {
    id: 5,
    userId: 2,
    action: '修复缺陷',
    target: '行业风险监测平台',
    timestamp: '2024-05-20 16:30:45',
    details: '修复了4个功能缺陷，1个界面问题待解决'
  },
  {
    id: 6,
    userId: 1,
    action: '部署项目',
    target: '行业风险监测平台',
    timestamp: '2024-05-25 09:00:00',
    details: '将项目部署到测试环境，版本号v0.1.0'
  },
  {
    id: 7,
    userId: 3,
    action: '更新文档',
    target: '客户分群洞察工具',
    timestamp: '2024-06-02 15:45:22',
    details: '更新了API文档和用户手册'
  },
  {
    id: 8,
    userId: 5,
    action: '提交测试用例',
    target: '客户分群洞察工具',
    timestamp: '2024-06-05 10:30:15',
    details: '添加了50个自动化测试用例'
  },
  {
    id: 9,
    userId: 1,
    action: '更改权限',
    target: '赵燕',
    timestamp: '2024-06-18 11:20:30',
    details: '将赵燕添加到项目"行业风险监测平台"，角色为观察者'
  },
  {
    id: 10,
    userId: 2,
    action: '合并代码',
    target: '行业风险监测平台',
    timestamp: '2024-07-01 14:15:50',
    details: '将feature/dashboard分支合并到主分支'
  }
]

// 讨论消息
export const messages = [
  {
    id: 1,
    projectId: 1,
    threadId: 1,
    userId: 1,
    content: '大家好，今天我们开始"行业风险监测平台"的开发，请各位按照计划进行。',
    timestamp: '2024-05-15 09:45:00',
    attachments: []
  },
  {
    id: 2,
    projectId: 1,
    threadId: 1,
    userId: 2,
    content: '好的，我已经准备好了开发环境，今天会先完成数据模型的设计。',
    timestamp: '2024-05-15 10:00:15',
    attachments: []
  },
  {
    id: 3,
    projectId: 1,
    threadId: 1,
    userId: 4,
    content: '我已经创建了测试计划，会根据需求文档准备测试用例。',
    timestamp: '2024-05-15 10:15:30',
    attachments: []
  },
  {
    id: 4,
    projectId: 1,
    threadId: 2,
    userId: 2,
    content: '数据模型设计完成，请查看附件，有问题请在下面评论。',
    timestamp: '2024-05-16 14:30:00',
    attachments: [
      {
        id: 1,
        name: '数据模型设计.pdf',
        size: '2.5MB',
        url: '#'
      }
    ]
  },
  {
    id: 5,
    projectId: 1,
    threadId: 2,
    userId: 1,
    content: '数据模型看起来不错，但是风险指标部分需要增加更多维度，我已经在文档中标注了具体需求。',
    timestamp: '2024-05-16 15:20:45',
    attachments: []
  },
  {
    id: 6,
    projectId: 2,
    threadId: 3,
    userId: 3,
    content: '客户分群洞察工具的原型已经完成，请大家查看并提供反馈。',
    timestamp: '2024-05-20 09:10:15',
    attachments: [
      {
        id: 2,
        name: '客户分群原型.fig',
        size: '15MB',
        url: '#'
      }
    ]
  }
]

// 文档数据
export const documents = [
  {
    id: 1,
    projectId: 1,
    title: '行业风险监测平台需求文档',
    type: 'requirement',
    createdBy: 1,
    createdAt: '2024-05-15 09:00:00',
    updatedBy: 1,
    updatedAt: '2024-05-15 09:00:00',
    status: 'approved',
    content: '# 行业风险监测平台需求文档\n\n## 1. 项目概述\n本项目旨在开发一个行业风险监测平台，自动收集全球舆情数据...',
    collaborators: [1, 2, 4]
  },
  {
    id: 2,
    projectId: 1,
    title: '行业风险监测平台技术方案',
    type: 'technical',
    createdBy: 2,
    createdAt: '2024-05-16 11:30:00',
    updatedBy: 2,
    updatedAt: '2024-05-17 15:45:00',
    status: 'draft',
    content: '# 行业风险监测平台技术方案\n\n## 1. 架构设计\n系统采用前后端分离架构，前端使用Vue.js，后端使用Node.js...',
    collaborators: [1, 2]
  },
  {
    id: 3,
    projectId: 1,
    title: '行业风险监测平台测试计划',
    type: 'testing',
    createdBy: 4,
    createdAt: '2024-05-17 10:00:00',
    updatedBy: 4,
    updatedAt: '2024-05-18 09:30:00',
    status: 'approved',
    content: '# 行业风险监测平台测试计划\n\n## 1. 测试范围\n本测试计划涵盖行业风险监测平台的功能测试、性能测试和安全测试...',
    collaborators: [1, 4, 5]
  },
  {
    id: 4,
    projectId: 2,
    title: '客户分群洞察工具需求文档',
    type: 'requirement',
    createdBy: 1,
    createdAt: '2024-05-19 14:00:00',
    updatedBy: 3,
    updatedAt: '2024-05-20 11:15:00',
    status: 'approved',
    content: '# 客户分群洞察工具需求文档\n\n## 1. 项目概述\n基于用户行为数据，通过联邦学习和隐私计算技术，自动分群客户并生成画像报告...',
    collaborators: [1, 3, 5]
  },
  {
    id: 5,
    projectId: 2,
    title: '客户分群洞察工具API文档',
    type: 'api',
    createdBy: 3,
    createdAt: '2024-06-01 09:45:00',
    updatedBy: 3,
    updatedAt: '2024-06-02 16:30:00',
    status: 'published',
    content: '# 客户分群洞察工具API文档\n\n## 1. 接口概述\n本文档描述客户分群洞察工具对外提供的API接口...',
    collaborators: [2, 3]
  }
]

// 获取团队成员
export function getTeamMembers() {
  return teamMembers
}

// 获取成员详情
export function getTeamMemberById(id) {
  return teamMembers.find(member => member.id === id)
}

// 获取角色信息
export function getRoleById(roleId) {
  return roles[roleId.toUpperCase()]
}

// 获取角色权限
export function getRolePermissions(roleId) {
  return rolePermissions[roleId] || []
}

// 判断角色是否有特定权限
export function hasPermission(roleId, permissionId) {
  const permissions = getRolePermissions(roleId)
  return permissions.includes(permissionId)
}

// 获取所有操作日志
export function getAllActivityLogs() {
  return activityLogs
}

// 获取特定用户的操作日志
export function getUserActivityLogs(userId) {
  return activityLogs.filter(log => log.userId === userId)
}

// 获取特定项目的文档
export function getProjectDocuments(projectId) {
  return documents.filter(doc => doc.projectId === projectId)
}

// 获取讨论消息
export function getProjectMessages(projectId) {
  return messages.filter(msg => msg.projectId === projectId)
}

// 获取特定讨论线程的消息
export function getThreadMessages(threadId) {
  return messages.filter(msg => msg.threadId === threadId)
}

// 获取权限名称
export function getPermissionName(permissionId) {
  return permissionTypes[permissionId]?.name || '未知权限'
}

// 检查用户是否有特定权限
export function userHasPermission(userId, permissionId) {
  const member = teamMembers.find(m => m.id === userId)
  if (!member) return false
  
  const userPermissions = getRolePermissions(member.role)
  return userPermissions.includes(permissionId)
}
