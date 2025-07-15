<template>
  <div class="chat-page">
    <div class="chat-container">
      <div class="chat-header">
        <div class="header-left">
          <h2>&nbsp&nbsp&nbsp智能对话</h2>
          <div class="chat-info">
            <span>&nbsp&nbsp&nbsp模式: {{ chatMode }}</span>
            <span v-if="expertType">专家: {{ expertType }}</span>
          </div>
        </div>
        <div class="expert-selector">
          <button class="switch-expert-btn" @click="toggleExpertDropdown">
            切换专家
            <span class="dropdown-icon">▼</span>
          </button>
          <div class="expert-dropdown" v-if="showExpertDropdown">
            <div 
              v-for="expert in availableExperts" 
              :key="expert"
              class="expert-option"
              :class="{ 'active': expert === expertType }"
              @click="changeExpert(expert)"
            >
              {{ expert }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
          <!-- 为AI消息添加专家头像 -->
          <div v-if="message.type === 'ai-message'" class="expert-avatar">
            <span>{{ getExpertAbbr(message.expertType) }}</span>
          </div>
          <div class="message-content">
            <div class="message-text" :class="{ 'streaming': index === streamingMessageIndex && isLoading }">
              {{ message.content }}
              <span v-if="index === streamingMessageIndex && isLoading" class="cursor-blink">|</span>
            </div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        
        <div v-if="isLoading && streamingMessageIndex === -1" class="message ai-message">
          <!-- 只有在非流式响应时才显示加载状态 -->
          <div class="expert-avatar">
            <span>{{ getExpertAbbr(expertType) }}</span>
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input-area">
        <div class="input-wrapper">
          <textarea 
            v-model="currentInput"
            placeholder="继续您的对话..."
            class="chat-input"
            rows="3"
            @keydown.enter.prevent="sendMessage"
            :style="{ resize: 'none' }"
          ></textarea>
          <button class="send-btn" @click="sendMessage" :disabled="!currentInput.trim() || isLoading">
            发送
          </button>
        </div>
      </div>
    </div>
    
    <!-- 右侧面板 -->
    <RightPanel />
  </div>
</template>

<script>
import RightPanel from '../components/RightPanel.vue'
import { chatWithDeepSeek, formatMessage, generateExpertSystemPrompt, streamChatWithDeepSeek } from '../utils/deepseekService.js'

export default {
  name: 'Chat',
  components: {
    RightPanel
  },
  data() {
    return {
      messages: [],
      currentInput: '',
      isLoading: false,
      chatMode: '',
      expertType: '',
      mcpOptions: [],
      showExpertDropdown: false,
      availableExperts: ['产品经理', '系统架构师', '后端架构师', '测试工程师', '前端开发专家', 'UI设计师', '数据分析师'],
      // 流式响应相关状态
      streamingMessage: '',
      streamingMessageIndex: -1
    }
  },
  created() {
    // 从路由参数或查询参数获取初始数据
    const { query } = this.$route
    this.chatMode = query.mode || '基础模式'
    this.expertType = query.expert || ''
    this.mcpOptions = query.mcp ? query.mcp.split(',') : []
    
    // 添加初始消息
    if (query.initialMessage) {
      this.addMessage('user', query.initialMessage)
      this.handleAIResponse(query.initialMessage)
    }
    
    // 添加全局点击事件，点击其他区域关闭专家下拉菜单
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeDestroy() {
    // 移除全局事件监听
    document.removeEventListener('click', this.handleClickOutside)
  },
  
  methods: {
    sendMessage() {
      if (!this.currentInput.trim() || this.isLoading) return
      
      const userMessage = this.currentInput.trim()
      this.addMessage('user', userMessage)
      this.currentInput = ''
      
      this.handleAIResponse(userMessage)
    },
    
    addMessage(type, content) {
      const message = {
        type: type === 'user' ? 'user-message' : 'ai-message',
        content,
        timestamp: new Date()
      }
      
      // 为AI消息保存当前的专家类型，这样历史消息可以保留原来的专家类型
      if (type === 'ai') {
        message.expertType = this.expertType
      }
      
      this.messages.push(message)
      
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    
    async handleAIResponse(userInput) {
      this.isLoading = true
      this.streamingMessage = ''
      this.streamingMessageIndex = -1
      
      try {
        // 构建对话消息数组
        const messages = []
        
        // 如果有专家类型，添加系统提示词
        if (this.expertType) {
          const systemPrompt = generateExpertSystemPrompt(this.expertType)
          messages.push(systemPrompt)
        }
        
        // 添加历史对话记录（最近5轮对话）
        const recentMessages = this.messages.slice(-10).map(msg => {
          return formatMessage(
            msg.type === 'user-message' ? 'user' : 'assistant',
            msg.content
          )
        })
        messages.push(...recentMessages)
        
        // 添加当前用户输入
        messages.push(formatMessage('user', userInput))
        
        // 添加一个空的AI消息用于流式更新
        const aiMessage = {
          type: 'ai-message',
          content: '',
          timestamp: new Date(),
          expertType: this.expertType
        }
        this.messages.push(aiMessage)
        this.streamingMessageIndex = this.messages.length - 1
        
        // 使用流式API调用 DeepSeek
        const response = await streamChatWithDeepSeek(
          messages,
          (chunk, fullContent) => {
            // 实时更新消息内容
            if (this.streamingMessageIndex >= 0) {
              this.messages[this.streamingMessageIndex].content = fullContent
              this.streamingMessage = fullContent
              this.$nextTick(() => {
                this.scrollToBottom()
              })
            }
          }
        )
        
        if (!response.success) {
          // 如果流式API失败，移除空消息并尝试常规API
          this.messages.pop()
          this.streamingMessageIndex = -1
          
          const fallbackResponse = await chatWithDeepSeek(messages)
          
          if (fallbackResponse.success) {
            this.addMessage('ai', fallbackResponse.data.content)
          } else {
            // 如果都失败，显示错误消息
            const fallbackResponses = [
              `抱歉，AI服务暂时不可用。基于您的需求"${userInput}"，建议您稍后重试。`,
              `网络连接异常，无法获取AI响应。建议检查网络设置后重试。`,
              `AI服务繁忙，请稍后再试。您也可以尝试重新表述您的问题。`
            ]
            const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
            this.addMessage('ai', fallbackResponse)
            console.error('DeepSeek API 错误:', response.error)
          }
        }
      } catch (error) {
        // 出错时移除可能的空消息
        if (this.streamingMessageIndex >= 0) {
          this.messages.pop()
          this.streamingMessageIndex = -1
        }
        
        console.error('AI对话错误:', error)
        this.addMessage('ai', '抱歉，处理您的请求时出现了错误，请稍后重试。')
      } finally {
        this.isLoading = false
        this.streamingMessage = ''
        this.streamingMessageIndex = -1
      }
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    
    // 获取专家类型的缩写
    getExpertAbbr(messageExpertType) {
      // 使用消息自己的专家类型，如果没有则使用当前全局专家类型
      const expertType = messageExpertType || this.expertType
      
      const expertMap = {
        '产品经理': 'PM',
        '系统架构师': 'SA',
        '后端架构师': '后端',
        '测试工程师': 'QA',
        '前端开发专家': '前端',
        'UI设计师': 'UI',
        '数据分析师': 'BA'
      }
      
      return expertMap[expertType] || (expertType ? expertType : 'AI')
    },
    
    // 切换专家下拉菜单显示
    toggleExpertDropdown() {
      this.showExpertDropdown = !this.showExpertDropdown
    },
    
    // 关闭专家下拉菜单
    closeExpertDropdown() {
      this.showExpertDropdown = false
    },
    
    // 切换专家
    changeExpert(expert) {
      if (this.expertType !== expert) {
        this.expertType = expert
        
        // 添加系统消息通知专家切换
        this.addMessage('ai', `您已切换到 ${expert} 专家模式，我将以 ${expert} 的专业视角为您提供服务。`)
      }
      this.closeExpertDropdown()
    },
    
    // 点击其他区域关闭专家下拉菜单
    handleClickOutside(event) {
      const expertSelector = document.querySelector('.expert-selector')
      if (expertSelector && !expertSelector.contains(event.target)) {
        this.closeExpertDropdown()
      }
    },
  }
}
</script>

<style scoped>
.chat-page {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.chat-header h2 {
  color: white;
  margin: 0 0 10px 0;
  font-size: 24px;
}

.chat-info {
  display: flex;
  gap: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.expert-selector {
  position: relative;
  margin-top: 10px;
}

.switch-expert-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.switch-expert-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.dropdown-icon {
  margin-left: 5px;
  font-size: 10px;
}

.expert-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  z-index: 100;
  overflow: hidden;
  max-height: 300px;
  overflow-y: auto;
}

.expert-option {
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #333;
  font-size: 14px;
}

.expert-option:hover {
  background: #f5f5f5;
}

.expert-option.active {
  background: #e6f7ff;
  color: #1976d2;
  font-weight: 500;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 30px 0 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.message {
  margin-bottom: 20px;
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

/* 专家头像样式 */
.expert-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  color: #a640e5;
  font-size-adjust: 0.545;
  text-align: center;
  border: 2px solid #667eea;
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
}

.user-message .message-content {
  background: rgba(109, 249, 113, 0.8);
  color: rgb(42, 42, 42);
}

.ai-message .message-content {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.message-text {
  white-space: pre-wrap;
  line-height: 1.5;
}

.message-text.streaming {
  position: relative;
}

.cursor-blink {
  display: inline-block;
  animation: blink 1s infinite;
  color: #1976d2;
  font-weight: bold;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.message-time {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 5px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #666;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(1) { animation-delay: 0s; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

.chat-input-area {
  padding: 20px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 12px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  line-height: 1.5;
  min-height: 60px;
  max-height: 120px;
}

.send-btn {
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  background: #1565c0;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
