<template>
  <section class="container">
    <div v-swiper="swiperOptions" :class="$style.swiper">
      <div class="swiper-wrapper">
        <div v-for="manga in hotMangas" :key="manga._id" :class="['swiper-slide', $style.swiperSlide]">
          <nuxt-link :class="$style.mangaItemImage" :to="{ name: 'slug', params: { slug: manga.slug } }">
            <img v-lazy="manga.imagePreview" />
          </nuxt-link>
          <div :class="$style.mangaItemContent">
            <nuxt-link :to="{ name: 'slug', params: { slug: manga.slug } }" :class="$style.mangaItemName">{{
              manga.name
            }}</nuxt-link>
            <div :class="$style.mangaItemInfo">
              <nuxt-link
                :to="{
                  name: 'slug-chapter',
                  params: {
                    slug: manga.slug,
                    chapter: getFirstChapterNumber(manga),
                  },
                }"
                >Chapter {{ getFirstChapterNumber(manga) }}</nuxt-link
              >
              <time>{{ manga.publishedAt | formatDiffDate }}</time>
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
import Vue from 'vue'
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
  computed: {
    hotMangas(): Manga[] {
      return this.$accessor.manga.hotMangas
    },
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
  .swiperSlide {
    width: 190px;
    height: 247px;
  }
  .mangaItemImage {
    position: relative;
    display: block;
    overflow: hidden;
    background-color: $white;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      transition: 0.4s all;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: $black;
      opacity: 0;
      transition: 0.4s all;
    }
    &:hover {
      img {
        transition: 0.4s all;
        transform: translate(-50%, -50%) scale(1.1);
      }
      &:after {
        opacity: 0.25;
        transition: 0.4s all;
      }
    }
  }

  .mangaItemContent {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 8px;
    padding-right: 8px;
    .mangaItemName {
      text-align: center;
      color: $white;
      font-size: $font-size-base;
      height: 19px;
      line-height: 19px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      text-decoration: none;
      transition: all 0.2s;
      &:hover {
        color: $secondary;
        transition: all 0.2s;
      }
    }
    .mangaItemInfo {
      display: flex;
      justify-content: space-between;
      a {
        font-size: $font-size-base * 0.8;
        color: $white;
        text-decoration: none;
        transition: all 0.2s;
        &:hover {
          color: $secondary;
          transition: all 0.2s;
        }
      }
      time {
        font-size: $font-size-base * 0.8;
        color: $white;
      }
    }
  }
}
</style>
