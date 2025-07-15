<template>
  <div class="docs-page">
    <div class="docs-container">
      <!-- 文档导航 -->
      <aside class="docs-sidebar">
        <div class="docs-nav">
          <h3>使用文档</h3>
          <div class="nav-section">
            <h4>快速开始</h4>
            <ul>
              <li :class="{ active: activeSection === 'introduction' }" @click="scrollToSection('introduction')">平台介绍</li>
              <li :class="{ active: activeSection === 'getting-started' }" @click="scrollToSection('getting-started')">快速上手</li>
              <li :class="{ active: activeSection === 'account-setup' }" @click="scrollToSection('account-setup')">账户设置</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>功能指南</h4>
            <ul>
              <li :class="{ active: activeSection === 'nl2code' }" @click="scrollToSection('nl2code')">自然语言开发</li>
              <li :class="{ active: activeSection === 'mcp-guide' }" @click="scrollToSection('mcp-guide')">MCP模块使用</li>
              <li :class="{ active: activeSection === 'expert-mode' }" @click="scrollToSection('expert-mode')">专家模式</li>
              <li :class="{ active: activeSection === 'workshop' }" @click="scrollToSection('workshop')">智造车间</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>高级功能</h4>
            <ul>
              <li :class="{ active: activeSection === 'api-integration' }" @click="scrollToSection('api-integration')">API集成</li>
              <li :class="{ active: activeSection === 'deployment' }" @click="scrollToSection('deployment')">项目部署</li>
              <li :class="{ active: activeSection === 'collaboration' }" @click="scrollToSection('collaboration')">团队协作</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>FAQ</h4>
            <ul>
              <li :class="{ active: activeSection === 'troubleshooting' }" @click="scrollToSection('troubleshooting')">故障排除</li>
              <li :class="{ active: activeSection === 'faq' }" @click="scrollToSection('faq')">常见问题</li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- 文档内容 -->
      <main class="docs-content">
        <!-- 平台介绍 -->
        <section id="introduction" class="doc-section">
          <h1>智造工厂 - 零代码自然语言开发平台</h1>
          <p class="intro-text">智造工厂是一个基于自然语言的零代码开发平台，通过先进的AI技术和原子化能力组装，让非技术人员也能快速构建各类应用产品。</p>
          
          <div class="feature-highlights">
            <div class="highlight-card">
              <h3>自然语言开发</h3>
              <p>用自然语言描述需求，AI自动生成代码和界面</p>
            </div>
            <div class="highlight-card">
              <h3>尖端技术能力</h3>
              <p>基于MCP、multi-agent、PRA等技术辅助用户快速组装构思的项目</p>
            </div>
            <div class="highlight-card">
              <h3>数据安全</h3>
              <p>隐私计算技术保护数据安全，支持私有化部署</p>
            </div>
            <div class="highlight-card">
              <h3>快速部署</h3>
              <p>一键部署到云端，支持多种部署环境</p>
            </div>
          </div>
        </section>

        <!-- 快速上手 -->
        <section id="getting-started" class="doc-section">
          <h2>快速上手</h2>
          <div class="step-guide">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>注册账号</h3>
                <p>访问智造工厂官网，点击"立即体验"按钮注册账号。支持邮箱、手机号注册。</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>选择开发模式</h3>
                <p>根据需求选择"对话"、"快速生产"或"深度智造"模式，选择合适的专家助手。</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>描述需求</h3>
                <p>在输入框中用自然语言详细描述您的应用需求，AI将自动理解并生成解决方案。</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>预览和部署</h3>
                <p>查看生成的应用预览，确认无误后一键部署到生产环境。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 账户设置 -->
        <section id="account-setup" class="doc-section">
          <h2>账户设置</h2>
          <h3>个人信息管理</h3>
          <p>在个人中心可以修改基本信息、上传头像、设置个人简介等。</p>
          
          <h3>安全设置</h3>
          <ul>
            <li>修改登录密码</li>
            <li>绑定手机号和邮箱</li>
            <li>启用两步验证</li>
            <li>查看登录日志</li>
          </ul>
          
          <h3>订阅管理</h3>
          <p>查看当前订阅状态，升级或降级订阅套餐，管理付费功能。</p>
        </section>
        
        <!-- 自然语言开发 -->
        <section id="nl2code" class="doc-section">
          <h2>自然语言开发指南</h2>
          <p>智造工厂的核心功能是将自然语言需求转换为可执行的应用程序。</p>
          
          <h3>如何描述需求</h3>
          <div class="code-example">
            <h4>示例：创建用户管理系统</h4>
            <pre><code>我需要创建一个用户管理系统，包括以下功能：
