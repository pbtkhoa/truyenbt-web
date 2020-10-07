<template>
  <div>
    <div :class="$style.mangaContent">
      <ul :class="['row p-0 mb-0', $style.mangaList]">
        <li v-for="manga in mangas" :key="manga._id" :class="[$style.mangaItem, 'col-md-3']">
          <v-popover trigger="hover" placement="right" :delay="{ show: 100, hide: 200 }">
            <nuxt-link :class="$style.mangaItemImage" :to="{ name: 'slug', params: { slug: manga.slug } }">
              <img v-lazy="manga.imagePreview" />
            </nuxt-link>
            <template slot="popover">
              <div :class="$style.moreInfo">
                <h5 :class="$style.name">{{ manga.name }}</h5>
                <h5 v-if="manga.otherName" :class="$style.otherName">Tên khác: {{ manga.otherName }}</h5>
                <p :class="$style.info">Tình trạng: {{ manga.status | formatMangaStatus }}</p>
                <p :class="$style.info">Lượt xem: {{ manga.viewCount | formatCount }}</p>
                <div :class="$style.tags">
                  <nuxt-link
                    v-for="tag in manga.tags"
                    :key="tag._id"
                    :to="{ name: 'tim-truyen', query: { tag: tag.slug } }"
                  >
                    {{ tag.name }}
                  </nuxt-link>
                </div>
                <p :class="$style.description">{{ manga.description }}</p>
              </div>
            </template>
          </v-popover>
          <h3 :class="$style.mangaItemTitle">
            <nuxt-link :to="{ name: 'slug', params: { slug: manga.slug } }">{{ manga.name }}</nuxt-link>
          </h3>
          <div v-for="chapter in manga.chapters" :key="chapter._id" :class="$style.mangaItemChapters">
            <div :class="$style.chapterInfo">
              <nuxt-link
                :to="{
                  name: 'slug-chapter',
                  params: { slug: manga.slug, chapter: chapter.number },
                }"
              >
                Chương {{ chapter.number }}
              </nuxt-link>
              <time>{{ chapter.publishedAt | formatDiffDate }}</time>
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
.popOver {
  .trigger {
    width: 100%;
  }
}
.moreInfo {
  max-width: 330px;
  .name {
    font-size: $font-size-base * 0.7;
    color: $primary;
  }
  .otherName {
    font-size: $font-size-base * 0.8;
    color: $gray-700;
  }
  .info {
    font-size: $font-size-base * 0.8;
    color: $black;
    margin-bottom: 0;
  }
  .tags {
    margin: 6px 0 0 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    a {
      margin-bottom: 3px;
      padding: 2px 4px;
      border-radius: 3px;
      border: 1px solid $primary;
      color: $primary;
      background-color: transparent;
      text-decoration: none;
      margin-right: 5px;
      transition: 0.2s all;
      font-size: $font-size-base * 0.7;
      &:hover {
        transition: 0.2s all;
        color: $white;
        background-color: $primary;
      }
    }
  }
  .description {
    font-size: $font-size-base * 0.8;
    color: $black;
    margin-bottom: 0;
  }
}
</style>
