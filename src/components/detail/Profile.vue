<template>
  <div :class="['container', $style.profile]">
    <div :class="['bg-white', $style.profileImage]">
      <img v-lazy="manga.imagePreview" />
    </div>
    <div :class="['bg-white', $style.profileDetail]">
      <h1 :class="$style.profileName">{{ manga.name }}</h1>
      <p :class="$style.summary">{{ manga.description }}</p>
      <div :class="$style.profileContent">
        <div :class="$style.contentItem">
          <div :class="$style.contentHeading">
            <h5>Tác giả</h5>
          </div>
          <div :class="$style.contentDetail">
            <a href="#">{{ manga.author.name }}</a>
          </div>
        </div>
        <div :class="$style.contentItem">
          <div :class="$style.contentHeading">
            <h5>Tình trạng</h5>
          </div>
          <div :class="$style.contentDetail">
            <span>{{ manga.status | formatMangaStatus }}</span>
          </div>
        </div>
        <div :class="$style.contentItem">
          <div :class="$style.contentHeading">
            <h5>Thống kê</h5>
          </div>
          <div :class="$style.contentDetail">
            <span>{{ manga.viewCount | formatViewCount }}</span>
          </div>
        </div>
      </div>
      <div :class="$style.profileTags">
        <nuxt-link v-for="tag in manga.tags" :key="tag._id" :to="{ name: 'tim-truyen-tag', params: { tag: tag.slug } }">
          {{ tag.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  props: {
    manga: {
      type: Object,
      default: null,
    } as PropOptions<Manga>,
  },
})
</script>

<style module lang="scss">
.profile {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .profileImage {
    width: 230px;
    text-align: center;
    margin-right: 40px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 190px;
      box-shadow: 0 0 5px 0 $gray-700;
    }
  }
  .profileDetail {
    flex: 1;
    padding: 10px 20px;
    .profileName {
      font-size: $h1-font-size * 0.9;
      margin-bottom: 15px;
    }
    .summary {
      margin-bottom: 18px;
    }
    .profileContent {
      margin-bottom: 15px;
      .contentItem {
        display: flex;
        margin-bottom: 3px;
        .contentHeading {
          width: 200px;

          h5 {
            font-size: $font-size-base;
          }
        }

        .contentDetail {
          span {
            font-size: $font-size-base;
          }

          a {
            color: $gray-900;
            transition: 0.3s all;
            text-decoration: none;

            &:hover {
              transition: 0.3s all;
              color: $primary;
            }
          }
        }
      }
    }
    .profileTags {
      display: flex;
      flex-wrap: wrap;
      a {
        margin-bottom: 12px;
        padding: 4px 8px;
        border-radius: 3px;
        border: 1px solid $primary;
        color: $primary;
        background-color: transparent;
        text-decoration: none;
        margin-right: 15px;
        transition: 0.2s all;
        &:hover {
          transition: 0.2s all;
          color: $white;
          background-color: $primary;
        }
      }
    }
  }
}
</style>
