const data = {}
const customClientStorage = {
  setItem: (k, v) => {
    data[k] = v
  },
  getItem: (k) => data[k]
}

const defaultLocalStorage = window.localStorage || customClientStorage
const defaultSessionStorage = window.sessionStorage || customClientStorage

const getLocalStorageData = key => {
  const data = defaultLocalStorage.getItem(key) || ''
  try {
    return JSON.parse(data)
  } catch (e) {}
  return data
}

const setLocalStorageData = (key, value) => {
  const newValue = typeof value === 'string' ? value : JSON.stringify(value)
  defaultLocalStorage.setItem(key, newValue)
}

const getSessionData = key => {
  const data = defaultSessionStorage.getItem(key) || ''
  try {
    return JSON.parse(data)
  } catch (e) {}
  return data
}

const setSessionData = (key, value) => {
  try {
    const newValue = typeof value === 'string' ? value : JSON.stringify(value)
    defaultSessionStorage.setItem(key, newValue)
  } catch (e) {}
}

export {
  getLocalStorageData,
  setLocalStorageData,
  getSessionData,
  setSessionData
}
export const _customLocalStorage = customClientStorage
export const _customSessionStorage = customClientStorage
