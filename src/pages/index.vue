<template>
  <section class="container">
    <div class="row">
      <div class="col-md-8">
        <MangaLatest />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { MangaActions } from '~/store/manga/actions'

export default Vue.extend({
  layout: 'dashboard',
  async asyncData({ store }): Promise<void> {
    await store.dispatch(MangaActions.GET_LIST_MANGA)
  },
})
</script>
