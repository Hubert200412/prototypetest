import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Plans from '../views/Plans.vue'
import PlanDetail from '../views/PlanDetail.vue'
import Chat from '../views/Chat.vue'
import Profile from '../views/Profile.vue'
import Docs from '../views/Docs.vue'
import Projects from '../views/Projects.vue'
import Network from '../views/Network.vue'
import News from '../views/News.vue'

// 懒加载页面
const ProjectCreate = () => import('../views/ProjectCreate.vue')

const routes = [
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
    path: '/network',
    name: 'Network',
    component: Network
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
