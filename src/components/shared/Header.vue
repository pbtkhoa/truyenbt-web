<template>
  <header :class="$style.header">
    <div :class="$style.headerTop">
      <div :class="[$style.container, 'container d-flex']">
        <img src="/logo.png" alt="TruyenBT" :class="$style.logo" />
        <ul :class="$style.topLinks">
          <li>
            <nuxt-link to="/">TRANG CHỦ</nuxt-link>
          </li>
          <li>
            <a href="#">LỊCH SỬ</a>
          </li>
          <li>
            <a href="#">TRUYỆN TOP</a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['bg-white', $style.headerBottom]">
      <div class="container d-flex">
        <ul :class="$style.bottomLink">
          <li v-for="(item, lIndex) in navList" :key="lIndex">
            <template v-if="item.children">
              <a :href="item.to" :title="item.name" :class="{ active }" @click="toggleDropDown">{{ item.name }} </a>
              <div :class="[$style.dropdown, isOpen ? $style.isOpen : undefined]">
                <ul>
                  <li v-for="{ to, name, index } in item.children" :key="index" @click="toggleDropDown">
                    <nuxt-link :to="to" :title="name">{{ name }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <a :href="item.to" :title="item.name">{{ item.name }}</a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import { TagActions } from '~/store/tag'
import Tag from '~/models/Tag'

type NavItem = {
  id: string
  to: any
  name: string
  children: NavItem[]
}

export default Vue.extend({
  data() {
    return {
      isOpen: false,
      active: false,
      navList: [
        {
          id: 'home',
          to: '#',
          name: 'Trang chủ',
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
          to: { name: 'tim-truyen-tag', params: { tag: i.slug } },
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
  },
})
</script>

<style lang="scss" module>
.header {
  .headerTop {
    height: 100px;
    background: linear-gradient(to right, $primary 40%, $secondary);
    .container {
      height: inherit;

      .topLinks {
        padding: 0;
        margin: 0;
        list-style: none;
        justify-content: center;
        display: flex;
        align-items: center;
        li {
          margin-right: 40px;
          a {
            color: $white;
            text-decoration: none;
            position: relative;
            &:before {
              content: '';
              transition: 0.2s all;
              height: 2px;
              width: 0;
              background: $white;
              opacity: 0.5;
              display: block;
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
            }
            &:hover {
              &:before {
                transition: 0.2s all;
                width: 70%;
              }
            }
          }
        }
      }

      .logo {
        height: 100%;
      }
    }
  }
  .headerBottom {
    height: 50px;
    border-bottom: 1px solid $gray-300;
    display: flex;
    .bottomLink {
      padding: 0;
      margin: 0;
      list-style: none;
      justify-content: center;
      display: flex;
      align-items: center;
      > li {
        margin-right: 40px;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        > a {
          color: $gray-600;
          text-decoration: none;
          font-weight: $font-weight-bold;
          &:hover {
            color: $primary;
          }
        }
        > .dropdown {
          position: absolute;
          margin-top: 1px;
          top: 100%;
          transform-origin: 0 0;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          padding: 5px;
          background-color: $white;
          box-shadow: 0 0 3px 1px $gray-500;
          visibility: hidden;
          opacity: 0;
          transition: all 200ms linear;
          &.isOpen {
            z-index: 99999;
            visibility: visible;
            opacity: 1;
          }
          > ul {
            list-style: none;
            min-width: 600px;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            > li {
              padding: 7px 5px;
              width: 150px;
              > a {
                color: $gray-900;
                text-decoration: none;
                font-size: $font-size-base * 0.9;
                transition: 0.2s all;
                &:hover {
                  color: $primary;
                  transition: 0.2s all;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
