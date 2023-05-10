<template>
  <ul>
    <li v-for="item in items">
      <router-link :to="{ name: item.name }">{{ item.path || '/' }}</router-link>
      <Recursive :items="item.children"></Recursive>
      <p></p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Recursive',
  props: { items: Object as PropType<import('vue-router').RouteLocationMatched[] | import('vue-router').RouteRecordRaw[]> },
})
</script>
