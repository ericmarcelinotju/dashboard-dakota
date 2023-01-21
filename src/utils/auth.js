import store from '@/store'
import { pages } from '@/config'

const guardGuest = (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next('/')
  } else {
    next()
  }
}
const guardAuth = (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next()
  } else {
    next(pages.auth.login)
  }
}

export {
  guardGuest,
  guardAuth
}
