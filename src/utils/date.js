import dayjs from 'dayjs'

export function getDays(date) {
  return dayjs().diff(dayjs(date), 'day')
}

export function getCountdown(targetDate) {
  return dayjs(targetDate).diff(dayjs(), 'day')
}
