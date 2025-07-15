<template>
  <v-app>
    <!-- 页面头部 -->
    <v-app-bar 
      color="primary" 
      dark 
      flat
      height="120"
      class="network-header"
    >
      <v-container>
        <v-row align="center" no-gutters>
          <v-col>
            <div class="header-content">
              <h1 class="text-h3 font-weight-bold mb-2">协作网络</h1>
              <p class="text-h6 font-weight-light opacity-80">管理团队成员，提高协作效率</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <!-- 功能导航 -->
        <v-card class="mb-6" elevation="2">
          <v-tabs 
            v-model="activeTab" 
            color="primary"
            bg-color="white"
            show-arrows
          >
            <v-tab 
              v-for="tab in tabs" 
              :key="tab.id"
              :value="tab.id"
              class="text-h6"
            >
              <v-icon :icon="tab.icon" class="mr-2"></v-icon>
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </v-card>

        <!-- 标签页内容 -->
        <v-window v-model="activeTab">
          <!-- 权限管理模块 -->
          <v-window-item value="permissions">
            <v-row>
              <!-- 角色管理 -->
              <v-col cols="12" lg="8">
                <v-card class="mb-6" elevation="2">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <div>
                      <h3 class="text-h5">角色与权限管理</h3>
                      <p class="text-body-2 text-medium-emphasis mt-1">管理团队中的角色和对应权限</p>
                    </div>
                    <v-btn 
                      color="primary" 
                      variant="elevated"
                      @click="showInviteModal"
                      prepend-icon="mdi-account-plus"
                    >
                      邀请成员
                    </v-btn>
                  </v-card-title>
                  
                  <v-card-text>
                    <v-row>
                      <v-col 
                        v-for="(role, roleId) in roles" 
                        :key="roleId"
                        cols="12" md="6" lg="4"
                      >
                        <v-card 
                          class="role-card h-100" 
                          variant="outlined"
                          :style="{ borderColor: role.color }"
                        >
                          <v-card-title class="d-flex justify-space-between align-center">
                            <span class="text-h6">{{ role.name }}</span>
                            <v-btn 
                              icon="mdi-pencil" 
                              size="small" 
                              variant="text"
                              @click="editRole(roleId)"
                            ></v-btn>
                          </v-card-title>
                          
                          <v-card-text>
                            <p class="text-body-2 mb-3">{{ role.description }}</p>
                            <div class="permission-chips">
                              <v-chip
                                v-for="permId in getRolePermissions(roleId)"
                                :key="permId"
                                size="small"
                                color="primary"
                                variant="outlined"
                                class="ma-1"
                              >
                                {{ getPermissionName(permId) }}
                              </v-chip>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                
                <!-- 团队成员表格 -->
                <v-card elevation="2">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <h3 class="text-h5">团队成员</h3>
                    <v-text-field
                      v-model="memberSearch"
                      prepend-inner-icon="mdi-magnify"
                      label="搜索成员"
                      single-line
                      hide-details
                      variant="outlined"
                      density="compact"
                      style="max-width: 300px;"
                    ></v-text-field>
                  </v-card-title>
                  
                  <v-data-table
                    :headers="memberHeaders"
                    :items="filteredMembers"
                    :search="memberSearch"
                    class="elevation-0"
                  >
                    <template v-slot:item.name="{ item }">
                      <div class="d-flex align-center">
                        <v-avatar size="40" class="mr-3">
                          <v-img :src="item.avatar" :alt="item.name"></v-img>
                        </v-avatar>
                        <span class="font-weight-medium">{{ item.name }}</span>
                      </div>
                    </template>
                    
                    <template v-slot:item.role="{ item }">
                      <v-chip
                        :color="getRoleColor(item.role)"
                        size="small"
                        variant="flat"
                      >
                        {{ getRoleName(item.role) }}
                      </v-chip>
                    </template>
                    
                    <template v-slot:item.joinTime="{ item }">
                      {{ formatDate(item.joinTime) }}
                    </template>
                    
                    <template v-slot:item.lastActive="{ item }">
                      {{ formatDate(item.lastActive) }}
                    </template>
                    
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        icon="mdi-pencil"
                        size="small"
                        variant="text"
                        @click="editMember(item.id)"
                      ></v-btn>
                      <v-btn
                        icon="mdi-delete"
                        size="small"
                        variant="text"
                        color="error"
                        @click="removeMember(item.id)"
                      ></v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
              
              <!-- 操作日志 -->
              <v-col cols="12" lg="4">
                <v-card elevation="2" class="h-100">
                  <v-card-title>
                    <h3 class="text-h5">操作日志</h3>
                  </v-card-title>
                  
                  <v-card-text class="pa-0">
                    <v-list>
                      <v-list-item
                        v-for="log in activityLogs"
                        :key="log.id"
                        class="px-4"
                      >
                        <template v-slot:prepend>
                          <v-avatar size="32">
                            <v-img 
                              :src="getMemberById(log.userId).avatar" 
                              :alt="getMemberById(log.userId).name"
                            ></v-img>
                          </v-avatar>
                        </template>
                        
                        <v-list-item-title class="text-body-2">
                          <strong>{{ getMemberById(log.userId).name }}</strong>
                          {{ log.action }}
                          <strong>{{ log.target }}</strong>
                        </v-list-item-title>
                        
                        <v-list-item-subtitle class="text-caption">
                          {{ log.details }}
                        </v-list-item-subtitle>
                        
                        <template v-slot:append>
                          <span class="text-caption text-medium-emphasis">
                            {{ formatDateTime(log.timestamp) }}
                          </span>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- 沟通工具模块 -->
          <v-window-item value="communication">
            <v-row class="fill-height">
              <!-- 讨论列表侧边栏 -->
              <v-col cols="12" md="4" lg="3">
                <v-card elevation="2" class="h-100">
                  <v-card-title class="d-flex justify-space-between align-center">
                    <h3 class="text-h6">项目讨论</h3>
                    <v-btn
                      color="primary"
                      size="small"
                      variant="elevated"
                      @click="createNewThread"
                      prepend-icon="mdi-plus"
                    >
                      新建
                    </v-btn>
                  </v-card-title>
                  
                  <v-divider></v-divider>
                  
                  <v-list class="pa-0">
                    <v-list-item
                      v-for="thread in discussionThreads"
                      :key="thread.id"
                      :active="activeThread === thread.id"
                      @click="selectThread(thread.id)"
                      class="thread-item"
                    >
                      <v-list-item-title class="text-body-2 font-weight-medium">
                        {{ thread.title }}
                      </v-list-item-title>
                      
                      <v-list-item-subtitle class="d-flex justify-space-between align-center">
                        <v-chip size="x-small" variant="outlined">
                          {{ getProjectName(thread.projectId) }}
                        </v-chip>
                        <span class="text-caption">
                          {{ formatDate(thread.updatedAt) }}
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              
              <!-- 聊天区域 -->
              <v-col cols="12" md="8" lg="9">
                <v-card elevation="2" class="h-100 d-flex flex-column">
                  <!-- 聊天头部 -->
                  <v-card-title v-if="activeThread" class="d-flex justify-space-between align-center">
                    <h3 class="text-h6">{{ getActiveThreadTitle() }}</h3>
                    <div class="d-flex align-center">
                      <v-avatar-group class="mr-3">
                        <v-avatar
                          v-for="memberId in getThreadParticipants()"
                          :key="memberId"
                          size="32"
                        >
                          <v-img
                            :src="getMemberById(memberId).avatar"
                            :alt="getMemberById(memberId).name"
                          ></v-img>
                        </v-avatar>
                      </v-avatar-group>
                      <v-btn
                        color="primary"
                        variant="outlined"
                        size="small"
                        @click="inviteToThread"
                        prepend-icon="mdi-account-plus"
                      >
                        添加成员
                      </v-btn>
                    </div>
                  </v-card-title>
                  
                  <v-divider v-if="activeThread"></v-divider>
                  
                  <!-- 消息列表 -->
                  <v-card-text v-if="activeThread" class="flex-grow-1 overflow-y-auto">
                    <div
                      v-for="message in activeThreadMessages"
                      :key="message.id"
                      class="message-item mb-4"
                    >
                      <div class="d-flex align-start">
                        <v-avatar size="40" class="mr-3">
                          <v-img
                            :src="getMemberById(message.userId).avatar"
                            :alt="getMemberById(message.userId).name"
                          ></v-img>
                        </v-avatar>
                        
                        <div class="flex-grow-1">
                          <div class="d-flex align-center mb-1">
                            <span class="font-weight-medium mr-2">
                              {{ getMemberById(message.userId).name }}
                            </span>
                            <span class="text-caption text-medium-emphasis">
                              {{ formatDateTime(message.timestamp) }}
                            </span>
                          </div>
                          
                          <v-card variant="outlined" class="pa-3">
                            <p class="text-body-2 mb-0">{{ message.content }}</p>
                            
                            <div v-if="message.attachments && message.attachments.length > 0" class="mt-2">
                              <v-chip
                                v-for="attachment in message.attachments"
                                :key="attachment.id"
                                size="small"
                                variant="outlined"
                                prepend-icon="mdi-paperclip"
                                class="mr-2"
                              >
                                {{ attachment.name }} ({{ attachment.size }})
                              </v-chip>
                            </div>
                          </v-card>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                  
                  <!-- 消息输入 -->
                  <v-card-actions v-if="activeThread" class="pa-4">
                    <v-textarea
                      v-model="newMessage"
                      placeholder="输入消息..."
                      variant="outlined"
                      rows="2"
                      auto-grow
                      hide-details
                      class="flex-grow-1 mr-2"
                      @keydown.enter.ctrl="sendMessage"
                    ></v-textarea>
                    
                    <div class="d-flex flex-column">
                      <v-btn
                        icon="mdi-paperclip"
                        variant="text"
                        size="small"
                        class="mb-2"
                      ></v-btn>
                      
                      <v-btn
                        color="primary"
                        @click="sendMessage"
                        :disabled="!newMessage.trim()"
                        icon="mdi-send"
                      ></v-btn>
                    </div>
                  </v-card-actions>
                  
                  <!-- 空状态 -->
                  <v-card-text v-if="!activeThread" class="text-center py-16">
                    <v-icon icon="mdi-chat" size="64" class="text-medium-emphasis mb-4"></v-icon>
                    <h3 class="text-h6 mb-2">选择或创建讨论</h3>
                    <p class="text-body-2 text-medium-emphasis mb-4">
                      从左侧选择一个讨论或创建新的讨论开始沟通
                    </p>
                    
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- 文档协作模块 -->
          <v-window-item value="documents">
            <v-card elevation="2">
              <v-card-title class="d-flex justify-space-between align-center">
                <h3 class="text-h5">文档管理</h3>
                <v-btn
                  color="primary"
                  variant="elevated"
                  @click="createNewDocument"
                  prepend-icon="mdi-file-plus"
                >
                  创建文档
                </v-btn>
              </v-card-title>
              
              <v-card-text>
                <!-- 筛选器 -->
                <v-row class="mb-4">
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="documentFilters.projectId"
                      :items="projectSelectItems"
                      label="项目"
                      variant="outlined"
                      density="compact"
                      clearable
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="documentFilters.type"
                      :items="documentTypeItems"
                      label="类型"
                      variant="outlined"
                      density="compact"
                      clearable
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="documentFilters.status"
                      :items="documentStatusItems"
                      label="状态"
                      variant="outlined"
                      density="compact"
                      clearable
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="documentFilters.search"
                      prepend-inner-icon="mdi-magnify"
                      label="搜索文档"
                      variant="outlined"
                      density="compact"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <!-- 文档网格 -->
                <v-row>
                  <v-col
                    v-for="doc in filteredDocuments"
                    :key="doc.id"
                    cols="12" sm="6" md="4" lg="3"
                  >
                    <v-card
                      class="document-card h-100"
                      variant="outlined"
                      hover
                      @click="openDocument(doc.id)"
                    >
                      <v-card-text class="pb-2">
                        <div class="d-flex justify-space-between align-start mb-2">
                          <v-chip
                            :color="getDocumentTypeColor(doc.type)"
                            size="small"
                            variant="flat"
                          >
                            {{ getDocumentTypeLabel(doc.type) }}
                          </v-chip>
                          
                          <v-chip
                            :color="getDocumentStatusColor(doc.status)"
                            size="small"
                            variant="outlined"
                          >
                            {{ getDocumentStatusLabel(doc.status) }}
                          </v-chip>
                        </div>
                        
                        <h4 class="text-h6 mb-2">{{ doc.title }}</h4>
                        
                        <div class="text-body-2 text-medium-emphasis mb-2">
                          {{ getProjectName(doc.projectId) }}
                        </div>
                        
                        <div class="text-caption text-medium-emphasis mb-3">
                          更新于 {{ formatDate(doc.updatedAt) }}
                        </div>
                        
                        <div class="d-flex align-center">
                          <v-avatar-group class="flex-grow-1">
                            <v-avatar
                              v-for="collaboratorId in doc.collaborators.slice(0, 3)"
                              :key="collaboratorId"
                              size="24"
                            >
                              <v-img
                                :src="getMemberById(collaboratorId).avatar"
                                :alt="getMemberById(collaboratorId).name"
                              ></v-img>
                            </v-avatar>
                            
                            <v-avatar v-if="doc.collaborators.length > 3" size="24" color="grey-lighten-2">
                              <span class="text-caption">+{{ doc.collaborators.length - 3 }}</span>
                            </v-avatar>
                          </v-avatar-group>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>

    <!-- 邀请成员对话框 -->
    <v-dialog v-model="showModal" max-width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <h2 class="text-h5">邀请团队成员</h2>
          <v-btn icon="mdi-close" variant="text" @click="closeModal"></v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="inviteForm.email"
              label="邮箱地址"
              type="email"
              variant="outlined"
              :rules="[rules.required, rules.email]"
              class="mb-4"
            ></v-text-field>
            
            <v-select
              v-model="inviteForm.role"
              :items="roleSelectItems"
              label="角色"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-4"
            ></v-select>
            
            <v-expansion-panels class="mb-4">
              <v-expansion-panel title="选择项目">
                <v-expansion-panel-text>
                  <v-checkbox
                    v-for="project in projects"
                    :key="project.id"
                    v-model="inviteForm.projects"
                    :value="project.id"
                    :label="project.name"
                    hide-details
                  ></v-checkbox>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            
            <v-textarea
              v-model="inviteForm.message"
              label="邀请消息"
              placeholder="添加邀请消息..."
              variant="outlined"
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeModal">取消</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="sendInvite"
            :disabled="!isInviteFormValid"
          >
            发送邀请
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 文档编辑对话框 -->
    <v-dialog v-model="showDocumentModal" max-width="900" scrollable>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <h2 class="text-h5">{{ isEditingDocument ? '编辑文档' : '创建新文档' }}</h2>
          <v-btn icon="mdi-close" variant="text" @click="closeDocumentModal"></v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="documentForm.title"
                  label="文档标题"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="documentForm.projectId"
                  :items="projectSelectItems"
                  label="关联项目"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="documentForm.type"
                  :items="documentTypeItems"
                  label="文档类型"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="documentForm.status"
                  :items="documentStatusItems"
                  label="文档状态"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="documentForm.content"
                  label="文档内容"
                  variant="outlined"
                  rows="15"
                  class="document-content"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="closeDocumentModal">取消</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="saveDocument"
            :disabled="!isDocumentFormValid"
          >
            {{ isEditingDocument ? '保存' : '创建' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { 
  roles, 
  permissionTypes,
  getTeamMembers, 
  getRolePermissions, 
  getAllActivityLogs,
  getProjectDocuments,
  documents,
  getPermissionName
} from '../utils/networkData'
import { getAllProjects } from '../utils/projectsData'

export default {
  name: 'NetworkPage',
  setup() {
    // 基础数据
    const teamMembers = ref(getTeamMembers())
    const activityLogs = ref(getAllActivityLogs())
    const allDocuments = ref(documents)
    const projects = ref(getAllProjects())
    
    // 选项卡控制
    const tabs = ref([
      { id: 'permissions', name: '权限管理', icon: 'mdi-shield-account' },
      { id: 'communication', name: '沟通工具', icon: 'mdi-chat' },
      { id: 'documents', name: '文档协作', icon: 'mdi-file-document' }
    ])
    const activeTab = ref('permissions')
    
    // 权限管理相关
    const memberSearch = ref('')
    const memberHeaders = ref([
      { title: '成员', key: 'name', sortable: true },
      { title: '角色', key: 'role' },
      { title: '邮箱', key: 'email' },
      { title: '加入时间', key: 'joinTime' },
      { title: '最近活动', key: 'lastActive' },
      { title: '操作', key: 'actions', sortable: false }
    ])
    
    // 沟通工具相关
    const discussionThreads = ref([
      { id: 1, title: '行业风险监测平台开发计划', projectId: 1, updatedAt: '2024-05-15 10:15:30' },
      { id: 2, title: '数据模型设计讨论', projectId: 1, updatedAt: '2024-05-16 15:20:45' },
      { id: 3, title: '客户分群洞察工具原型反馈', projectId: 2, updatedAt: '2024-05-20 09:10:15' }
    ])
    const activeThread = ref(null)
    const newMessage = ref('')
    
    // 文档管理相关
    const documentFilters = ref({
      projectId: '',
      type: '',
      status: '',
      search: ''
    })
    
    // 模态框状态
    const showModal = ref(false)
    const inviteForm = ref({
      email: '',
      role: '',
      projects: [],
      message: ''
    })
    
    const showDocumentModal = ref(false)
    const isEditingDocument = ref(false)
    const documentForm = ref({
      id: null,
      title: '',
      projectId: '',
      type: 'requirement',
      status: 'draft',
      content: '',
      collaborators: []
    })
    
    // 选择项数据
    const projectSelectItems = computed(() => [
      { title: '全部项目', value: '' },
      ...projects.value.map(project => ({
        title: project.name,
        value: project.id
      }))
    ])

    const roleSelectItems = computed(() => 
      Object.entries(roles).map(([roleId, role]) => ({
        title: role.name,
        value: roleId
      }))
    )

    const documentTypeItems = ref([
      { title: '全部类型', value: '' },
      { title: '需求文档', value: 'requirement' },
      { title: '技术文档', value: 'technical' },
      { title: '测试文档', value: 'testing' },
      { title: 'API文档', value: 'api' }
    ])

    const documentStatusItems = ref([
      { title: '全部状态', value: '' },
      { title: '草稿', value: 'draft' },
      { title: '审核中', value: 'review' },
      { title: '已批准', value: 'approved' },
      { title: '已发布', value: 'published' }
    ])

    // 验证规则
    const rules = {
      required: value => !!value || '此字段为必填项',
      email: value => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(value) || '请输入有效的邮箱地址'
      }
    }

    // 计算属性
    const filteredMembers = computed(() => {
      if (!memberSearch.value) return teamMembers.value
      
      const search = memberSearch.value.toLowerCase()
      return teamMembers.value.filter(member => 
        member.name.toLowerCase().includes(search) || 
        member.email.toLowerCase().includes(search)
      )
    })
    
    const activeThreadMessages = computed(() => {
      if (!activeThread.value) return []
      
      // 模拟从消息数据中获取
      return [
        {
          id: 1,
          userId: 1,
          content: '大家好，今天我们开始"行业风险监测平台"的开发，请各位按照计划进行。',
          timestamp: '2024-05-15 09:45:00',
          attachments: []
        },
        {
          id: 2,
          userId: 2,
          content: '好的，我已经准备好了开发环境，今天会先完成数据模型的设计。',
          timestamp: '2024-05-15 10:00:15',
          attachments: []
        },
        {
          id: 3,
          userId: 4,
          content: '我已经创建了测试计划，会根据需求文档准备测试用例。',
          timestamp: '2024-05-15 10:15:30',
          attachments: []
        }
      ]
    })
    
    const filteredDocuments = computed(() => {
      let filtered = allDocuments.value
      
      if (documentFilters.value.projectId) {
        filtered = filtered.filter(doc => doc.projectId === documentFilters.value.projectId)
      }
      
      if (documentFilters.value.type) {
        filtered = filtered.filter(doc => doc.type === documentFilters.value.type)
      }
      
      if (documentFilters.value.status) {
        filtered = filtered.filter(doc => doc.status === documentFilters.value.status)
      }
      
      if (documentFilters.value.search) {
        const search = documentFilters.value.search.toLowerCase()
        filtered = filtered.filter(doc => 
          doc.title.toLowerCase().includes(search) ||
          doc.content.toLowerCase().includes(search)
        )
      }
      
      return filtered
    })

    const isInviteFormValid = computed(() => {
      return inviteForm.value.email && 
             inviteForm.value.role && 
             inviteForm.value.projects.length > 0
    })

    const isDocumentFormValid = computed(() => {
      return documentForm.value.title && 
             documentForm.value.projectId && 
             documentForm.value.type
    })
    
    // 工具方法
    const formatDate = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN')
    }

    const getRoleName = (roleId) => {
      return roles[roleId]?.name || '未知角色'
    }

    const getRoleColor = (roleId) => {
      return roles[roleId]?.color || '#999'
    }

    const getPermissionName = (permId) => {
      return permissionTypes[permId]?.name || '未知权限'
    }

    const getProjectName = (projectId) => {
      const project = projects.value.find(p => p.id === projectId)
      return project?.name || '未知项目'
    }

    const getMemberById = (memberId) => {
      return teamMembers.value.find(m => m.id === memberId) || {
        name: '未知用户',
        avatar: '/api/placeholder/32/32'
      }
    }

    const getDocumentTypeLabel = (type) => {
      const types = {
        requirement: '需求文档',
        technical: '技术文档',
        testing: '测试文档',
        api: 'API文档'
      }
      return types[type] || type
    }

    const getDocumentStatusLabel = (status) => {
      const statuses = {
        draft: '草稿',
        review: '审核中',
        approved: '已批准',
        published: '已发布'
      }
      return statuses[status] || status
    }

    const getDocumentTypeColor = (type) => {
      const colors = {
        requirement: 'blue',
        technical: 'green',
        testing: 'orange',
        api: 'purple'
      }
      return colors[type] || 'grey'
    }

    const getDocumentStatusColor = (status) => {
      const colors = {
        draft: 'grey',
        review: 'orange',
        approved: 'green',
        published: 'primary'
      }
      return colors[status] || 'grey'
    }

    const getActiveThreadTitle = () => {
      const thread = discussionThreads.value.find(t => t.id === activeThread.value)
      return thread?.title || '未知讨论'
    }

    const getThreadParticipants = () => {
      // 模拟返回参与者ID
      return [1, 2, 3]
    }

    // 事件处理方法
    const showInviteModal = () => {
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
      inviteForm.value = {
        email: '',
        role: '',
        projects: [],
        message: ''
      }
    }

    const sendInvite = () => {
      // 实际应用中这里会发送邀请请求
      console.log('发送邀请:', inviteForm.value)
      closeModal()
    }

    const editRole = (roleId) => {
      console.log('编辑角色:', roleId)
    }

    const editMember = (memberId) => {
      console.log('编辑成员:', memberId)
    }

    const removeMember = (memberId) => {
      console.log('移除成员:', memberId)
    }

    const createNewThread = () => {
      console.log('创建新讨论')
    }

    const selectThread = (threadId) => {
      activeThread.value = threadId
    }

    const inviteToThread = () => {
      console.log('邀请成员到讨论')
    }

    const sendMessage = () => {
      if (!newMessage.value.trim()) return
      console.log('发送消息:', newMessage.value)
      newMessage.value = ''
    }

    const createNewDocument = () => {
      documentForm.value = {
        id: null,
        title: '',
        projectId: '',
        type: 'requirement',
        status: 'draft',
        content: '',
        collaborators: []
      }
      isEditingDocument.value = false
      showDocumentModal.value = true
    }

    const openDocument = (docId) => {
      const document = allDocuments.value.find(d => d.id === docId)
      if (document) {
        documentForm.value = { ...document }
        isEditingDocument.value = true
        showDocumentModal.value = true
      }
    }

    const closeDocumentModal = () => {
      showDocumentModal.value = false
    }

    const saveDocument = () => {
      console.log('保存文档:', documentForm.value)
      closeDocumentModal()
    }
    
    // 生命周期
    onMounted(() => {
      console.log('协作网络页面已挂载')
    })

    return {
      // 数据
      teamMembers,
      activityLogs,
      allDocuments,
      projects,
      tabs,
      activeTab,
      memberSearch,
      memberHeaders,
      discussionThreads,
      activeThread,
      newMessage,
      documentFilters,
      showModal,
      inviteForm,
      showDocumentModal,
      isEditingDocument,
      documentForm,
      roles,
      
      // 计算属性
      filteredMembers,
      activeThreadMessages,
      projectSelectItems,
      roleSelectItems,
      documentTypeItems,
      documentStatusItems,
      filteredDocuments,
      isInviteFormValid,
      isDocumentFormValid,
      rules,
      
      // 方法
      formatDate,
      formatDateTime,
      getRoleName,
      getRoleColor,
      getPermissionName,
      getRolePermissions,
      getProjectName,
      getMemberById,
      getDocumentTypeLabel,
      getDocumentStatusLabel,
      getDocumentTypeColor,
      getDocumentStatusColor,
      getActiveThreadTitle,
      getThreadParticipants,
      showInviteModal,
      closeModal,
      sendInvite,
      editRole,
      editMember,
      removeMember,
      createNewThread,
      selectThread,
      inviteToThread,
      sendMessage,
      createNewDocument,
      openDocument,
      closeDocumentModal,
      saveDocument,
      
      // 导入的数据
      permissionTypes
    }
  }
}
</script>

<style scoped>
.network-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header-content {
  color: white;
}

.thread-item {
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.thread-item:hover {
  background-color: rgba(255, 0, 0, 0.04);
}

.thread-item.v-list-item--active {
  border-left-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.role-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.permission-chips .v-chip {
  margin: 2px;
}

.document-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.document-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.message-item {
  padding: 8px 0;
}

.document-content {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

/* 自定义scrollbar for 消息区域 */
.v-card-text.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.v-card-text.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.v-card-text.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.v-card-text.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .network-header {
    height: 100px;
  }
  
  .header-content h1 {
    font-size: 1.8rem;
  }
  
  .header-content p {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .network-header {
    height: 80px;
  }
  
  .header-content h1 {
    font-size: 1.5rem;
  }
  
  .header-content p {
    font-size: 0.9rem;
  }
}
</style>
