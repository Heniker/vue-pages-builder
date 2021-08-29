<template>
  <div>
    <router-view></router-view>
  </div>
  <div class="sidebar">
    <p>Startig points</p>
    <div>
      <router-link :to="{ name: require.resolve('@/index.vue') }">@/index.vue</router-link>
    </div>
    <div>
      <router-link :to="{ name: require.resolve('@/parent/index.vue') }">
        @/parent/index.vue
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: require.resolve('@/not-parent/index.vue') }">
        @/not-parent/index.vue
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: require.resolve('@/not-parent/not-child.vue') }">
        @/not-parent/not-child.vue
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: require.resolve('@/not-parent/parent/index.vue') }">
        @/not-parent/parent.vue
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: absolute;
  right: 50px;
  top: 50px;
}
</style>
