import moment from 'moment'
import { MangaStatus } from '~/utils/constants'

type Type = { [key: string]: string }

export function removeNamespace<T extends Type>(
  namespace: string,
  types: Type
): T {
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
  const duration: moment.Duration = moment.duration(
    moment().diff(moment(chooseDate))
  )
  const years: number = duration.years()
  const months: number = duration.months()
  const days: number = duration.days()
  const hours: number = duration.hours()
  const minutes: number = duration.minutes()

  if (years > 1) {
    return `${years} năm trước`
  } else if (months > 1) {
    return `${months} tháng trước`
  } else if (days > 1) {
    return `${days} ngày trước`
  } else if (hours > 1) {
    return `${hours} giờ trước`
  }

  return `${minutes} phút trước`
}
