<template>
  <section class="container mx-auto px-4">
    <div v-swiper="swiperOptions" :class="$style.swiper">
      <div class="swiper-wrapper">
        <div v-for="manga in hotMangas" :key="manga._id" :class="['swiper-slide', $style.swiperSlide]">
          <nuxt-link
            class="relative block overflow-hidden bg-white h-full group"
            :to="{ name: 'slug', params: { slug: manga.slug } }"
          >
            <img
              v-lazy="manga.imagePreview"
              class="absolute w-full right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 transition duration-300 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black opacity-0 transition duration-300 group-hover:opacity-25" />
          </nuxt-link>
          <div class="absolute flex flex-col justify-around pl-3 pr-3 inset-x-0 bottom-0 bg-black bg-opacity-60 h-12">
            <nuxt-link
              :to="{ name: 'slug', params: { slug: manga.slug } }"
              class="text-center text-white text-base h-6 truncate mb-0 no-underline transition hover:text-secondary"
            >
              {{ manga.name }}
            </nuxt-link>
            <div class="flex justify-between">
              <nuxt-link
                :to="{
                  name: 'slug-chapter',
                  params: {
                    slug: manga.slug,
                    chapter: getFirstChapterNumber(manga),
                  },
                }"
                class="text-xs text-white no-underline transition hover:text-secondary"
              >
                Chapter {{ getFirstChapterNumber(manga) }}
              </nuxt-link>
              <time class="text-xs text-white">{{ manga.publishedAt | formatDiffDate }}</time>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Swiper, Navigation, Autoplay } from 'swiper'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.css'
import Manga from '~/models/Manga'
Swiper.use([Navigation, Autoplay])
const { directive } = getAwesomeSwiper(Swiper)

export default Vue.extend({
  directives: {
    swiper: directive,
  },
  props: {
    hotMangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Manga[]>,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        autoplay: {
          delay: 5000,
        },
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  methods: {
    getFirstChapterNumber(manga: Manga): string {
      return manga.chapters[0] ? manga.chapters[0].number : '-1'
    },
  },
})
</script>

<style lang="scss" module>
.swiper {
  @apply py-4;
  .swiperSlide {
    width: 190px;
    height: 247px;
  }
}
</style>
