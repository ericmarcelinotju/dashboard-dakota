import dayjs from 'dayjs'

const format = (date, format = 'YYYY-MM-DDTHH:mm:ss') => {
  return dayjs(date).format(format)
}

const isValid = (date) => {
  return dayjs(date).isValid()
}

const parseDuration = (dur) => {
  const durs = dur.split(':')
  return parseInt(durs[0]) * 3600 + parseInt(durs[1]) * 60 + parseInt(durs[2])
}

export {
  format,
  isValid,
  parseDuration
}
