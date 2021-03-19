<template>
  <header>
    <div class="h-20 bg-gradient-to-r from-primary to-secondary">
      <div class="container mx-auto px-4 justify-between flex h-inherit">
        <img src="/logo.png" alt="TruyenBT" class="h-full" />
        <ul class="p-0 m-0 list-none flex justify-center items-center">
          <li class="ml-10">
            <nuxt-link to="/" class="relative text-white no-underline group">
              TRANG CHỦ
              <div
                class="h-0.5 w-0 bg-white opacity-50 block absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all group-hover:w-3/4"
              />
            </nuxt-link>
          </li>
          <li class="ml-10">
            <a href="#" class="relative text-white no-underline group">
              LỊCH SỬ
              <div
                class="h-0.5 w-0 bg-white opacity-50 block absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all group-hover:w-3/4"
              />
            </a>
          </li>
          <li v-if="$auth.user" class="ml-10">
            <a href="#" class="relative text-white no-underline group">
              Tài khoản
              <div
                class="h-0.5 w-0 bg-white opacity-50 block absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all group-hover:w-3/4"
              />
            </a>
          </li>
          <li v-else class="ml-10">
            <a href="#" class="relative text-white no-underline group" @click="onClickLogin">
              Đăng nhập
              <div
                class="h-0.5 w-0 bg-white opacity-50 block absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all group-hover:w-3/4"
              />
            </a>
            <span class="text-white">/</span>
            <a href="#" class="relative text-white no-underline group" @click="onClickRegister">
              Đăng ký
              <div
                class="h-0.5 w-0 bg-white opacity-50 block absolute -bottom-2 left-1/2 transform -translate-x-1/2 transition-all group-hover:w-3/4"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-white h-14 border-b border-gray-300 flex">
      <div class="container mx-auto px-4 flex">
        <ul class="p-0 m-0 list-none flex justify-center items-center">
          <li v-for="(item, lIndex) in navList" :key="lIndex" class="mr-10 relative h-full flex items-center">
            <template v-if="item.children">
              <a
                :href="item.to"
                :title="item.name"
                :class="{ active }"
                class="text-gray-600 no-underline font-bold hover:text-primary"
                @click="toggleDropDown"
                >{{ item.name }}
              </a>
              <div
                :class="[
                  'absolute top-full rounded-bl-md rounded-b-md p-1.5 bg-white invisible opacity-0 transition ease-linear shadow',
                  isOpen ? 'z-50 visible opacity-100' : '',
                ]"
              >
                <ul class="min-width-650 list-none p-0 m-0 flex flex-wrap">
                  <li
                    v-for="{ to, name, index } in item.children"
                    :key="index"
                    class="py-3 px-2 w-36"
                    @click="toggleDropDown"
                  >
                    <nuxt-link
                      :to="to"
                      :title="name"
                      class="text-gray-900 no-underline text-sm transition hover:text-primary"
                      >{{ name }}</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <nuxt-link
                :to="item.to"
                :title="item.name"
                class="text-gray-600 no-underline font-bold hover:text-primary"
                >{{ item.name }}</nuxt-link
              >
            </template>
          </li>
        </ul>
      </div>
    </div>
    <auth :on-change-mode="onChangeMode" :is-register-mode="isRegisterMode" />
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import { TagActions } from '~/store/tag'
import Tag from '~/models/Tag'
import Auth from '~/components/shared/Auth.vue'

type NavItem = {
  id: string
  to: any
  name: string
  children: NavItem[]
}

export default Vue.extend({
  components: {
    Auth,
  },
  data() {
    return {
      isOpen: false,
      isRegisterMode: false,
      active: false,
      navList: [
        {
          id: 'home',
          to: '/',
          name: 'Trang chủ',
        },
        {
          id: 'theo-doi',
          to: { name: 'theo-doi' },
          name: 'Theo dõi',
        },
        {
          id: 'lich-su',
          to: { name: 'lich-su' },
          name: 'Lịch sử',
        },
        {
          id: 'tag',
          to: '#',
          name: 'Thể loại',
        },
      ] as NavItem[],
    }
  },
  async mounted() {
    await this.$store.dispatch(TagActions.GET_TAGS)
    this.navList = this.navList.map((navItem) => {
      if (navItem.id === 'tag') {
        navItem.children = this.$accessor.tag.items.map((i: Tag) => ({
          id: i._id,
          to: { name: 'tim-truyen', query: { tag: i.slug } },
          name: i.name,
        }))
      }

      return navItem
    })
  },
  methods: {
    toggleDropDown(): void {
      this.isOpen = !this.isOpen
      this.active = !this.active
    },
    onClickLogin() {
      this.isRegisterMode = false
      this.$modal.show('authenticate')
    },
    onClickRegister() {
      this.isRegisterMode = true
      this.$modal.show('authenticate')
    },
    onChangeMode(): void {
      this.isRegisterMode = !this.isRegisterMode
    },
  },
})
</script>
