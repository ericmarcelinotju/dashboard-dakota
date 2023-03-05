import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import { TrashIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'CalendarDay',
  components: {
    TrashIcon
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    minHour: {
      type: Number,
      default: 9
    },
    maxHour: {
      type: Number,
      default: 21
    }
  },
  emits: ['calendarClick', 'eventDelete'],
  setup (props, context) {
    const toHour = (hour, minute = 0, format = 'hh:mm A') => dayjs().hour(hour).minute(minute).format(format)
    const getHour = (index) => index + props.minHour - 1
    const totalHour = props.maxHour - props.minHour + 1
    const onCalendarClick = (hour, minute = 0) => {
      context.emit('calendarClick', { hour, minute })
    }
    const onEventDelete = (index) => {
      context.emit('eventDelete', index)
    }

    return {
      toHour,
      getHour,
      totalHour,
      onCalendarClick,
      onEventDelete
    }
  }
})
