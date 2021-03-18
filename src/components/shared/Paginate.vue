<template>
  <ul :class="['list-none m-0 p-0', containerClass]">
    <li v-if="firstLastButton" :class="['inline-block h-12 mr-2 group last:mr-0', pageClass]">
      <a
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          pageLinkClass,
          firstPageSelected() ? 'text-gray-500' : '',
        ]"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
      >
        {{ firstButtonText }}
      </a>
    </li>

    <li v-if="!(firstPageSelected() && hidePrevNext)" :class="['inline-block h-12 mr-2 group last:mr-0', prevClass]">
      <a
        :tabindex="firstPageSelected() ? -1 : 0"
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          prevLinkClass,
          firstPageSelected() ? 'text-gray-500' : '',
        ]"
        @click="prevPage()"
        @keyup.enter="prevPage()"
      >
        {{ prevText }}
      </a>
    </li>

    <li
      v-for="(page, idx) in pages"
      :key="idx"
      :class="[
        'inline-block h-12 mr-2 group last:mr-0',
        pageClass,
        page.disabled ? 'text-gray-500' : '',
        page.breakView ? breakViewClass : '',
      ]"
    >
      <a
        v-if="page.breakView"
        :class="[
          'block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-not-allowed',
          pageLinkClass,
          breakViewLinkClass,
        ]"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a
        v-else-if="page.disabled"
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          page.selected ? 'border-primary text-primary' : '',
          pageLinkClass,
        ]"
        tabindex="0"
      >
        {{ page.content }}
      </a>
      <a
        v-else
        tabindex="0"
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          page.selected ? 'border-primary text-primary' : '',
          pageLinkClass,
        ]"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >
        {{ page.content }}
      </a>
    </li>
    <li v-if="!(lastPageSelected() && hidePrevNext)" :class="['inline-block h-12 mr-2 group last:mr-0', nextClass]">
      <a
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          nextLinkClass,
          lastPageSelected() ? 'text-gray-500' : '',
        ]"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="nextPage()"
        @keyup.enter="nextPage()"
      >
        {{ nextText }}
      </a>
    </li>

    <li v-if="firstLastButton" :class="['inline-block h-12 mr-2 group last:mr-0', pageClass]">
      <a
        :class="[
          'transition block py-1 px-3 text-black no-underline text-center bg-transparent outline-none cursor-pointer border border-gray-500 rounded text-sm hover:border-primary hover:text-primary',
          pageLinkClass,
          lastPageSelected() ? 'text-gray-500' : '',
        ]"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
      >
        {{ lastButtonText }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    forcePage: {
      type: Number,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    pageRange: {
      type: Number,
      default: 5,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    prevText: {
      type: String,
      default: '<',
    },
    nextText: {
      type: String,
      default: '>',
    },
    breakViewText: {
      type: String,
      default: '…',
    },
    containerClass: {
      type: String,
    },
    pageClass: {
      type: String,
    },
    pageLinkClass: {
      type: String,
    },
    prevClass: {
      type: String,
    },
    prevLinkClass: {
      type: String,
    },
    nextClass: {
      type: String,
    },
    nextLinkClass: {
      type: String,
    },
    breakViewClass: {
      type: String,
    },
    breakViewLinkClass: {
      type: String,
    },
    disabledClass: {
      type: String,
      default: 'disabled',
    },
    noLiSurround: {
      type: Boolean,
      default: false,
    },
    firstLastButton: {
      type: Boolean,
      default: false,
    },
    firstButtonText: {
      type: String,
      default: 'First',
    },
    lastButtonText: {
      type: String,
      default: 'Last',
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: 1,
    }
  },
  computed: {
    selected: {
      get() {
        return this.value || this.innerValue
      },
      set(newValue) {
        this.innerValue = newValue
      },
    },
    pages() {
      const items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1,
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)
        const setPageItem = (index) => {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1,
          }
          items[index] = page
        }
        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true,
          }
          items[index] = breakView
        }
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i)
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i)
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i)
        }
      }
      return items
    },
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return
      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(this.selected - 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0
    },
    selectFirstPage() {
      if (this.selected <= 1) return
      this.handlePageSelected(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return
      this.handlePageSelected(this.pageCount)
    },
  },
}
</script>
