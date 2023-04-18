import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import dayjs from 'dayjs'

Vue.use(mavonEditor)
Vue.use(ElementUI)

Vue.prototype.dayjs = dayjs
//创建实例
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(app)
