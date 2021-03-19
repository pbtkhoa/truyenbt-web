<template>
  <div class="bg-white py-2">
    <div class="container mx-auto px-4">
      <h2>Danh sách chương</h2>
      <div class="grid grid-cols-2 gap-x-5 gap-y-3">
        <div v-for="chapter in chapters" :key="chapter._id">
          <nuxt-link
            :to="{
              name: 'slug-chapter',
              params: { slug: slug, chapter: chapter.number },
            }"
            class="flex justify-between px-2 py-1.5 bg-gray-200 rounded no-underline cursor-pointer transition group hover:bg-gray-300"
          >
            <div class="text-gray-900 group-hover:text-primary">Chương {{ chapter.number }}</div>
            <div class="flex flex-1 items-center justify-end">
              <span class="text-gray-900 text-xs">
                <font-awesome-icon icon="eye" class="mr-2" />{{ chapter.viewCount | formatCount }}
              </span>
              <time class="ml-5 text-gray-900 text-xs">{{ chapter.publishedAt | formatDate }}</time>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Chapter from '~/models/Chapter'

export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: '',
    },
    chapters: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Chapter[]>,
  },
})
</script>
