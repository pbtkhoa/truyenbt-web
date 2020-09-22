<template>
  <div :class="[$style.searchManga, 'bg-white']">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h4 class="text-center mb-4">Tìm truyện tranh</h4>
          <p :class="$style.tagDescription">{{ tagDescription }}</p>
          <div class="d-flex justify-content-center mb-3">
            <nuxt-link
              :class="[$style.btnStatus, { [$style.active]: status === undefined }]"
              :exact-active-class="$style.active"
              :to="{ name: 'tim-truyen', query: { status: undefined, tag: curTag } }"
            >
              Tất cả
            </nuxt-link>
            <nuxt-link
              :class="[$style.btnStatus, { [$style.active]: status === '1' }]"
              :to="{ name: 'tim-truyen', query: { status: '1', tag: curTag } }"
            >
              Hoàn thành
            </nuxt-link>
            <nuxt-link
              :class="[$style.btnStatus, { [$style.active]: status === '0' }]"
              :to="{ name: 'tim-truyen', query: { status: '0', tag: curTag } }"
            >
              Đang tiến hành
            </nuxt-link>
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
                    :class="{ [$style.tagActive]: curTag === undefined }"
                    :to="{ name: 'tim-truyen', query: { status, tag: undefined } }"
                  >
                    Tất cả thể loại</nuxt-link
                  >
                </td>
              </tr>
              <tr v-for="(tags, index) in chunkTags" :key="index">
                <td v-for="item in tags" :key="item._id" :colspan="tags.length === 2 ? 1 : 2">
                  <nuxt-link
                    :class="{ [$style.tagActive]: curTag === item.slug }"
                    :to="{ name: 'tim-truyen', query: { status, tag: item.slug } }"
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
import Vue from 'vue'
import Manga from '~/models/Manga'
import MangaList from '~/components/shared/MangaList.vue'
import Tag from '~/models/Tag'

export default Vue.extend({
  components: {
    MangaList,
  },
  props: {
    onChangePaginate: {
      type: Function,
      default: () => {},
    },
    onChangeStatus: {
      type: Function,
      default: () => {},
    },
    status: {
      type: String,
      default: undefined,
    },
    curTag: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    tagDescription(): string {
      const tag: Tag | undefined = this.$accessor.tag.items.find((i: Tag) => this.curTag === i.slug)
      return tag ? tag.description : 'Tất cả thể loại truyện tranh'
    },
    mangas(): Manga[] {
      return this.$accessor.manga.paginateList.items
    },
    totalPages(): number {
      return this.$accessor.manga.paginateList.totalPages
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
  .btnStatus {
    padding: 4px 8px;
    border-radius: 3px;
    border: 1px solid $primary;
    color: $primary;
    background-color: transparent;
    text-decoration: none;
    transition: 0.2s all;
    margin: 0 4px;
    outline: none;

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
