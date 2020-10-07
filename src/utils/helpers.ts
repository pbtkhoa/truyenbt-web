import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { ACCESS_COUNT_TOKEN, MangaStatus } from '~/utils/constants'
import User from '~/models/User'
import { Auth } from '@nuxtjs/auth'
dayjs.extend(duration)

type Type = { [key: string]: string }

export function removeNamespace<T extends Type>(namespace: string, types: Type): T {
  return Object.keys(types).reduce((result: Type, key: string) => {
    result[key] = types[key].replace(namespace, '')
    return result
  }, {}) as T
}

export function getMangaStatus(status: MangaStatus) {
  let statusDisplay: string = ''
  switch (status) {
    case MangaStatus.COMPLETE:
      statusDisplay = 'Đã hoàn thành'
      break
    case MangaStatus.CONTINUE:
      statusDisplay = 'Đang cập nhật'
      break
    default:
      break
  }

  return statusDisplay
}

export function getDiffDate(chooseDate: string) {
  const dateDuration: Duration = dayjs.duration(dayjs().diff(chooseDate))
  const years: number = dateDuration.years()
  const months: number = dateDuration.months()
  const days: number = dateDuration.days()
  const hours: number = dateDuration.hours()
  const minutes: number = dateDuration.minutes()
  const seconds: number = dateDuration.seconds()

  if (years > 1) {
    return `${years} năm trước`
  } else if (months > 1) {
    return `${months} tháng trước`
  } else if (days > 1) {
    return `${days} ngày trước`
  } else if (hours > 1) {
    return `${hours} giờ trước`
  } else if (minutes > 1) {
    return `${minutes} phút trước`
  }

  return `${seconds} giây trước`
}

export function setUserForAuth($cookies: NuxtCookies, $auth: Auth, user: User) {
  $cookies.set(ACCESS_COUNT_TOKEN, user.accessCountToken, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  // Transform the user object
  const customUser = {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }

  // Set the custom user
  // The `customUser` object will be accessible through `this.$auth.user`
  // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
  $auth.setUser(customUser)
}
