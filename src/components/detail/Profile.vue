<template>
  <div class="container mx-auto px-4 mb-4 grid grid-cols-12 gap-5">
    <div class="bg-white text-center col-span-3 px-4 py-4 flex justify-center items-center">
      <img v-lazy="manga.imagePreview" class="shadow" />
    </div>
    <div class="bg-white col-span-9 py-3 px-5">
      <h1 class="text-3xl mb-4">{{ manga.name }}</h1>
      <p class="mb-4">{{ manga.description }}</p>
      <div class="mb-4">
        <div class="flex mb-1">
          <div class="w-48">
            <h5 class="text-base">Tác giả</h5>
          </div>
          <a href="#" class="text-gray-900 transition no-underline hover:text-primary">{{ manga.author.name }}</a>
        </div>
        <div class="flex mb-1">
          <div class="w-48">
            <h5 class="text-base">Tình trạng</h5>
          </div>
          <span>{{ manga.status | formatMangaStatus }}</span>
        </div>
        <div class="flex mb-1">
          <div class="w-48">
            <h5 class="text-base">Thống kê</h5>
          </div>
          <span class="text-base mr-8">
            <font-awesome-icon icon="thumbs-up" class="text-sm mr-2" />{{ manga.like | formatCount }}
          </span>
          <span class="text-base mr-8">
            <font-awesome-icon icon="heart" class="text-sm mr-2" />{{ manga.follow | formatCount }}
          </span>
          <span class="text-base mr-8">
            <font-awesome-icon icon="eye" class="text-sm mr-2" />{{ manga.viewCount | formatCount }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap">
        <nuxt-link
          v-for="tag in manga.tags"
          :key="tag._id"
          :to="{ name: 'tim-truyen', query: { tag: tag.slug } }"
          class="mb-4 py-1 px-2 rounded border border-primary text-primary bg-transparent no-underline mr-2 transition hover:text-white hover:bg-primary"
        >
          {{ tag.name }}
        </nuxt-link>
      </div>
      <div class="flex">
        <button
          v-if="manga.isFollow"
          class="py-2 px-4 h-10 w-36 rounded-full text-white no-underline mr-3 outline-none transition hover:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed bg-orange-500 border border-orange-500 mr-4"
          :disabled="isFollowProcessing"
          @click="onClickUnFollowManga"
        >
          <font-awesome-icon icon="heart-broken" />Hủy theo dõi
        </button>
        <button
          v-else
          class="py-2 px-4 h-10 w-36 rounded-full text-white no-underline mr-3 outline-none transition hover:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed bg-orange-500 border border-orange-500 mr-4"
          :disabled="isFollowProcessing"
          @click="onClickFollowManga"
        >
          <font-awesome-icon icon="heart" /> Theo dõi
        </button>
        <button
          class="py-2 px-4 h-10 w-36 rounded-full text-white no-underline mr-3 outline-none transition hover:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed bg-blue-500 border border-blue-500"
          :disabled="isLikeProcessing || manga.isLike"
          @click="onClickLikeManga"
        >
          <font-awesome-icon icon="thumbs-up" /> Thích
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  props: {
    isLikeProcessing: {
      type: Boolean,
      default: false,
    },
    isFollowProcessing: {
      type: Boolean,
      default: false,
    },
    manga: {
      type: Object,
      default: null,
    } as PropOptions<Manga>,
    onClickLikeManga: {
      type: Function,
      default: () => {},
    },
    onClickFollowManga: {
      type: Function,
      default: () => {},
    },
    onClickUnFollowManga: {
      type: Function,
      default: () => {},
    },
  },
})
</script>
