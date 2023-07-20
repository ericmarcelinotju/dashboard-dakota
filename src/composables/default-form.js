import { notify } from 'notiwind'
import { useI18n } from 'vue-i18n'

const useDefaultForm = (objectName = '') => {
  const { t } = useI18n()

  const showNotification = (actionName = 'action', type = 'success', message, timeout = 3000) => {
    notify({
      group: 'bottom',
      type: type,
      title: t(`app.components.notification.${type}.defaultTitle`),
      text: message || t(`app.components.notification.${type}.defaultMessage`, { name: objectName, action: actionName })
    }, timeout)
  }

  const showSuccessNotification = (actionName = 'action', message) => {
    showNotification(actionName, 'success', message)
  }

  const showDangerNotification = (actionName = 'action', message) => {
    if (Array.isArray(message)) {
      message = message.join('\n')
    }
    console.log(message)
    showNotification(actionName, 'danger', message)
  }

  const showWarningNotification = (actionName = 'action', message) => {
    showNotification(actionName, 'warning', message)
  }

  const showInfoNotification = (actionName = 'action', message) => {
    showNotification(actionName, 'info', message)
  }

  return {
    showSuccessNotification,
    showDangerNotification,
    showWarningNotification,
    showInfoNotification
  }
}

export {
  useDefaultForm
}
