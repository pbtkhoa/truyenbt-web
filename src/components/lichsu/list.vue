<template>
  <ul class="grid grid-cols-4 gap-5 p-0 mb-0 list-none">
    <li v-for="manga in mangas" :key="manga._id">
      <nuxt-link
        class="relative block w-full rounded overflow-hidden mb-2 group"
        :to="{ name: 'slug', params: { slug: manga.slug } }"
      >
        <img v-lazy="manga.imagePreview" class="transition duration-300 w-full transform group-hover:scale-110" />
        <div class="absolute inset-0 bg-black opacity-0 transition duration-300 group-hover:opacity-25" />
      </nuxt-link>
      <h3 class="text-center font-semibold text-sm overflow-hidden h-10">
        <nuxt-link
          :to="{ name: 'slug', params: { slug: manga.slug } }"
          class="no-underline text-black transition hover:text-primary"
          >{{ manga.name }}</nuxt-link
        >
      </h3>
      <nuxt-link
        :to="{
          name: 'slug-chapter',
          params: { slug: manga.slug, chapter: manga.chapterNumber },
        }"
        class="no-underline text-black text-center block text-sm transition hover:text-primary"
      >
        Đọc tiếp chương {{ manga.chapterNumber }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import MangaHistory from '~/models/MangaHistory'

export default Vue.extend({
  props: {
    mangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<MangaHistory[]>,
  },
})
</script>
