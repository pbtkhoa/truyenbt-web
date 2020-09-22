import Vue from 'vue'
import dayjs from 'dayjs'
import { getDiffDate, getMangaStatus } from '~/utils/helpers'
import { DATE_FORMAT, MangaStatus } from '~/utils/constants'

Vue.filter('formatViewCount', function (viewCount: number) {
  if (!viewCount) return 0
  return Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(viewCount)
})

Vue.filter('formatDiffDate', function (date: string) {
  if (!date) return ''
  return getDiffDate(date)
})

Vue.filter('formatDate', function (date: string) {
  if (!date) return ''
  return dayjs(date).format(DATE_FORMAT.DATE)
})

Vue.filter('formatMangaStatus', function (status: MangaStatus) {
  return getMangaStatus(status)
})
