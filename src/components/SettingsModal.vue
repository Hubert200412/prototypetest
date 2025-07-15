<template>
  <div v-if="visible" class="settings-overlay" @click="closeSettings">
    <div class="settings-modal" @click.stop>
      <div class="settings-header">
        <div class="settings-tabs">
          <button 
            class="tab-btn"
            :class="{ active: activeTab === 'settings' }"
            @click="activeTab = 'settings'"
          >
            设置
          </button>
          <button 
            class="tab-btn"
            :class="{ active: activeTab === 'account' }"
            @click="activeTab = 'account'"
          >
            账号
          </button>
        </div>
        <button class="close-btn" @click="closeSettings">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <!-- 设置标签页内容 -->
      <div v-if="activeTab === 'settings'" class="tab-content">
        <div class="setting-group">
          <h3 class="group-title">常驻扩展</h3>
          <div class="setting-item">
            <label class="setting-label">默认MCP服务</label>
            <button class="view-btn" @click="showExtensionsModal = true">
              查看
            </button>
          </div>
          <div class="setting-item">
            <label class="setting-label">启用选择默认MCP</label>
            <div class="toggle-switch">
              <input 
                type="checkbox" 
                id="autoMCP" 
                v-model="autoEnableMCP"
                class="toggle-input"
              >
              <label for="autoMCP" class="toggle-label"></label>
            </div>
          </div>
        </div>
        
        <div class="setting-group">
          <h3 class="group-title">浏览器模板</h3>
          <div class="setting-item">
            <label class="setting-label">默认浏览器</label>
            <select v-model="defaultBrowser" class="setting-select">
              <option value="chrome">Chrome</option>
              <option value="firefox">Firefox</option>
              <option value="edge">Edge</option>
              <option value="safari">Safari</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 账号标签页内容 -->
      <div v-if="activeTab === 'account'" class="tab-content">
        <div class="account-info">
          <div class="avatar-section">
            <div class="avatar">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#4285f4"/>
                <path d="M16 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 14c-3.31 0-10 1.67-10 5v1h20v-1c0-3.33-6.69-5-10-5z" fill="white"/>
              </svg>
            </div>
          </div>
          <div class="account-details">
            <div class="detail-row">
              <span class="detail-label">用户名</span>
              <span class="detail-value">{{ userInfo.username }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">用户邮箱</span>
              <span class="detail-value">{{ userInfo.email }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">手机号</span>
              <span class="detail-value">{{ userInfo.phone }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">职业</span>
              <select v-model="userInfo.profession" class="profession-select">
                <option value="员工">员工</option>
                <option value="学生">学生</option>
                <option value="开发者">开发者</option>
                <option value="设计师">设计师</option>
                <option value="产品经理">产品经理</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 扩展列表弹窗 -->
  <div v-if="showExtensionsModal" class="extensions-overlay" @click="closeExtensionsModal">
    <div class="extensions-modal" @click.stop>
      <div class="extensions-header">
        <h2 class="extensions-title">MCP扩展</h2>
        <button class="add-custom-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          添加自定义扩展
        </button>
        <button class="close-btn" @click="closeExtensionsModal">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <div class="extensions-content">
        <div class="extension-item" v-for="extension in extensions" :key="extension.id">
          <div class="extension-icon">
            <div class="icon-placeholder" :style="{ backgroundColor: extension.color }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path :d="extension.iconPath" fill="white"/>
              </svg>
            </div>
          </div>
          <div class="extension-info">
            <h3 class="extension-name">{{ extension.name }}</h3>
            <p class="extension-description">{{ extension.description }}</p>
          </div>
          <button class="add-btn" @click="addExtension(extension.id)">
            添加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { userData } from '../utils/userData.js'

export default {
  name: 'SettingsModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const activeTab = ref('settings')
    const showExtensionsModal = ref(false)
    
    // 设置项状态
    const defaultMCP = ref('xiaoyu')
    const autoEnableMCP = ref(true)
    const defaultBrowser = ref('chrome')
    
    // 扩展列表数据 - 与首页MCP选项保持一致
    const extensions = ref([
      {
        id: 'wozhifu',
        name: '沃支付',
        description: '联通沃支付MCP，支持在线支付、退款处理、交易记录查询等功能',
        color: '#FF6B35',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V16h-.71c-.88 0-1.52-.61-1.52-1.49 0-.31.08-.59.25-.82l.65-.92c.35-.49.54-1.07.54-1.67V10c0-1.1.9-2 2-2s2 .9 2 2v1.1c0 .6.19 1.18.54 1.67l.65.92c.17.23.25.51.25.82 0 .88-.64 1.49-1.52 1.49H13.41z'
      },
      {
        id: 'xiaoyufen',
        name: '小鱼分',
        description: '小鱼分信用评估MCP，支持用户信用评分、风险评估、行为分析等功能',
        color: '#00C9FF',
        iconPath: 'M12 2c5.52 0 10 4.48 10 10 0 5.18-3.95 9.45-9 9.95v-7.03c1.04-.52 2-1.63 2-3.92 0-2.21-1.79-4-4-4S7 8.79 7 11c0 2.29.96 3.4 2 3.92v7.03C4.05 21.45 2 17.18 2 12 2 6.48 6.48 2 12 2z'
      },
      {
        id: 'yuebao',
        name: '余额宝',
        description: '余额宝资金管理MCP，支持资金存取、收益计算、投资建议等功能',
        color: '#4CAF50',
        iconPath: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z'
      },
      {
        id: 'github',
        name: 'Github',
        description: 'Github版本控制MCP，支持知识库同步、问题追踪集成、自动化部署流水线等功能',
        color: '#24292E',
        iconPath: 'M12 2c5.514 0 10 4.486 10 10 0 4.42-2.87 8.166-6.839 9.489-.5.092-.682-.217-.682-.483 0-.237.008-.868.013-1.703 2.782.605 3.369-1.343 3.369-1.343.454-1.158 1.11-1.466 1.11-1.466.908-.62-.069-.608-.069-.608-1.003.07-1.531 1.032-1.531 1.032-.892 1.53-2.341 1.088-2.91.832-.092-.647-.35-1.088-.636-1.338 2.22-.253 4.555-1.113 4.555-4.951 0-1.093-.39-1.988-1.029-2.688.103-.253.446-1.272-.098-2.65 0 0-.84-.27-2.75 1.026A9.564 9.564 0 0 0 12 6.844c-.85.004-1.705.115-2.504.337-1.909-1.296-2.747-1.027-2.747-1.027-.546 1.379-.202 2.398-.1 2.651-.64.7-1.028 1.595-1.028 2.688 0 3.848 2.339 4.695 4.566 4.943-.288.248-.546.725-.546 1.467 0 1.061-.01 1.917-.01 2.176 0 .269-.18.579-.688.482C4.867 20.164 2 16.418 2 12c0-5.514 4.486-10 10-10z'
      },
      {
        id: 'mysql',
        name: 'MySQL',
        description: 'MySQL数据库MCP，支持数据库连接、查询操作、数据管理等功能',
        color: '#4479A1',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      },
      {
        id: 'gaode',
        name: '高德地图',
        description: '高德地图MCP，支持查询地点、搜索周边、规划交通工具路径、经纬度与位置转换等功能',
        color: '#00D4AA',
        iconPath: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
      },
      {
        id: 'image-tools',
        name: '图像工具',
        description: '图像处理MCP，支持图片编辑、格式转换、智能识别、图像生成等功能',
        color: '#FF6B6B',
        iconPath: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'
      },
      {
        id: 'voice-tools',
        name: '语音工具',
        description: '语音处理MCP，支持语音识别、文字转语音、语音合成、音频处理等功能',
        color: '#9C27B0',
        iconPath: 'M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z'
      },
      {
        id: 'ai-assistant',
        name: 'AI助手',
        description: 'AI智能助手MCP，支持智能对话、任务自动化、决策辅助、知识问答等功能',
        color: '#673AB7',
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
      }
    ])
    
    // 用户信息 - 从 userData 获取
    const userInfo = ref({
      username: userData.userInfo.username,
      email: userData.userInfo.email,
      phone: userData.userInfo.phone,
      profession: userData.userInfo.role
    })
    
    const closeSettings = () => {
      emit('close')
    }
    
    const closeExtensionsModal = () => {
      showExtensionsModal.value = false
    }
    
    const addExtension = (extensionId) => {
      console.log('添加扩展:', extensionId)
      // 这里可以添加具体的添加扩展逻辑
    }
    
    // 监听visible变化，重置activeTab
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        activeTab.value = 'settings'
      } else {
        showExtensionsModal.value = false
      }
    })
    
    return {
      activeTab,
      showExtensionsModal,
      defaultMCP,
      autoEnableMCP,
      defaultBrowser,
      extensions,
      userInfo,
      closeSettings,
      closeExtensionsModal,
      addExtension
    }
  }
}
</script>

