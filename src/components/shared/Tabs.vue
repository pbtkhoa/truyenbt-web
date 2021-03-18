<template>
  <div class="my-14 border-l-1 border-t-1 border-r-1 border-gray-300">
    <ul role="tabList" class="p-0 border-0 items-stretch flex justify-between bg-gray-200 mb-0">
      <li
        v-for="(tab, i) in tabs"
        v-show="tab.isVisible"
        :key="i"
        class="flex-1 text-sm list-none transition border-b-0 border-t-2 hover:border-primary hover:text-gray-600"
        :class="[
          {
            'border-primary z-10 bg-white': tab.isActive,
            'is-disabled': tab.isDisabled,
          },
          tab.isActive ? 'border-primary' : 'border-gray-200',
          tab.isDisabled ? 'cursor-not-allowed text-gray-300' : 'text-gray-800',
        ]"
        role="presentation"
      >
        <a
          :aria-selected="tab.isActive"
          :aria-controls="tab.hash"
          :href="tab.hash"
          class="items-center block px-4 py-3 no-underline text-center text-inherit"
          role="tab"
          @click="selectTab(tab.hash, $event)"
        >
          {{ tab.header }}
        </a>
      </li>
    </ul>
    <div class="bg-white px-5 py-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TabComponent } from '~/components/shared/Tab.vue'

export default Vue.extend({
  props: {
    options: {
      type: Object,
      required: false,
      default: (): any => ({
        useUrlFragment: true,
        defaultTabHash: null,
      }),
    },
  },
  data: () => ({
    tabs: [] as TabComponent[],
    activeTabHash: '',
    activeTabIndex: 0,
    lastActiveTabHash: '',
  }),
  created() {
    this.tabs = this.$children as TabComponent[]
  },
  mounted() {
    window.addEventListener('hashchange', () => this.selectTab(window.location.hash))
    if (this.findTab(window.location.hash)) {
      this.selectTab(window.location.hash)
      return
    }
    if (this.options.defaultTabHash !== null && this.findTab('#' + this.options.defaultTabHash)) {
      this.selectTab('#' + this.options.defaultTabHash)
      return
    }
    if (this.tabs.length) {
      this.selectTab(this.tabs[0].hash)
    }
  },
  methods: {
    findTab(hash: string): TabComponent | undefined {
      return this.tabs.find((tab) => tab.hash === hash)
    },
    selectTab(selectedTabHash: string, event?: Event) {
      // See if we should store the hash in the url fragment.
      if (event && !this.options.useUrlFragment) {
        event.preventDefault()
      }
      const selectedTab = this.findTab(selectedTabHash)
      if (!selectedTab) {
        return
      }
      if (selectedTab.isDisabled && event) {
        event.preventDefault()
        return
      }
      if (this.lastActiveTabHash === selectedTab.hash) {
        this.$emit('clicked', { tab: selectedTab })
        return
      }
      this.tabs.forEach((tab) => {
        tab.isActive = tab.hash === selectedTab.hash
      })
      this.$emit('changed', { tab: selectedTab })
      this.activeTabHash = selectedTab.hash
      this.activeTabIndex = this.getTabIndex(selectedTabHash)
      this.lastActiveTabHash = this.activeTabHash = selectedTab.hash
    },
    setTabVisible(hash: string, visible: boolean) {
      const tab = this.findTab(hash)
      if (!tab) {
        return
      }
      tab.isVisible = visible
      if (tab.isActive) {
        // If tab is active, set a different one as active.
        tab.isActive = visible
        this.tabs.every((tab) => {
          if (tab.isVisible) {
            tab.isActive = true
            return false
          }
          return true
        })
      }
    },

    getTabIndex(hash: string): number {
      const tab = this.findTab(hash)

      return tab ? this.tabs.indexOf(tab) : -1
    },

    getActiveTab(): TabComponent | undefined {
      return this.findTab(this.activeTabHash)
    },

    getActiveTabIndex(): number {
      return this.getTabIndex(this.activeTabHash)
    },
  },
})
</script>
