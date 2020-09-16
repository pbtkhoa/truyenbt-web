<template>
  <section
    v-show="isActive"
    :id="computedId"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export interface TabComponent extends Vue {
  header: string
  computedId: string
  hash: string
  isActive: boolean
  isVisible: boolean
  isDisabled: boolean
}

export default Vue.extend({
  props: {
    id: { type: String, default: null },
    name: { type: String, required: true },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },
  data: () => ({
    isActive: false,
    isVisible: true,
  }),
  computed: {
    header(): string {
      return this.prefix + this.name + this.suffix
    },
    computedId(): string {
      return this.id ? this.id : this.name.toLowerCase().replace(/ /g, '-')
    },
    hash(): string {
      if (this.isDisabled) {
        return '#'
      }
      return '#' + this.computedId
    },
  },
})
</script>
