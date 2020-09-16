<template>
  <div>
    <div
      v-for="(manga, index) in mangas"
      :key="manga._id"
      :class="$style.mangaItem"
    >
      <span :class="$style.mangaTopNumber">{{ index + 1 }}</span>
      <nuxt-link :class="$style.mangaItemImage" :to="manga.slug">
        <img v-lazy="manga.imagePreview" />
      </nuxt-link>
      <div :class="$style.mangaItemContent">
        <h5>
          <nuxt-link :to="manga.slug">{{ manga.name }}</nuxt-link>
        </h5>
        <div class="d-flex justify-content-between">
          <nuxt-link
            :class="$style.mangaItemChapter"
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
          <span :class="$style.mangaItemView">
            {{ manga.viewCount | formatViewCount }}
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
<style lang="scss" module>
.mangaItem {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid $gray-300;
  }
  .mangaTopNumber {
    margin-right: 12px;
    width: 16px;
    font-size: $h4-font-size;
  }
  .mangaItemImage {
    width: 80px;
    height: 70px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    margin-right: 10px;
    transition: 0.2s all;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: $black;
      opacity: 0;
      transition: 0.2s all;
    }
    &:hover:after {
      opacity: 0.25;
      transition: 0.2s all;
    }
    img {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .mangaItemContent {
    flex: 1;
    h5 {
      font-size: $h5-font-size * 0.9;
      a {
        color: $gray-900;
        text-decoration: none;
        transition: all 0.2s;
        &:hover {
          color: $primary;
          transition: all 0.2s;
        }
      }
    }
    .mangaItemChapter {
      font-size: $font-size-base * 0.9;
      color: $gray-900;
      text-decoration: none;
      transition: all 0.2s;
      &:hover {
        color: $primary;
        transition: all 0.2s;
      }
    }
    .mangaItemView {
      font-size: $font-size-base * 0.8;
      font-style: italic;
      color: $gray-600;
    }
  }
}
</style>
