<template>
  <div>
    <div :class="$style.mangaContent">
      <ul :class="['row p-0 mb-0', $style.mangaList]">
        <li v-for="manga in mangas" :key="manga._id" :class="[$style.mangaItem, 'col-md-3']">
          <nuxt-link :class="$style.mangaItemImage" :to="{ name: 'slug', params: { slug: manga.slug } }">
            <img v-lazy="manga.imagePreview" />
          </nuxt-link>
          <h3 :class="$style.mangaItemTitle">
            <nuxt-link :to="{ name: 'slug', params: { slug: manga.slug } }">{{ manga.name }}</nuxt-link>
          </h3>
          <nuxt-link
            :to="{
              name: 'slug-chapter',
              params: { slug: manga.slug, chapter: manga.chapterNumber },
            }"
            :class="$style.chapter"
          >
            Đọc tiếp chương {{ manga.chapterNumber }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
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

<style module lang="scss">
.mangaContent {
  .mangaList {
    list-style: none;
    .mangaItem {
      margin-bottom: 15px;
      .mangaItemImage {
        position: relative;
        display: block;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 6px;
        img {
          transition: 0.4s all;
          width: 100%;
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
            transform: scale(1.1);
          }
          &:after {
            opacity: 0.25;
            transition: 0.4s all;
          }
        }
      }
      .mangaItemTitle {
        text-align: center;
        font-weight: 600;
        font-size: $font-size-base * 0.9;
        line-height: $font-size-base * 1.1;
        height: $font-size-base * 2.2;
        overflow: hidden;
        a {
          text-decoration: none;
          color: $black;
          transition: 0.2s all;
          &:hover {
            transition: 0.2s all;
            color: $primary;
          }
        }
      }
      .chapter {
        text-decoration: none;
        color: $black;
        text-align: center;
        display: block;
        font-size: $font-size-base * 0.9;
        transition: 0.2s all;
        &:hover {
          transition: 0.2s all;
          color: $primary;
        }
      }
    }
  }
}
</style>
