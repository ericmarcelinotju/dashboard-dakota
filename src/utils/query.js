const serializeQueryParams = (paramObj) => {
  if (paramObj) {
    return '?' + Object.keys(paramObj).map(k => {
      if (paramObj[k] && typeof paramObj[k] === 'object') {
        return paramObj[k].map(v => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
      } else {
        return `${encodeURIComponent(k)}=${encodeURIComponent(paramObj[k])}`
      }
    }).join('&')
  }
  return ''
}

const urlFriendlyName = (url) => {
  let newUrl = url.toLowerCase()
  newUrl = newUrl.replace(/[&/\\#,+()$~%.'":*?<>{} ]/g, '-')
  newUrl = newUrl.replace(' ', '-')
  return newUrl
}

export {
  serializeQueryParams,
  urlFriendlyName
}
