import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.json'
import id from '@/i18n/id.json'
import { getLocalStorageData } from '@/utils/storage'

const i18n = createI18n({
  legacy: false,
  locale: getLocalStorageData('locale') || 'en',
  fallbackLocale: 'id',
  messages: {
    en: en,
    id: id
  }
})

export default i18n
