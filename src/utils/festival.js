export function getFestivalTheme() {
  const now = new Date()

  const month = now.getMonth() + 1
  const day = now.getDate()

  if (month === 2 && day === 14) {
    return 'valentine'
  }

  if (month === 12 && day === 25) {
    return 'christmas'
  }

  if (month === 1 && day === 1) {
    return 'newyear'
  }

  if (month === 10 && day === 1) {
    return 'national'
  }

  return 'default'
}
