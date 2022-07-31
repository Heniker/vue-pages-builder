<template>
  <div>
    <h1>
      <router-view></router-view>
    </h1>

    <h3>Matched:</h3>
    <Recursive :items="matched"></Recursive>

    <div class="sidebar">
      <p>Starting points</p>
      <div>
        <router-link :to="{ name: require.resolve('@/index.vue') }">@/index.vue</router-link>
      </div>
      <div>
        <router-link :to="{ name: require.resolve('@/parent.vue') }">
          @/parent.vue
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
        <router-link :to="{ name: require.resolve('@/not-parent/parent.vue') }">
          @/not-parent/parent.vue
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import * as Router from 'vue-router'
import Recursive from './Recursive.vue'

export default Vue.defineComponent({
  components: { Recursive },
  setup() {
    const router = Router.useRouter()

    const filePath = Vue.ref(__filename.slice(0, __filename.length - __resourceQuery.length))
    const matched = Vue.computed(() => router.currentRoute.value.matched)

    return { filePath, matched }
  }
})
</script>

<style scoped>
.sidebar {
  position: absolute;
  right: 50px;
  top: 50px;
}
</style>
