import Vue from 'vue'
import dayjs from 'dayjs'
import { getDiffDate } from '~/utils/helpers'
import { DATE_FORMAT } from '~/utils/constants'

Vue.filter('formatViewCount', function (viewCount: number) {
  if (!viewCount) return ''
  return Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
    viewCount
  )
})

Vue.filter('formatDiffDate', function (date: string) {
  if (!date) return ''
  return getDiffDate(date)
})

Vue.filter('formatDate', function (date: string) {
  if (!date) return ''
  return dayjs(date).format(DATE_FORMAT.DATE)
})
