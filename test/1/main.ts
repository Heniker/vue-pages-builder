import { buildPages } from 'build-pages'
import * as Vue from 'vue'
import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  resolveComponent as _resolveComponent,
  createVNode as _createVNode,
  createTextVNode as _createTextVNode,
  withCtx as _withCtx,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

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

const app = Vue.createApp(App)

app.use(router)
app.mount('#app')
