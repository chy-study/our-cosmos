export function getFestivalInfo() {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  if (month === 2 && day === 14) {
    return {
      theme: 'valentine',
      name: '情人节',
      emoji: '🌹',
      message: '愿有情人终成眷属，每一天都像情人节一样甜蜜！',
      color: '#ff5c8a'
    }
  }

  if (month === 7 && day === 7) {
    return {
      theme: 'qixi',
      name: '七夕节',
      emoji: '✨',
      message: '金风玉露一相逢，便胜却人间无数。七夕快乐！',
      color: '#9b59b6'
    }
  }

  if (month === 12 && day === 25) {
    return {
      theme: 'christmas',
      name: '圣诞节',
      emoji: '🎄',
      message: '在漫天雪花中，许下属于我们的心愿。圣诞快乐！',
      color: '#c41e3a'
    }
  }

  if (month === 1 && day === 1) {
    return {
      theme: 'newyear',
      name: '元旦',
      emoji: '🎉',
      message: '新的一年，继续和你在一起。元旦快乐！',
      color: '#d4a017'
    }
  }

  if (month === 10 && day === 1) {
    return {
      theme: 'national',
      name: '国庆节',
      emoji: '🇨🇳',
      message: '山河远阔，人间烟火。愿祖国繁荣昌盛！',
      color: '#de2910'
    }
  }

  return {
    theme: 'default',
    name: '',
    emoji: '',
    message: '',
    color: ''
  }
}

export function getFestivalTheme() {
  return getFestivalInfo().theme
}
