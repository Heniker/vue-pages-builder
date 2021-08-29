<template>
  <div>
    <h1>{{ filePath }}</h1>
    <p>Matched Children:</p>
    <p>Go to:</p>
    <router-link :to="{ name: require.resolve('@/parent/child.vue') }">
      @/parent/child.vue
    </router-link>
    <router-link :to="{ name: require.resolve('@/parent/child2.vue') }">
      @/parent/child2.vue
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {
  data: () => ({ filePath: __filename.slice(0, __filename.length - __resourceQuery.length) }),
}
</script>
