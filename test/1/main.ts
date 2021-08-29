import { buildPages } from '../..'
import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

const app = Vue.createApp(App)

const routes = buildPages(
  require.context('./pages', true, /.*/, 'weak'),
  require.context('./pages', true, /.*/, 'lazy')
)

console.log('routes:')
console.log(routes)

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
