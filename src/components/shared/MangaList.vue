<template>
  <div>
    <ul class="p-0 mb-0 list-none grid grid-cols-4 gap-4">
      <li v-for="manga in mangas" :key="manga._id" class="mb-4">
        <v-popover trigger="hover" placement="right" :delay="{ show: 100, hide: 200 }">
          <nuxt-link
            class="relative block w-full rounded overflow-hidden mb-1 group"
            :to="{ name: 'slug', params: { slug: manga.slug } }"
          >
            <img
              v-lazy="manga.imagePreview"
              class="w-full transform transition-all duration-300 group-hover:scale-110"
            />
            <div
              class="absolute left-0 right-0 top-0 bottom-0 bg-black opacity-0 group-hover:opacity-25 transition-all duration-300"
            />
          </nuxt-link>
          <template slot="popover">
            <div class="max-w-sm">
              <h5 class="text-red-500 text-xs">{{ manga.name }}</h5>
              <h5 v-if="manga.otherName" class="text-sm text-gray-700">Tên khác: {{ manga.otherName }}</h5>
              <p class="mb-0 text-sm text-black">Tình trạng: {{ manga.status | formatMangaStatus }}</p>
              <p class="mb-0 text-sm text-black">Lượt xem: {{ manga.viewCount | formatCount }}</p>
              <div class="flex flex-wrap mt-1">
                <nuxt-link
                  v-for="tag in manga.tags"
                  :key="tag._id"
                  :to="{ name: 'tim-truyen', query: { tag: tag.slug } }"
                  class="mb-2 mr-2 py-0.5 px-1.5 text-red-500 text-xs rounded-sm border-red-500 border bg-transparent no-underline hover:text-white hover:bg-red-500 transition"
                >
                  {{ tag.name }}
                </nuxt-link>
              </div>
              <p class="text-xs text-black mb-0">{{ manga.description }}</p>
            </div>
          </template>
        </v-popover>
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