1. 用户注册和登录
2. 用户信息管理（增删改查）
3. 权限管理（管理员、普通用户）
4. 数据导出功能
5. 用户操作日志记录

界面要求：
- 响应式设计，支持移动端
- 现代化UI风格
- 支持暗黑模式</code></pre>
          </div>

          <h3>需求描述技巧</h3>
          <ul class="tip-list">
            <li><strong>功能明确：</strong>详细列出所需的功能模块</li>
            <li><strong>界面要求：</strong>说明UI/UX的具体要求</li>
            <li><strong>技术约束：</strong>提及特殊的技术需求或限制</li>
            <li><strong>业务场景：</strong>描述具体的使用场景和用户角色</li>
          </ul>
        </section>

        <!-- MCP指南 -->
        <section id="mcp-guide" class="doc-section">
          <h2>MCP模块使用指南</h2>
          <p>MCP（Model Context Protocol）是智造工厂的核心原子化能力，支持各种功能模块的快速集成。</p>
          
          <h3>内置MCP模块</h3>
          <div class="mcp-grid">
            <div class="mcp-card">
              <h4>沃支付</h4>
              <p>定位：支付和交易处理</p>
              <p>功能：在线支付、退款处理、交易记录查询</p>
            </div>
            <div class="mcp-card">
              <h4>小鱼分</h4>
              <p>定位：用户信用评估</p>
              <p>功能：信用评分、风险评估、行为分析</p>
            </div>
            <div class="mcp-card">
              <h4>余额宝</h4>
              <p>定位：资金管理和收益增值</p>
              <p>功能：资金存取、收益计算、投资建议</p>
            </div>
            <div class="mcp-card">
              <h4>Github</h4>
              <p>定位：版本控制和协作开发</p>
              <p>功能：知识库同步、问题追踪集成、自动化部署流水线</p>
            </div>
          </div>

          <h3>自定义MCP</h3>
          <p>除了内置模块，您还可以创建自定义MCP模块来满足特殊需求。</p>
        </section>

        <!-- 专家模式 -->
        <section id="expert-mode" class="doc-section">
          <h2>专家模式</h2>
          <p>专家模式为高级用户提供更精细的控制能力。</p>
          
          <h3>代码编辑</h3>
          <p>直接编辑生成的代码，支持语法高亮和智能提示。</p>
          
          <h3>架构设计</h3>
          <p>自定义系统架构，选择技术栈，配置数据库连接。</p>
          
          <h3>高级配置</h3>
          <ul>
            <li>环境变量配置</li>
            <li>API接口定制</li>
            <li>性能优化设置</li>
            <li>安全策略配置</li>
          </ul>
        </section>

        <!-- 智造车间 -->
        <section id="workshop" class="doc-section">
          <h2>智造车间</h2>
          <p>智造车间是协作开发的核心功能，支持团队成员共同参与项目开发。</p>
          
          <h3>项目管理</h3>
          <ul>
            <li>创建和管理项目</li>
            <li>邀请团队成员</li>
            <li>分配开发任务</li>
            <li>跟踪项目进度</li>
          </ul>
          
          <h3>协作开发</h3>
          <p>实时协作编辑，版本控制，代码审查流程。</p>
          
          <h3>资源共享</h3>
          <p>共享组件库、模板、MCP模块等开发资源。</p>
        </section>

        <!-- API集成 -->
        <section id="api-integration" class="doc-section">
          <h2>API集成</h2>
          <p>支持第三方API集成，扩展应用功能。</p>
          
          <h3>REST API</h3>
          <p>支持标准REST API调用，自动生成接口文档。</p>
          
          <h3>GraphQL</h3>
          <p>支持GraphQL查询，灵活的数据获取方式。</p>
          
          <h3>WebSocket</h3>
          <p>实时数据推送，双向通信支持。</p>
        </section>

        <!-- 项目部署 -->
        <section id="deployment" class="doc-section">
          <h2>项目部署</h2>
          <p>一键部署到多种云平台，支持自动化CI/CD流程。</p>
          
          <h3>支持平台</h3>
          <ul>
            <li>阿里云</li>
            <li>腾讯云</li>
            <li>华为云</li>
            <li>AWS</li>
            <li>私有化部署</li>
          </ul>
          
          <h3>部署配置</h3>
          <p>配置域名、SSL证书、环境变量等部署参数。</p>
          
          <h3>监控运维</h3>
          <p>实时监控应用状态，日志查看，性能分析。</p>
        </section>

        <!-- 团队协作 -->
        <section id="collaboration" class="doc-section">
          <h2>团队协作</h2>
          <p>完善的团队协作功能，提高开发效率。</p>
          
          <h3>权限管理</h3>
          <ul>
            <li>角色分配（管理员、开发者、测试员）</li>
            <li>项目权限控制</li>
            <li>操作日志记录</li>
          </ul>
          
          <h3>沟通工具</h3>
          <p>内置聊天工具，项目讨论区，任务评论功能。</p>
          
          <h3>文档协作</h3>
          <p>共享文档编辑，需求文档管理，技术文档维护。</p>
        </section>

        <!-- 故障排除 -->
        <section id="troubleshooting" class="doc-section">
          <h2>故障排除</h2>
          <p>常见问题的解决方案和故障排除指南。</p>
          
          <h3>部署问题</h3>
          <ul>
            <li>部署失败：检查配置文件和环境变量</li>
            <li>访问超时：检查网络连接和防火墙设置</li>
            <li>启动失败：查看错误日志，检查依赖包</li>
          </ul>
          
          <h3>性能问题</h3>
          <ul>
            <li>响应缓慢：优化数据库查询，启用缓存</li>
            <li>内存溢出：调整内存配置，优化代码逻辑</li>
            <li>并发问题：使用负载均衡，优化并发处理</li>
          </ul>
          
          <h3>数据问题</h3>
          <ul>
            <li>数据丢失：检查备份策略，恢复数据</li>
            <li>同步异常：检查网络连接，重新同步</li>
            <li>格式错误：验证数据格式，修正错误数据</li>
          </ul>
        </section>

        <!-- FAQ -->
        <section id="faq" class="doc-section">
          <h2>常见问题</h2>
          <div class="faq-list">
            <div class="faq-item">
              <h3>Q: 智造工厂支持哪些类型的应用开发？</h3>
              <p>A: 智造工厂支持Web应用、移动应用、小程序、工作流系统等多种类型的应用开发，涵盖前端、后端、数据库等全栈开发。</p>
            </div>
            <div class="faq-item">
              <h3>Q: 生成的代码质量如何保证？</h3>
              <p>A: 我们采用多层质量保证机制，包括代码审查、自动化测试、性能优化等，确保生成的代码符合行业标准。</p>
            </div>
            <div class="faq-item">
              <h3>Q: 是否支持代码导出和二次开发？</h3>
              <p>A: 是的，您可以导出生成的源代码，并进行二次开发和定制化修改。</p>
            </div>
            <div class="faq-item">
              <h3>Q: 数据安全如何保障？</h3>
              <p>A: 我们采用隐私计算技术，数据在本地加密处理，支持私有化部署，确保数据安全。</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- 底部支持区域 -->
    <footer class="docs-footer">
      <div class="footer-content">
        <div class="support-section">
          <h3>需要帮助？</h3>
          <p>我们的专业团队随时为您提供支持</p>
          <div class="support-actions">
            <button class="support-btn primary" @click="openCustomerService">
              联系客服
            </button>
            <button class="support-btn secondary" @click="openFeedback">
              问题反馈
            </button>
            <button class="support-btn secondary" @click="openCommunity">
              社区论坛
            </button>
          </div>
        </div>
        
        <div class="contact-info">
          <div class="contact-item">
            <h4>客服热线</h4>
            <p>400-888-0123</p>
            <span>工作日 9:00-18:00</span>
          </div>
          <div class="contact-item">
            <h4>技术支持</h4>
            <p>support@zhizao.com</p>
            <span>24小时内回复</span>
          </div>
          <div class="contact-item">
            <h4>商务合作</h4>
            <p>business@zhizao.com</p>
            <span>48小时内回复</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Docs',
  setup() {
    const activeSection = ref('introduction')
    
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        activeSection.value = sectionId
      }
    }
    
    const openCustomerService = () => {
      // 这里可以集成客服系统
      alert('正在连接客服，请稍候...')
    }
    
    const openFeedback = () => {
      // 这里可以打开反馈表单
      alert('正在打开反馈表单...')
    }
    
    const openCommunity = () => {
      // 这里可以跳转到社区论坛
      window.open('https://community.zhizao.com', '_blank')
    }
    
    // 监听滚动事件，更新活跃章节
    const handleScroll = () => {
      const sections = ['introduction', 'getting-started', 'account-setup', 'nl2code', 'mcp-guide', 'expert-mode', 'workshop', 'api-integration', 'deployment', 'collaboration', 'faq', 'troubleshooting']
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection.value = sectionId
            break
          }
        }
      }
    }
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      activeSection,
      scrollToSection,
      openCustomerService,
      openFeedback,
      openCommunity
    }
  }
}
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  background: #f8f9fa;
  width: 80%;
  margin-left: auto;
  padding-top: 60px;
  border-radius: 20px;
}

