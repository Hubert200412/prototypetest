import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Plans from '../views/Plans.vue'
import PlanDetail from '../views/PlanDetail.vue'
import Chat from '../views/Chat.vue'
import Profile from '../views/Profile.vue'
import Docs from '../views/Docs.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Network from '../views/Network.vue'
import News from '../views/News.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Community from '../views/Community.vue'

// 懒加载页面
const ProjectCreate = () => import('../views/ProjectCreate.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  },
  {
    path: '/plans/:planId',
    name: 'PlanDetail',
    component: PlanDetail,
    props: true
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true
  },
  {
    path: '/projects/create',
    name: 'ProjectCreate',
    component: ProjectCreate,
    props: (route) => ({ category: route.query.category })
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  },
  {
    path: '/network/teams',
    name: 'NetworkTeams',
    component: Network
  },
  {
    path: '/network/settings',
    name: 'NetworkSettings',
    component: () => import('../views/NetworkSettings.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/network/community',
    name: 'Community',
    component: Community
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 检查用户登录状态
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const publicPages = ['Login', 'Register', 'ForgotPassword']
  
  // 如果要访问登录相关页面且已经登录，重定向到首页
  if (publicPages.includes(to.name) && isLoggedIn) {
    next('/')
    return
  }
  
  // 如果要访问需要登录的页面但未登录，重定向到登录页
  if (!publicPages.includes(to.name) && !isLoggedIn) {
    next('/login')
    return
  }
  
  next()
})

export default router
