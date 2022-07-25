<template>{{ filePath }}</template>

<script lang="ts">
export default {
  data() { return { filePath: __filename.slice(0, __filename.length - __resourceQuery.length) } }
}
</script>