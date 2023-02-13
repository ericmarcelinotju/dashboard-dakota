import { defineAsyncComponent } from 'vue'

export default {
  DefaultSearch: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-search" */ '@/components/default/search/index.vue')),
  DefaultTable: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-table" */ '@/components/default/table/index.vue')),
  DefaultCreateEdit: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-create-edit" */ '@/components/default/createEdit/index.vue')),
  DefaultModal: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-modal" */ '@/components/default/modal/index.vue')),
  DefaultPage: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-page" */ '@/components/default/page/index.vue')),
  DefaultTabs: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-default-tabs" */ '@/components/default/Tabs.vue')),
  InputImage: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-image" */ '@/components/form/image/index.vue')),
  InputDropdown: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-dropdown" */ '@/components/form/dropdown/index.vue')),
  InputMultiselect: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-multiselect" */ '@/components/form/Multiselect.vue')),
  InputMultitext: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-multitext" */ '@/components/form/Multitext.vue')),
  // InputWYSIWYG: defineAsyncComponent(() => import(
  //   /* webpackChunkName: "c-input-wysiwyg" */ '@/components/form/wysiwyg/index.vue')),
  InputSwitch: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-switch" */ '@/components/form/Switch.vue')),
  InputAudio: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-audio" */ '@/components/form/Audio.vue')),
  InputAvatar: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-input-avatar" */ '@/components/form/Avatar.vue')),
  // InputDualList: defineAsyncComponent(() => import(
  //   /* webpackChunkName: "c-input-dualList" */ '@/components/form/dualList/index.vue')),

  Loading: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-helper-loading" */ '@/components/helper/Loading.vue')),
  PopoverInfo: defineAsyncComponent(() => import(
    /* webpackChunkName: "c-helper-popover-info" */ '@/components/helper/PopoverInfo.vue'))
}
