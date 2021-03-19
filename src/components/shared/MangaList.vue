<template>
  <div>
    <ul class="p-0 mb-4 list-none grid grid-cols-4 gap-5">
      <li v-for="manga in mangas" :key="manga._id">
        <nuxt-link
          class="relative block w-full rounded overflow-hidden mb-0.5 group"
          :to="{ name: 'slug', params: { slug: manga.slug } }"
        >
          <img v-lazy="manga.imagePreview" class="w-full transform transition-all duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-all duration-300" />
        </nuxt-link>
        <h3 class="text-center font-semibold text-base overflow-hidden h-12">
          <nuxt-link
            :to="{ name: 'slug', params: { slug: manga.slug } }"
            class="text-black no-underline transition-all duration-200 hover:text-red-500"
            >{{ manga.name }}
          </nuxt-link>
        </h3>
        <div v-for="chapter in manga.chapters" :key="chapter._id">
          <div class="flex w-full justify-between">
            <nuxt-link
              :to="{
                name: 'slug-chapter',
                params: { slug: manga.slug, chapter: chapter.number },
              }"
              class="text-black text-xs no-underline transition-all duration-200 hover:text-red-500"
            >
              Chương {{ chapter.number }}
            </nuxt-link>
            <time class="text-gray-500 italic text-xs">{{ chapter.publishedAt | formatDiffDate }}</time>
          </div>
        </div>
      </li>
    </ul>
    <paginate
      v-if="totalPages > 1"
      :page-count="totalPages"
      :click-handler="onChangePaginate"
      container-class="text-center"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import paginate from '~/components/shared/Paginate.vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  components: {
    paginate,
  },
  props: {
    onChangePaginate: {
      type: Function,
      default: () => {},
    },
    mangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Manga[]>,
    totalPages: {
      type: Number,
      default: 0,
    },
  },
})
</script>
