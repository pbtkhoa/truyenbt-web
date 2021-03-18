<template>
  <div class="pt-4 bg-white">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h4 class="text-center mb-4">Tìm truyện tranh</h4>
          <p class="mb-4 px-3 py-2 border border-gray-600">{{ tagDescription }}</p>
          <div class="row mb-3">
            <form class="col-6 offset-3" @submit.prevent="onSubmitSearch">
              <input type="text" placeholder="Tìm truyện" class="form-input" name="keyword" :value="keyword" />
            </form>
          </div>
          <div class="row mb-3">
            <h5 class="col-3 text-right">Tình trạng</h5>
            <div class="col-9">
              <div class="d-flex">
                <nuxt-link
                  :class="['btn-primary', { ['active']: status === undefined }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { sort, tag, keyword, status: undefined } }"
                >
                  Tất cả
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: status === MANGA_STATUS.COMPLETE }]"
                  :to="{ name: 'tim-truyen', query: { sort, tag, keyword, status: MANGA_STATUS.COMPLETE } }"
                >
                  Hoàn thành
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: status === MANGA_STATUS.CONTINUE }]"
                  :to="{ name: 'tim-truyen', query: { sort, tag, keyword, status: MANGA_STATUS.CONTINUE } }"
                >
                  Đang tiến hành
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <h5 class="col-3 text-right">Sắp sếp</h5>
            <div class="col-9">
              <div class="d-flex mb-1">
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === undefined }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: undefined } }"
                >
                  Ngày cập nhật
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === MANGA_SORT_TYPE.BY_CREATED }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_CREATED } }"
                >
                  Truyện mới
                </nuxt-link>
              </div>
              <div class="d-flex">
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === MANGA_SORT_TYPE.BY_TOP_ALL }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_ALL } }"
                >
                  Top all
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === MANGA_SORT_TYPE.BY_TOP_YEAR }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_YEAR } }"
                >
                  Top năm
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === MANGA_SORT_TYPE.BY_TOP_MONTH }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_MONTH } }"
                >
                  Top tháng
                </nuxt-link>
                <nuxt-link
                  :class="['btn-primary', { ['active']: sort === MANGA_SORT_TYPE.BY_TOP_WEEK }]"
                  exact-active-class="active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_WEEK } }"
                >
                  Top tuần
                </nuxt-link>
              </div>
            </div>
          </div>
          <manga-list :on-change-paginate="onChangePaginate" :mangas="mangas" :total-pages="totalPages" />
        </div>
        <div class="col-md-4">
          <table class="tag-list">
            <thead>
              <tr>
                <td colspan="2"><h4 class="text-primary mb-0">Thể loại</h4></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <nuxt-link
                    :class="{ ['tag-active']: tag === undefined }"
                    :to="{ name: 'tim-truyen', query: { status, sort, keyword, tag: undefined } }"
                  >
                    Tất cả thể loại
                  </nuxt-link>
                </td>
              </tr>
              <tr v-for="(tags, index) in chunkTags" :key="index">
                <td v-for="item in tags" :key="item._id" :colspan="tags.length === 2 ? 1 : 2">
                  <nuxt-link
                    :class="{ ['tag-active']: tag === item.slug }"
                    :to="{ name: 'tim-truyen', query: { status, sort, keyword, tag: item.slug } }"
                  >
                    {{ item.name }}
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Manga from '~/models/Manga'
import MangaList from '~/components/shared/MangaList.vue'
import Tag from '~/models/Tag'
import { MangaSortType, MangaStatus } from '~/utils/constants'

export default Vue.extend({
  components: {
    MangaList,
  },
  props: {
    onChangePaginate: {
      type: Function,
      default: () => {},
    },
    onSubmitSearch: {
      type: Function,
      default: () => {},
    },
    status: {
      type: String,
      default: undefined,
    },
    sort: {
      type: String,
      default: undefined,
    },
    tag: {
      type: String,
      default: undefined,
    },
    keyword: {
      type: String,
      default: undefined,
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
  data() {
    return {
      MANGA_STATUS: MangaStatus,
      MANGA_SORT_TYPE: MangaSortType,
    }
  },
  computed: {
    tagDescription(): string {
      const tag: Tag | undefined = this.$accessor.tag.items.find((i: Tag) => this.tag === i.slug)
      return tag ? tag.description : 'Tất cả thể loại truyện tranh'
    },
    chunkTags(): Tag[][] {
      const items: Tag[] = this.$accessor.tag.items
      const chunkItems: Tag[][] = []
      for (let i = 0; i < items.length; i += 2) {
        chunkItems.push(items.slice(i, i + 2))
      }

      return chunkItems
    },
  },
})
</script>
