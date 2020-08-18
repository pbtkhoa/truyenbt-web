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

export default Vue.extend({
  layout: 'dashboard',
  components: {
    // MangaLatest,
  },
})
</script>
