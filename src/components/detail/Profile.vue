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
            <span :class="$style.countInfo">
              <font-awesome-icon icon="thumbs-up" :class="$style.countIcon" />{{ manga.like | formatCount }}
            </span>
            <span :class="$style.countInfo">
              <font-awesome-icon icon="heart" :class="$style.countIcon" />{{ manga.follow | formatCount }}
            </span>
            <span :class="$style.countInfo">
              <font-awesome-icon icon="eye" :class="$style.countIcon" />{{ manga.viewCount | formatCount }}
            </span>
          </div>
        </div>
      </div>
      <div :class="$style.profileTags">
        <nuxt-link v-for="tag in manga.tags" :key="tag._id" :to="{ name: 'tim-truyen', query: { tag: tag.slug } }">
          {{ tag.name }}
        </nuxt-link>
      </div>
      <div :class="[$style.profileAction, 'd-flex']">
        <button
          v-if="manga.isFollow"
          :class="[$style.actionBtn, $style.follow]"
          :disabled="isFollowProcessing"
          @click="onClickUnFollowManga"
        >
          <font-awesome-icon icon="heart-broken" />Hủy theo dõi
        </button>
        <button
          v-else
          :class="[$style.actionBtn, $style.follow]"
          :disabled="isFollowProcessing"
          @click="onClickFollowManga"
        >
          <font-awesome-icon icon="heart" />Theo dõi
        </button>
        <button
          :class="[$style.actionBtn, $style.like]"
          :disabled="isLikeProcessing || manga.isLike"
          @click="onClickLikeManga"
        >
          <font-awesome-icon icon="thumbs-up" />Thích
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
          .countInfo {
            font-size: $font-size-base;
            margin-right: 30px;
            .countIcon {
              font-size: $font-size-base * 0.9;
              margin-right: 8px;
            }
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
        margin-right: 10px;
        transition: 0.2s all;
        &:hover {
          transition: 0.2s all;
          color: $white;
          background-color: $primary;
        }
      }
    }
    .profileAction {
      .actionBtn {
        padding: 5px 12px;
        height: 40px;
        border-radius: 20px;
        min-width: 150px;
        color: $white;
        text-decoration: none;
        margin-right: 10px;
        transition: 0.2s all;
        outline: none;
        &:hover {
          transition: 0.2s all;
          opacity: 0.6;
        }
        &:disabled {
          transition: 0.2s all;
          opacity: 0.6;
          cursor: not-allowed;
        }
        > * {
          margin-right: 12px;
        }
        &.follow {
          background-color: $orange;
          border: 1px solid $orange;
        }
        &.like {
          background-color: $blue;
          border: 1px solid $blue;
        }
      }
    }
  }
}
</style>
