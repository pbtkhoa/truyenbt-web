<template>
  <div class="col-span-4">
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
