<template>
  <div>
    <h1>{{ filePath }}</h1>
    <router-view></router-view>
    <p>Go to:</p>
    <p>Matched Children:</p>
  </div>
</template>
<script lang="ts">
export default {
  data: () => ({ filePath: __filename.slice(0, __filename.length - __resourceQuery.length) }),
}
</script>
