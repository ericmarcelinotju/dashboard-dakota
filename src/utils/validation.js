/* eslint-disable no-useless-escape */
export const required = str => str != null && str !== undefined && str.length !== 0

export const alpha = str => str != null && str.match(/^[a-zA-Z ]+$/)

export const numeric = str => str != null && str.match(/^[0-9]+$/)

export const sameAs = (vm, key) => str => str != null && str === vm.form[key]

export const maxLength = length => str => str != null && str.length <= length

export const minLength = length => str => str != null && str.length > length

export const requiredIf = (vm, key, equal) => str => vm.form[key] === equal ? str != null && str !== undefined && str.length !== 0 : true

export const email = str => str != null && str.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

export const phone = str => str != null && str.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)

export const httpUrl = str => {
  let url

  try {
    url = new URL(str)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
