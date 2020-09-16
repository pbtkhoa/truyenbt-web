<template>
  <div class="col-md-8">
    <div :class="$style.heading"><h2>Truyện mới cập nhật</h2></div>
    <div :class="$style.mangaContent">
      <ul :class="['row p-0 mb-0', $style.mangaList]">
        <li
          v-for="manga in mangas"
          :key="manga._id"
          :class="[$style.mangaItem, 'col-md-3']"
        >
          <nuxt-link :class="$style.mangaItemImage" :to="manga.slug">
            <img v-lazy="manga.imagePreview" />
          </nuxt-link>
          <h3 :class="$style.mangaItemTitle">
            <nuxt-link :to="manga.slug">{{ manga.name }}</nuxt-link>
          </h3>
          <div
            v-for="chapter in manga.chapters"
            :key="chapter._id"
            :class="$style.mangaItemChapters"
          >
            <div :class="$style.chapterInfo">
              <nuxt-link
                :to="{
                  name: 'slug-chapter',
                  params: { slug: manga.slug, chapter: chapter.number },
                }"
                >Chương {{ chapter.number }}</nuxt-link
              >
              <time>{{ chapter.createdAt | formatDiffDate }}</time>
            </div>
          </div>
        </li>
      </ul>
      <paginate
        :page-count="totalPages"
        :click-handler="onChangePaginate"
        container-class="text-center"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  },
  computed: {
    mangas(): Manga[] {
      return this.$accessor.manga.latest.items
    },
    totalPages(): number {
      return this.$accessor.manga.latest.totalPages
    },
  },
})
</script>

<style module lang="scss">
.heading h2 {
}
.mangaContent {
  .mangaList {
    list-style: none;
    .mangaItem {
      margin-bottom: 15px;
      .mangaItemImage {
        position: relative;
        display: block;
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid $gray-400;
        border-radius: 5px;
        overflow: hidden;
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
      .mangaItemChapters {
        .chapterInfo {
          display: flex;
          width: 100%;
          justify-content: space-between;
          a {
            text-decoration: none;
            color: $black;
            font-size: $font-size-base * 0.8;
            transition: 0.2s all;
            &:hover {
              transition: 0.2s all;
              color: $primary;
            }
          }
          time {
            color: $gray-500;
            font-size: $font-size-base * 0.8;
            font-style: italic;
          }
        }
      }
    }
  }
}
</style>
