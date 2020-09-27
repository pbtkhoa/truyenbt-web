<template>
  <div class="col-md-4">
    <tabs :options="{ useUrlFragment: false }">
      <tab name="Top tuần">
        <tab-content :mangas="weekMangas" />
      </tab>
      <tab name="Top tháng">
        <tab-content :mangas="monthMangas" />
      </tab>
      <tab name="Top năm">
        <tab-content :mangas="yearMangas" />
      </tab>
    </tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TabContent from './TabContent.vue'
import Tabs from '~/components/shared/Tabs.vue'
import Tab from '~/components/shared/Tab.vue'
import Manga from '~/models/Manga'
import { MangaSortDate } from '~/utils/constants'
export default Vue.extend({
  components: {
    Tabs,
    Tab,
    TabContent,
  },
  computed: {
    weekMangas(): Manga[] {
      return this.$accessor.manga.topMangas[MangaSortDate.WEEK]
    },
    monthMangas(): Manga[] {
      return this.$accessor.manga.topMangas[MangaSortDate.MONTH]
    },
    yearMangas(): Manga[] {
      return this.$accessor.manga.topMangas[MangaSortDate.YEAR]
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
