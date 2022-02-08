import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Services from '../views/Services.vue'
import Admin from '../views/Admin.vue'
import HistoryBalance from '../views/HistoryBalance.vue'
import AdminServices from '../views/AdminServices.vue'
import AdminHome from '../views/AdminHome.vue'
import AdminHistoryBalance from '../views/AdminHistoryBalance.vue'
import AdminUsers from '../views/AdminUsers.vue'
import CreateUsersService from '../views/CreateUsersService.vue'
import UpdateUser from '../views/UpdateUser.vue'
import UpdateService from '../views/UpdateService.vue'
import AddService from '../views/AddService.vue'
import SendMoney from '../views/SendMoney.vue'
import  ServiceHistory from '../views/ServiceHistory.vue'
import  HistoryDetail from '../views/HistoryDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/sendMoney',
    name: 'SendMoney',
    component: SendMoney
  },
  {
    path: '/historyDetail/:id',
    name: 'HistoryDetail',
    component: HistoryDetail
  },
  {
    path: '/updateService/:id',
    name: 'UpdateService',
    component: UpdateService
  },
  {
    path: '/updateUser/:id',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/serviceHistory',
    name: 'ServiceHistory',
    component: ServiceHistory
  },
  {
    path: '/addService/',
    name: 'AddService',
    component: AddService
  },
  {
    path: '/adminHistoryBalance',
    name: 'AdminHistoryBalance',
    component: AdminHistoryBalance
  },
  {
    path: '/createUsersService',
    name: 'CreateUsersService',
    component: CreateUsersService
  },
  {
    path: '/adminUsers',
    name: 'AdminUsers',
    component: AdminUsers
  },
  {
    path: '/adminServices',
    name: 'AdminServices',
    component: AdminServices
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/historyBalance',
    name: 'HistoryBalance',
    component: HistoryBalance
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
