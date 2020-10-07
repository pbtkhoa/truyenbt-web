<template>
  <div :class="[$style.searchManga, 'bg-white']">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h4 class="text-center mb-4">Tìm truyện tranh</h4>
          <p :class="$style.tagDescription">{{ tagDescription }}</p>
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
                  :class="[$style.btn, { [$style.active]: status === undefined }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { sort, tag, keyword, status: undefined } }"
                >
                  Tất cả
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: status === MANGA_STATUS.COMPLETE }]"
                  :to="{ name: 'tim-truyen', query: { sort, tag, keyword, status: MANGA_STATUS.COMPLETE } }"
                >
                  Hoàn thành
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: status === MANGA_STATUS.CONTINUE }]"
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
                  :class="[$style.btn, { [$style.active]: sort === undefined }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: undefined } }"
                >
                  Ngày cập nhật
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: sort === MANGA_SORT_TYPE.BY_CREATED }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_CREATED } }"
                >
                  Truyện mới
                </nuxt-link>
              </div>
              <div class="d-flex">
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: sort === MANGA_SORT_TYPE.BY_TOP_ALL }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_ALL } }"
                >
                  Top all
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: sort === MANGA_SORT_TYPE.BY_TOP_YEAR }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_YEAR } }"
                >
                  Top năm
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: sort === MANGA_SORT_TYPE.BY_TOP_MONTH }]"
                  :exact-active-class="$style.active"
                  :to="{ name: 'tim-truyen', query: { status, tag, keyword, sort: MANGA_SORT_TYPE.BY_TOP_MONTH } }"
                >
                  Top tháng
                </nuxt-link>
                <nuxt-link
                  :class="[$style.btn, { [$style.active]: sort === MANGA_SORT_TYPE.BY_TOP_WEEK }]"
                  :exact-active-class="$style.active"
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
          <table :class="$style.tag">
            <thead>
              <tr>
                <td colspan="2"><h5 :class="$style.tagTitle">Thể loại</h5></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <nuxt-link
                    :class="{ [$style.tagActive]: tag === undefined }"
                    :to="{ name: 'tim-truyen', query: { status, sort, keyword, tag: undefined } }"
                  >
                    Tất cả thể loại</nuxt-link
                  >
                </td>
              </tr>
              <tr v-for="(tags, index) in chunkTags" :key="index">
                <td v-for="item in tags" :key="item._id" :colspan="tags.length === 2 ? 1 : 2">
                  <nuxt-link
                    :class="{ [$style.tagActive]: tag === item.slug }"
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
<style lang="scss" module>
.searchManga {
  padding-top: 20px;
  .tagDescription {
    margin: 0 0 20px;
    padding: 8px 10px;
    border: 1px solid $gray-600;
  }
  .btn {
    text-align: center;
    min-width: 110px;
    padding: 2px 5px;
    border-radius: 3px;
    border: 1px solid $primary;
    color: $primary;
    background-color: transparent;
    text-decoration: none;
    transition: 0.2s all;
    margin: 0 3px;
    outline: none;
    font-size: $font-size-base * 0.8;

    &:hover {
      transition: 0.2s all;
      color: $white;
      background-color: lighten($primary, 15%);
    }
    &.active {
      transition: 0.2s all;
      color: $white;
      background-color: $primary;
    }
  }
  .tag {
    margin: 0;
    border-collapse: collapse;
    width: 100%;
    .tagTitle {
      font-size: $h4-font-size;
      color: $secondary;
      margin: 0;
    }
    tr {
      border: 1px solid #ddd;
      td {
        padding: 8px 12px;
        color: $gray-900;
        a {
          text-decoration: none;
          color: $gray-900;
          transition: 0.2s all;
          &:hover,
          &.tagActive {
            transition: 0.2s all;
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
