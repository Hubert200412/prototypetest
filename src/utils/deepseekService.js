// utils/deepseekService.js
import OpenAI from 'openai'

// 调试信息
console.log('环境变量 VITE_OPENROUTER_API_KEY:', import.meta.env.VITE_OPENROUTER_API_KEY ? '已设置' : '未设置')

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY, dangerouslyAllowBrowser: true
})

/**
 * 与 DeepSeek AI 进行对话
 * @param {Array} messages - 对话消息数组
 * @param {string} model - 使用的模型，默认为 deepseek-chat-v3
 * @returns {Promise} 返回 AI 响应
 */
export async function chatWithDeepSeek(messages, model = "deepseek/deepseek-chat-v3-0324:free") {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })
    
    return {
      success: true,
      data: completion.choices[0].message,
      usage: completion.usage
    }
  } catch (error) {
    console.error('DeepSeek API 调用错误:', error)
    return {
      success: false,
      error: error.message || '请求失败'
    }
  }
}

/**
 * 流式对话接口（用于实时显示响应）
 * @param {Array} messages - 对话消息数组
 * @param {Function} onMessage - 接收消息流的回调函数
 * @param {string} model - 使用的模型
 */
export async function streamChatWithDeepSeek(messages, onMessage, model = "deepseek/deepseek-chat-v3-0324:free") {
  try {
    const stream = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    })

    let fullContent = ''
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        fullContent += content
        onMessage(content, fullContent)
      }
    }
    
    return {
      success: true,
      content: fullContent
    }
  } catch (error) {
    console.error('DeepSeek 流式 API 调用错误:', error)
    return {
      success: false,
      error: error.message || '流式请求失败'
    }
  }
}

/**
 * 格式化消息为 OpenAI 格式
 * @param {string} role - 角色 (user/assistant/system)
 * @param {string} content - 消息内容
 * @returns {Object} 格式化的消息对象
 */
export function formatMessage(role, content) {
  return {
    role,
    content
  }
}

/**
 * 根据专家类型生成系统提示词
 * @param {string} expertType - 专家类型
 * @returns {Object} 系统消息对象
 */
export function generateExpertSystemPrompt(expertType) {
  const baseLanguageRequirement = '请始终使用中文回答所有问题，保持回答的专业性和准确性。'
  
  const prompts = {
    '产品经理': `你是一位经验丰富的产品经理，擅长需求分析、产品规划和用户体验设计。请以产品经理的视角回答问题。${baseLanguageRequirement}`,
    '系统架构师': `你是一位资深系统架构师，擅长系统设计、技术选型和架构优化。请以系统架构师的视角回答问题。${baseLanguageRequirement}`,
    '后端架构师': `你是一位专业的后端架构师，擅长后端开发、数据库设计和服务器架构。请以后端架构师的视角回答问题。${baseLanguageRequirement}`,
    '测试工程师': `你是一位专业的测试工程师，擅长测试策略、质量保证和自动化测试。请以测试工程师的视角回答问题。${baseLanguageRequirement}`,
    '前端开发专家': `你是一位前端开发专家，擅长前端技术、用户界面开发和性能优化。请以前端开发专家的视角回答问题。${baseLanguageRequirement}`,
    'UI设计师': `你是一位优秀的UI设计师，擅长用户界面设计、交互设计和视觉设计。请以UI设计师的视角回答问题。${baseLanguageRequirement}`,
    '数据分析师': `你是一位专业的数据分析师，擅长数据分析、数据可视化和业务洞察。请以数据分析师的视角回答问题。${baseLanguageRequirement}`
  }
  
  const prompt = prompts[expertType] || `你是一位AI助手，请专业地回答用户的问题。${baseLanguageRequirement}`
  
  return formatMessage('system', prompt)
}
