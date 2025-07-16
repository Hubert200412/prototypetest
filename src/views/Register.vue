<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>创建账户</h1>
        <p>加入智造工厂，开启您的智能制造之旅</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            placeholder="请输入用户名"
            required
            :class="{ 'error': usernameError }"
          />
          <div v-if="usernameError" class="field-error">{{ usernameError }}</div>
        </div>
        
        <div class="form-group">
          <label for="email">邮箱地址</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
            :class="{ 'error': emailError }"
          />
          <div v-if="emailError" class="field-error">{{ emailError }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码（至少6位）"
            required
            :class="{ 'error': passwordError }"
          />
          <div v-if="passwordError" class="field-error">{{ passwordError }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            required
            :class="{ 'error': confirmPasswordError }"
          />
          <div v-if="confirmPasswordError" class="field-error">{{ confirmPasswordError }}</div>
        </div>
        
        <div class="form-options">
          <label class="agree-terms">
            <input type="checkbox" v-model="registerForm.agreeTerms" class="checkbox" required />
            <span class="checkmark"></span>
            我已阅读并同意<a href="#" @click.prevent="showTerms">服务条款</a>和<a href="#" @click.prevent="showPrivacy">隐私政策</a>
          </label>
        </div>
        
        <button type="submit" class="register-btn" :disabled="isLoading || !isFormValid">
          {{ isLoading ? '注册中...' : '立即注册' }}
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
      
      <div class="register-footer">
        <p>已有账号？<a href="#" @click.prevent="goToLogin">立即登录</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  computed: {
    usernameError() {
      if (!this.registerForm.username) return ''
      if (this.registerForm.username.length < 3) return '用户名至少3个字符'
      if (!/^[a-zA-Z0-9_]+$/.test(this.registerForm.username)) return '用户名只能包含字母、数字和下划线'
      return ''
    },
    
    emailError() {
      if (!this.registerForm.email) return ''
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.registerForm.email)) return '请输入有效的邮箱地址'
      return ''
    },
    
    passwordError() {
      if (!this.registerForm.password) return ''
      if (this.registerForm.password.length < 6) return '密码至少6个字符'
      return ''
    },
    
    confirmPasswordError() {
      if (!this.registerForm.confirmPassword) return ''
      if (this.registerForm.password !== this.registerForm.confirmPassword) return '两次输入的密码不一致'
      return ''
    },
    
    isFormValid() {
      return !this.usernameError && 
             !this.emailError && 
             !this.passwordError && 
             !this.confirmPasswordError &&
             this.registerForm.username &&
             this.registerForm.email &&
             this.registerForm.password &&
             this.registerForm.confirmPassword &&
             this.registerForm.agreeTerms
    }
  },
  methods: {
    async handleRegister() {
      this.isLoading = true
      this.errorMessage = ''
      
      try {
        // 模拟注册验证
        await this.validateRegister()
        
        // 注册成功，显示提示并跳转到登录页
        alert('注册成功！请登录您的账户。')
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.isLoading = false
      }
    },
    
    async validateRegister() {
      // 模拟注册验证（检查用户名是否已存在）
      const existingUsers = ['Sonetto_2004', 'admin', 'test']
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (existingUsers.includes(this.registerForm.username)) {
            reject(new Error('用户名已存在，请选择其他用户名'))
          } else {
            resolve()
          }
        }, 2000)
      })
    },
    
    goToLogin() {
      this.$router.push('/login')
    },
    
    showTerms() {
      alert('服务条款页面尚未开发')
    },
    
    showPrivacy() {
      alert('隐私政策页面尚未开发')
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.register-header p {
  color: #666;
  font-size: 16px;
}

.register-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error {
  border-color: #e74c3c;
}

.field-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.form-options {
  margin-bottom: 25px;
}

.agree-terms {
  display: flex;
  align-items: flex-start;
  color: #666;
  cursor: pointer;
  position: relative;
  padding-left: 30px;
  font-size: 14px;
  line-height: 1.4;
}

.agree-terms .checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  left: 0;
  top: 2px;
  width: 20px;
  height: 20px;
}

.agree-terms .checkmark {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #e1e5e9;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.agree-terms:hover .checkmark {
  border-color: #667eea;
}

.agree-terms .checkbox:checked ~ .checkmark {
  background-color: #667eea;
  border-color: #667eea;
}

.agree-terms .checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.agree-terms .checkbox:checked ~ .checkmark:after {
  display: block;
}

.agree-terms a {
  color: #667eea;
  text-decoration: none;
}

.agree-terms a:hover {
  text-decoration: underline;
}

.register-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #ccc;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  background: #ffeaea;
  padding: 10px;
  border-radius: 6px;
}

.register-footer {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.register-footer a {
  color: #667eea;
  text-decoration: none;
}

.register-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-card {
    padding: 30px 20px;
  }
  
  .register-header h1 {
    font-size: 24px;
  }
}
</style>
