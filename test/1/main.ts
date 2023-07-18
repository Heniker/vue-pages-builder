import { buildPages } from 'build-pages'
import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

const routes = buildPages(
  require.context('./pages', true, /.*/, 'weak'),
  require.context('./pages', true, /.*/, 'lazy')
)

console.log(routes)

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

const app = Vue.createApp(App)

app.use(router)
app.mount('#app')
