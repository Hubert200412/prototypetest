<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">一语即出，应用即现</h1>
      <div class="search-container">
        <div class="search-wrapper">
          <!-- 输入框区域 -->
          <div class="input-area">
            <textarea 
              v-model="inputText"
              placeholder="请详细描述您想要创建的应用或功能需求..."
              class="main-input"
              rows="6"
              :style="{ resize: 'none' }"
            ></textarea>
            
            <!-- 输入框底部工具栏 -->
            <div class="input-toolbar">
              <!-- 左下角选项类别 -->
              <div class="category-options">
                <div 
                  class="category-item"
                  @click="toggleCategoryMenu('mode')"
                >
                  <span>{{ selectedMode ? `模式：${selectedMode}` : '模式' }}</span>
                  <div 
                    v-show="activeCategory === 'mode'" 
                    class="category-menu mode-menu"
                    @mouseleave="hideMenuImmediately"
                    @mouseenter="cancelMenuClose"
                  >
                    <div class="menu-header">
                      <span>选择开发模式</span>
                    </div>
                    <div class="mode-options-container">
                      <div 
                        v-for="(option, index) in categoryOptions.mode" 
                        :key="index"
                        class="menu-option radio-option"
                        :class="{ selected: selectedMode === option }"
                        @click="selectModeOption(option)"
                      >
                        <span class="radio-circle" :class="{ active: selectedMode === option }"></span>
                        <div class="option-content">
                          <span class="option-title">{{ option }}</span>
                          <span class="option-description">{{ getModeDescription(option) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  class="category-item"
                  @click="toggleCategoryMenu('expert')"
                >
                  <span>{{ selectedExpert ? `专家：${selectedExpert}` : '专家' }}</span>
                  <div 
                    v-show="activeCategory === 'expert'" 
                    class="category-menu expert-menu"
                    @mouseleave="hideMenuImmediately"
                    @mouseenter="cancelMenuClose"
                  >
                    <div class="menu-header">
                      <span>选择专家助手</span>
                    </div>
                    <div class="expert-options-container">
                      <div 
                        v-for="(option, index) in categoryOptions.expert" 
                        :key="index"
                        class="menu-option radio-option"
                        :class="{ selected: selectedExpert === option }"
                        @click="selectExpertOption(option)"
                      >
                        <span class="radio-circle" :class="{ active: selectedExpert === option }"></span>
                        <div class="option-content">
                          <span class="option-title">{{ option }}</span>
                          <span class="option-description">{{ getExpertDescription(option) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  class="category-item"
                  @click="toggleCategoryMenu('mcp')"
                >
                  <span>{{ mcpDisplayText }}</span>
                  <div 
                    v-show="activeCategory === 'mcp'" 
                    class="category-menu mcp-menu"
                    @mouseleave="hideMenuImmediately"
                    @mouseenter="cancelMenuClose"
                  >
                    <div class="menu-header">
                      <span>选择MCP拓展</span>
                      <button class="add-btn" @click.stop="showMcpForm">+</button>
                    </div>
                    <div class="mcp-options-container">
                      <div 
                        v-for="(option, index) in categoryOptions.mcp" 
                        :key="index"
                        class="menu-option checkbox-option"
                        :class="{ selected: selectedMcpList.includes(option) }"
                        @click.stop="toggleMcpOption(option)"
                      >
                        <span class="checkbox-square" :class="{ active: selectedMcpList.includes(option) }"></span>
                        <span>{{ option }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右下角功能按钮 -->
              <div class="action-buttons">
                <button class="icon-btn" @click="uploadFile" title="上传文件">
                  <img src="/icons/首页-文件上传.svg" alt="上传文件" class="btn-icon" />
                </button>
                <button class="submit-btn" @click="submitContent">
                  智能对话
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="suggestion-tags">
        <span 
          class="tag" 
          v-for="(suggestion, index) in suggestions" 
          :key="index"
          @click="fillInputText(suggestion)"
        >
          {{ suggestion }}
        </span>
      </div>
    </div>

    <!-- MCP自定义表单模态框 -->
    <div v-if="showMcpModal" class="modal-overlay" @click="closeMcpForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>自定义MCP拓展</h3>
          <button class="close-btn" @click="closeMcpForm">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>MCP名称</label>
            <input v-model="mcpForm.name" type="text" placeholder="请输入MCP拓展名称" />
          </div>
          <div class="form-group">
            <label>拓展描述</label>
            <textarea v-model="mcpForm.description" placeholder="请描述MCP拓展的功能和用途" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>拓展类型</label>
            <select v-model="mcpForm.type">
              <option value="connector">连接器</option>
              <option value="processor">处理器</option>
              <option value="validator">验证器</option>
              <option value="monitor">监控器</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeMcpForm">取消</button>
          <button class="confirm-btn" @click="saveMcpForm">确认添加</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeroSection',
  setup() {
    const router = useRouter()
    const inputText = ref('')
    const activeCategory = ref('')
    const menuTimeout = ref(null)
    const selectedMode = ref('深度智造') // 默认选择深度智造
    const selectedExpert = ref('产品经理') // 默认选择产品经理
    const selectedMcpList = ref([]) // MCP多选列表，默认不选择
    const showMcpModal = ref(false)
    const mcpForm = ref({
      name: '',
      description: '',
      type: 'connector'
    })
    
    // MCP 显示文本计算属性
    const mcpDisplayText = computed(() => {
      if (selectedMcpList.value.length === 0) {
        return 'MCP'
      } else if (selectedMcpList.value.length === 1) {
        return `MCP：${selectedMcpList.value[0]}`
      } else {
        return `MCP：${selectedMcpList.value[0]}等`
      }
    })
    
    const suggestions = ref([
      '创建一个用户管理系统',
      '搭建电商平台后台',
      '开发移动端应用',
      '设计数据分析面板',
      '构建工作流系统',
      '制作企业官网'
    ])
    
    const categoryOptions = ref({
      mode: ['对话', '快速生产', '深度智造'],
      expert: ['前端开发专家', '后端架构师', '数据分析师', 'UI设计师', '产品经理', '测试工程师', '系统架构师'],
      mcp: ['沃支付', '小鱼分', '余额宝', 'Github', 'MySQL', '高德地图', '图像工具', '语音工具', 'AI助手']
    })

    const toggleCategoryMenu = (category) => {
      if (activeCategory.value === category) {
        activeCategory.value = ''
      } else {
        activeCategory.value = category
      }
      // 清除定时器
      if (menuTimeout.value) {
        clearTimeout(menuTimeout.value)
        menuTimeout.value = null
      }
    }

    const scheduleMenuClose = (category) => {
      menuTimeout.value = setTimeout(() => {
        if (activeCategory.value === category) {
          activeCategory.value = ''
        }
      }, 500) // 0.5秒延迟
    }

    const cancelMenuClose = () => {
      if (menuTimeout.value) {
        clearTimeout(menuTimeout.value)
        menuTimeout.value = null
      }
    }

    const fillInputText = (text) => {
      inputText.value = text
    }

    const selectModeOption = (option) => {
      selectedMode.value = option
      activeCategory.value = '' // 选择后关闭菜单
    }

    const selectExpertOption = (option) => {
      selectedExpert.value = option
      activeCategory.value = '' // 选择后关闭菜单
    }

    const toggleMcpOption = (option) => {
      const index = selectedMcpList.value.indexOf(option)
      if (index > -1) {
        // 如果已选择，则取消选择
        selectedMcpList.value.splice(index, 1)
      } else {
        // 如果未选择，则添加到选择列表
        selectedMcpList.value.push(option)
      }
      // MCP多选不关闭菜单，方便用户继续选择
      // 阻止事件冒泡，确保菜单保持打开状态
    }

    const hideMenuImmediately = () => {
      activeCategory.value = ''
      // 清除任何可能存在的定时器
      if (menuTimeout.value) {
        clearTimeout(menuTimeout.value)
        menuTimeout.value = null
      }
    }

    const showMcpForm = () => {
      showMcpModal.value = true
      activeCategory.value = '' // 关闭菜单
    }

    const closeMcpForm = () => {
      showMcpModal.value = false
      mcpForm.value = {
        name: '',
        description: '',
        type: 'connector'
      }
    }

    const saveMcpForm = () => {
      if (mcpForm.value.name.trim()) {
        const newMcpName = mcpForm.value.name.trim()
        categoryOptions.value.mcp.push(newMcpName)
        // 自动选择新添加的MCP拓展
        if (!selectedMcpList.value.includes(newMcpName)) {
          selectedMcpList.value.push(newMcpName)
        }
        closeMcpForm()
      }
    }

    const selectOption = (category, option) => {
      console.log(`选择了 ${category}: ${option}`)
    }

    const addCategoryOption = (category) => {
      const newOption = prompt(`添加新的${category}选项:`)
      if (newOption && newOption.trim()) {
        categoryOptions.value[category].push(newOption.trim())
      }
    }

    const deleteCategoryOption = (category, index) => {
      if (categoryOptions.value[category].length > 1) {
        categoryOptions.value[category].splice(index, 1)
      }
    }

    const uploadFile = () => {
      console.log('上传文件')
    }

    const submitContent = () => {
      if (!inputText.value.trim()) {
        alert('请先输入您的需求描述')
        return
      }
      
      // 构建跳转参数
      const queryParams = {
        initialMessage: inputText.value,
        mode: selectedMode.value || '基础模式',
      }
      
      if (selectedExpert.value) {
        queryParams.expert = selectedExpert.value
      }
      
      if (selectedMcpList.value.length > 0) {
        queryParams.mcp = selectedMcpList.value.join(',')
      }
      
      // 跳转到对话页面
      router.push({
        path: '/chat',
        query: queryParams
      })
    }

    const getModeDescription = (mode) => {
      const descriptions = {
        '对话': '和AI讨论想法、灵感',
        '快速生产': '快速生成原型和MVP',
        '深度智造': '全面开发和部署应用'
      }
      return descriptions[mode] || ''
    }

    const getExpertDescription = (expert) => {
      const descriptions = {
        '前端开发专家': '专注于用户界面和交互设计',
        '后端架构师': '构建稳定高效的服务端架构',
        '数据分析师': '数据处理和商业智能分析',
        'UI设计师': '视觉设计和用户体验优化',
        '产品经理': '产品规划和需求分析',
        '测试工程师': '质量保证和自动化测试',
        '系统架构师': '整体技术架构和系统设计'
      }
      return descriptions[expert] || ''
    }

    return {
      inputText,
      activeCategory,
      categoryOptions,
      suggestions,
      selectedMode,
      selectedExpert,
      selectedMcpList,
      mcpDisplayText,
      showMcpModal,
      mcpForm,
      toggleCategoryMenu,
      hideMenuImmediately,
      cancelMenuClose,
      fillInputText,
      selectModeOption,
      selectExpertOption,
      toggleMcpOption,
      showMcpForm,
      closeMcpForm,
      saveMcpForm,
      selectOption,
      addCategoryOption,
      deleteCategoryOption,
      uploadFile,
      submitContent,
      getModeDescription,
      getExpertDescription
    }
  }
}
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-bottom: 40px;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.search-container {
  max-width: 900px;
  margin: 0 auto 30px;
}

.search-wrapper {
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.input-area {
  position: relative;
}

.main-input {
  width: 100%;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  font-size: 16px;
  resize: none;
  min-height: 120px;
  max-height: 120px;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: inherit;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.main-input::-webkit-scrollbar {
  width: 6px;
}

.main-input::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.main-input::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.main-input::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.main-input:focus {
  border-color: #1976d2;
}

.main-input::placeholder {
  color: #999;
}

.input-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.category-options {
  display: flex;
  gap: 20px;
}

.category-item {
  position: relative;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #666;
}

.category-item:hover {
  background: #e9ecef;
  color: #1976d2;
}

.category-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  margin-top: 5px;
}

.mode-menu {
  min-width: 180px;
}

.expert-menu {
  min-width: 220px;
}

.mode-options-container {
  max-height: 160px; /* 最多显示4个选项的高度 */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.expert-options-container {
  max-height: 160px; /* 最多显示4个选项的高度 */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.expert-options-container::-webkit-scrollbar {
  width: 6px;
}

.expert-options-container::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.expert-options-container::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.mcp-menu {
  min-width: 220px;
}

.mcp-options-container {
  max-height: 160px; /* 最多显示4个选项的高度 */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.mcp-options-container::-webkit-scrollbar {
  width: 6px;
}

.mcp-options-container::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.mcp-options-container::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.mcp-options-container::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  color: #333;
}

.add-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.add-btn:hover {
  background: #e3f2fd;
  color: #1976d2;
}

.delete-btn:hover {
  background: #ffebee;
  color: #d32f2f;
}

.menu-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-option:hover {
  background: #f8f9fa;
  border-left-color: #1976d2;
}

.radio-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.radio-option:hover {
  background: #f8f9fa;
  border-left-color: #1976d2;
}

.radio-option.selected {
  background: #e3f2fd;
  border-left-color: #1976d2;
  color: #1976d2;
}

.radio-circle {
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s ease;
}

.radio-circle.active {
  border-color: #1976d2;
  background: #1976d2;
}

.radio-circle.active::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.option-title {
  font-weight: 500;
  color: #333;
}

.option-description {
  font-size: 12px;
  color: #666;
  line-height: 1.3;
}

.checkbox-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.checkbox-option:hover {
  background: #f8f9fa;
  border-left-color: #1976d2;
}

.checkbox-option.selected {
  background: #e3f2fd;
  border-left-color: #1976d2;
  color: #1976d2;
}

.checkbox-square {
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-radius: 3px;
  margin-right: 12px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-square.active {
  border-color: #1976d2;
  background: #1976d2;
}

.checkbox-square.active::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
}

.icon-btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.submit-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #1565c0;
  transform: translateY(-1px);
}

.suggestion-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #1976d2;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e9ecef;
  justify-content: flex-end;
}

.cancel-btn,
.confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f8f9fa;
  color: #666;
}

.cancel-btn:hover {
  background: #e9ecef;
}

.confirm-btn {
  background: #1976d2;
  color: white;
}

.confirm-btn:hover {
  background: #1565c0;
}

/* 性能优化样式 */
* {
  will-change: auto;
}

.category-menu {
  will-change: opacity, transform;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.category-item {
  transform: translateZ(0); /* 启用硬件加速 */
}

.modal-overlay {
  will-change: opacity;
}

.modal-content {
  will-change: transform, opacity;
}
</style>
