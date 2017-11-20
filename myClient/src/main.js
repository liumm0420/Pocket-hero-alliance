// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import axios from 'axios';
// 将axios，挂载在Vue的原型中，那么vue的实例对象都可以调用该属性
Vue.prototype.$axios = axios;
// Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

import router from './router'
import './assets/font-awesome/css/font-awesome.min.css'
FastClick.attach(document.body)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 可以通过el属性将vue实例挂载在DOM上
// 也可以通过new Vue().$mount('#app'),手动将实例挂载在DOM上