.docs-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
}

.docs-sidebar {
  width: 280px;
  background: white;
  padding: 30px 20px;
  border-right: 1px solid #e9ecef;
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
  z-index: 10;
}

.docs-nav h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1976d2;
}

.nav-section {
  margin-bottom: 25px;
}

.nav-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.nav-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-section li {
  padding: 8px 12px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #666;
}

.nav-section li:hover {
  background: #e3f2fd;
  color: #1976d2;
}

.nav-section li.active {
  background: #1976d2;
  color: white;
  font-weight: 500;
}

.docs-content {
  flex: 1;
  right: 10%;
  position: relative;
  padding: 30px 40px;
  background: white;
  margin: 20px 20px 20px 300px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.doc-section {
  margin-bottom: 50px;
  scroll-margin-top: 80px;
}

.doc-section h1 {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.doc-section h2 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.doc-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 24px 0 12px 0;
}

.intro-text {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.feature-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.highlight-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.highlight-card h3 {
  font-size: 16px;
  margin-top: 3px;
  color: #333;
}

.highlight-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.step-guide {
  margin: 30px 0;
}

.step {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: flex-start;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #1976d2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.step-content p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #1976d2;
}

.code-example h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
}

.code-example pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.tip-list {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
}

.tip-list li {
  margin-bottom: 8px;
  color: #333;
}

.mcp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.mcp-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mcp-card h4 {
  margin: 0 0 8px 0;
  color: #1976d2;
  font-size: 16px;
}

.mcp-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.faq-list {
  margin: 20px 0;
}

.faq-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.faq-item h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.docs-footer {
  background: #2d3748;
  color: white;
  padding: 40px 0;
  border-radius: 0 0 20px 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.support-section {
  text-align: center;
  margin-bottom: 40px;
}

.support-section h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.support-section p {
  color: #a0aec0;
  margin-bottom: 24px;
}

.support-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.support-btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.support-btn.primary {
  background: #1976d2;
  color: white;
}

.support-btn.primary:hover {
  background: #1565c0;
}

.support-btn.secondary {
  background: transparent;
  color: #e2e8f0;
  border: 1px solid #4a5568;
}

.support-btn.secondary:hover {
  background: #4a5568;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  border-top: 1px solid #4a5568;
  padding-top: 30px;
}

.contact-item h4 {
  margin: 0 0 8px 0;
  color: #e2e8f0;
  font-size: 16px;
}

.contact-item p {
  margin: 0 0 4px 0;
  color: #1976d2;
  font-weight: 600;
  font-size: 16px;
}

.contact-item span {
  color: #a0aec0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .docs-container {
    flex-direction: column;
  }
  
  .docs-sidebar {
    width: 100%;
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
  
  .docs-content {
    margin: 0;
    border-radius: 0;
  }
  
  .docs-footer {
    margin-left: 0;
  }
  
  .support-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .support-btn {
    width: 200px;
  }
}

/* 自定义滚动条样式 */
.docs-sidebar::-webkit-scrollbar {
  width: 6px;
}

.docs-sidebar::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.docs-sidebar::-webkit-scrollbar-thumb {
  background: #d0d7de;
  border-radius: 3px;
}

.docs-sidebar::-webkit-scrollbar-thumb:hover {
  background: #b8c5d1;
}

/* MCP卡片样式 */
.mcp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.mcp-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.mcp-card h4 {
  color: #1976d2;
  margin-bottom: 10px;
  font-size: 18px;
}

.mcp-card p {
  margin: 5px 0;
  color: #666;
}
</style>
