<template>
  <div>
    <div
      v-for="(manga, index) in mangas"
      :key="manga._id"
      class="flex items-center pb-3 mb-3 border-b border-gray-300 last:border-b-0"
    >
      <span class="mr-4 w-4 text-xl">{{ index + 1 }}</span>
      <nuxt-link
        class="w-20 h-16 inline-block overflow-hidden relative mr-4 transition group"
        :to="{ name: 'slug', params: { slug: manga.slug } }"
      >
        <img
          v-lazy="manga.imagePreview"
          class="w-full absolute transform right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2"
        />
        <div class="absolute left-0 right-0 top-0 bottom-0 bg-black opacity-0 group-hover:opacity-25" />
      </nuxt-link>
      <div class="flex-1">
        <h6>
          <nuxt-link
            :to="{ name: 'slug', params: { slug: manga.slug } }"
            class="text-gray-900 no-underline transition hover:text-primary"
            >{{ manga.name }}</nuxt-link
          >
        </h6>
        <div class="flex justify-between">
          <nuxt-link
            class="text-sm text-gray-900 no-underline transition hover:text-primary"
            :to="{
              name: 'slug-chapter',
              params: {
                slug: manga.slug,
                chapter: getFirstChapterNumber(manga),
              },
            }"
          >
            Chapter {{ getFirstChapterNumber(manga) }}
          </nuxt-link>
          <span class="text-gray-600 italic text-xs">
            {{ manga.viewCount | formatCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  props: {
    mangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Manga[]>,
  },
  methods: {
    getFirstChapterNumber(manga: Manga): string {
      return manga.chapters[0] ? manga.chapters[0].number : '-1'
    },
  },
})
</script>
