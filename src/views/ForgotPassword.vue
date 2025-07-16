<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <div class="forgot-password-header">
        <h1>忘记密码</h1>
        <p>请输入您的用户名或邮箱，我们将发送重置链接到您的邮箱</p>
      </div>
      
      <form @submit.prevent="handleResetPassword" class="forgot-password-form">
        <div class="form-group">
          <label for="identifier">用户名或邮箱</label>
          <input
            id="identifier"
            v-model="resetForm.identifier"
            type="text"
            placeholder="请输入用户名或邮箱地址"
            required
          />
        </div>
        
        <button type="submit" class="reset-btn" :disabled="isLoading">
          {{ isLoading ? '发送中...' : '发送重置链接' }}
        </button>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
      
      <div class="forgot-password-footer">
        <p>想起密码了？<a href="#" @click.prevent="goToLogin">返回登录</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      resetForm: {
        identifier: ''
      },
      isLoading: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async handleResetPassword() {
      this.isLoading = true
      this.errorMessage = ''
      this.successMessage = ''
      
      try {
        // 模拟密码重置请求
        await this.sendResetLink()
        this.successMessage = '重置链接已发送到您的邮箱，请查收并按照邮件指示重置密码。'
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.isLoading = false
      }
    },
    
    async sendResetLink() {
      // 模拟发送重置链接
      const validIdentifiers = ['Sonetto_2004', 'sonetto@example.com']
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (validIdentifiers.includes(this.resetForm.identifier)) {
            resolve()
          } else {
            reject(new Error('用户名或邮箱不存在'))
          }
        }, 2000)
      })
    },
    
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.forgot-password-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
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

.forgot-password-header {
  text-align: center;
  margin-bottom: 30px;
}

.forgot-password-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.forgot-password-header p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.forgot-password-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 25px;
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

.reset-btn {
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
  margin-bottom: 15px;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.reset-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  color: #27ae60;
  text-align: center;
  font-size: 14px;
  background: #d5f4e6;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 14px;
  background: #ffeaea;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.forgot-password-footer {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.forgot-password-footer a {
  color: #667eea;
  text-decoration: none;
}

.forgot-password-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .forgot-password-card {
    padding: 30px 20px;
  }
  
  .forgot-password-header h1 {
    font-size: 24px;
  }
  
  .forgot-password-header p {
    font-size: 13px;
  }
}
</style>
