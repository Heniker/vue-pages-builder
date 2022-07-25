<template>
  <div>
    <h1>
      <router-view></router-view>
    </h1>
    <h3>Matched:</h3>
    <Recursive :items="matched">

    </Recursive>
    <div class="sidebar">
      <p>Startig points</p>
      <div>
        <router-link :to="{ name: names.a }">@/index.vue</router-link>
      </div>
      <div>
        <router-link :to="{ name: names.b }">
          @/parent/index.vue
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: names.c }">
          @/not-parent/index.vue
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: names.d }">
          @/not-parent/not-child.vue
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: names.e }">
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

    const names = Vue.ref({
      a: require.resolve('@/index.vue'),
      b: require.resolve('@/parent/index.vue'),
      c: require.resolve('@/not-parent/index.vue'),
      d: require.resolve('@/not-parent/not-child.vue'),
      e: require.resolve('@/not-parent/parent/index.vue'),
    })

    return { filePath, matched, names }
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
