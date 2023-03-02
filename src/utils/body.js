const disableScrollLock = () => {
  document.body.classList.remove('lock-scroll-body')
}

const enableScrollLock = () => {
  document.body.classList.add('lock-scroll-body')
}

const convertJsonToFormData = (json) => {
  const formData = new FormData()

  for (const key in json) {
    if (json[key] === null || json[key] === undefined || json[key] === '') {
      continue
    }
    formData.append(key, json[key])
  }
  return formData
}

export {
  disableScrollLock,
  enableScrollLock,
  convertJsonToFormData
}