<style scoped>
/* 设置弹窗样式 */
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.settings-modal {
  background: white;
  border-radius: 12px;
  width: 500px;
  max-height: 600px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
  border-bottom: 1px solid #e5e7eb;
}

.settings-tabs {
  display: flex;
  gap: 0;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  color: #6b7280;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #4285f4;
  border-bottom-color: #4285f4;
}

.close-btn {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.tab-content {
  padding: 24px;
  max-height: 500px;
  overflow-y: auto;
}

.setting-group {
  margin-bottom: 32px;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.group-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 12px 0;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-label {
  color: #374151;
  font-weight: 500;
  flex: 1;
}

.setting-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  min-width: 140px;
  cursor: pointer;
}

.setting-select:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

/* 切换开关样式 */
.toggle-switch {
  position: relative;
}

.toggle-input {
  display: none;
}

.toggle-label {
  display: block;
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle-input:checked + .toggle-label {
  background: #4285f4;
}

.toggle-input:checked + .toggle-label::after {
  transform: translateX(20px);
}

/* 账号信息样式 */
.account-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.avatar-section {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
}

.account-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: #6b7280;
  font-weight: 500;
  flex: 1;
}

.detail-value {
  color: #374151;
  font-weight: 500;
  flex: 2;
  text-align: right;
}


.change-btn:hover {
  background: #4285f4;
  color: white;
}

.profession-select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  min-width: 100px;
}

.profession-select:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

/* 查看按钮样式 */
.view-btn {
  background: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #3367d6;
}

/* 扩展弹窗样式 */
.extensions-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
}

.extensions-modal {
  background: white;
  border-radius: 12px;
  width: 600px;
  max-height: 700px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.extensions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.extensions-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.add-custom-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f0f9ff;
  color: #0284c7;
  border: 1px solid #bae6fd;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-custom-btn:hover {
  background: #e0f2fe;
  border-color: #7dd3fc;
}

.extensions-content {
  padding: 16px 24px 24px;
  max-height: 550px;
  overflow-y: auto;
}

.extension-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  gap: 16px;
}

.extension-item:last-child {
  border-bottom: none;
}

.extension-icon {
  flex-shrink: 0;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.extension-info {
  flex: 1;
  min-width: 0;
}

.extension-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.extension-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  word-break: break-all;
}

.add-btn {
  background: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.add-btn:hover {
  background: #3367d6;
}
</style>
