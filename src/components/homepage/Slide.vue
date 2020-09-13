<template>
  <section class="container">
    <div v-swiper="swiperOptions" :class="$style.swiper">
      <div class="swiper-wrapper">
        <div
          :key="manga._id"
          v-for="manga in hotMangas"
          :class="['swiper-slide', $style.swiperSlide]"
        >
          <nuxt-link :class="$style.mangaItemImage" :to="manga.slug">
            <img v-lazy="manga.imagePreview" />
          </nuxt-link>
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
}
</style>
