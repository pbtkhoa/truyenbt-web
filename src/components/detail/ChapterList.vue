<template>
  <div :class="['bg-white', $style.chapterList]">
    <div :class="['container']">
      <h2>Danh sách chương</h2>
      <div class="row">
        <div v-for="chapter in chapters" class="col-6" :key="chapter._id">
          <nuxt-link
            :to="{
              name: 'slug-chapter',
              params: { slug: slug, chapter: chapter.number },
            }"
            :class="$style.chapterItem"
          >
            <div :class="$style.chapterNumber">Chương {{ chapter.number }}</div>
            <div :class="$style.chapterInfo">
              <span>{{ chapter.view }}</span>
              <time>{{ chapterDate(chapter.updatedAt) }}</time>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Chapter from '~/models/Chapter'
import { DATE_FORMAT } from '~/utils/constants'

export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: '',
    },
    chapters: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Chapter[]>,
  },
  methods: {
    chapterDate(chapterDate: string): string {
      return this.$moment(chapterDate).format(DATE_FORMAT.DATE)
    },
  },
})
</script>

<style module lang="scss">
.chapterList {
  padding: 10px 0;
  .chapterItem {
    display: flex;
    margin-bottom: 10px;
    background-color: $gray-300;
    padding: 6px 8px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: 0.2s all;
    justify-content: space-between;
    .chapterNumber {
      color: $gray-900;
    }
    .chapterInfo {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      span {
        color: $gray-900;
        font-size: $font-size-base * 0.8;
      }
      time {
        margin-left: 15px;
        color: $gray-900;
        font-size: $font-size-base * 0.8;
      }
    }
    &:hover {
      transition: 0.2s all;
      background-color: darken($gray-300, 10%);
      .chapterNumber {
        color: $primary;
      }
    }
  }
}
</style>
