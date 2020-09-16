<template>
  <div class="tabs-component">
    <ul role="tablist" class="tabs-component-tabs">
      <li
        v-for="(tab, i) in tabs"
        v-show="tab.isVisible"
        :key="i"
        :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled }"
        class="tabs-component-tab"
        role="presentation"
      >
        <a
          :aria-selected="tab.isActive"
          :aria-controls="tab.hash"
          :href="tab.hash"
          class="tabs-component-tab-a"
          role="tab"
          @click="selectTab(tab.hash, $event)"
        >
          {{ tab.header }}
        </a>
      </li>
    </ul>
    <div class="tabs-component-panels">
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
    window.addEventListener('hashchange', () =>
      this.selectTab(window.location.hash)
    )
    if (this.findTab(window.location.hash)) {
      this.selectTab(window.location.hash)
      return
    }
    if (
      this.options.defaultTabHash !== null &&
      this.findTab('#' + this.options.defaultTabHash)
    ) {
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
<style lang="scss">
.tabs-component {
  margin: 4em 0;
  border-left: 1px solid $gray-300;
  border-right: 1px solid $gray-300;
  border-bottom: 1px solid $gray-300;
  .tabs-component-tabs {
    padding: 0;
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: space-between;
    margin-bottom: -1px;
    background-color: $gray-200;
    .tabs-component-tab {
      color: $dark;
      font-size: 14px;
      font-weight: 600;
      list-style: none;
      border-bottom: 0;
      transition: 0.15s all;
      border-top: 2px solid $gray-200;
      flex: 1;
      &:hover {
        transition: 0.15s all;
        border-top: 2px solid $primary;
        color: $gray-600;
      }
      &.is-active {
        color: $dark;
        border-top: 2px solid $primary;
        border-bottom: 0;
        z-index: 2;
        transform: translateY(0);
        background-color: $white;
      }
      &.is-disabled * {
        color: #cdcdcd;
        cursor: not-allowed !important;
      }

      .tabs-component-tab-a {
        align-items: center;
        color: inherit;
        display: block;
        padding: 0.75em 1em;
        text-decoration: none;
        text-align: center;
      }
    }
  }
  .tabs-component-panels {
    background-color: $white;
    padding: 1em 1.3em;
  }
}
</style>
