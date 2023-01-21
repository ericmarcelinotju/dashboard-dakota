<template>
  <div class="item-card">
    <a
      :class="['item-card__container', { 'preview': preview }]"
      @click="goToUrl"
    >
      <div class="item-card__banner mb-2">
        <img
          :alt="data.name"
          :src="data.image"
        >
      </div>
      <div class="item-card__content">
        <div
          class="item-card__name"
          :title="data.name"
        >
          <span>{{ data.name }}</span>
        </div>
        <template v-if="false">
          <div class="item-card__final-price">
            {{ useCurrencyFormat(offeredPrice) }}
          </div>
          <div
            v-if="listedPrice && hasDiscount"
            class="item-card__price-info"
          >
            <div class="item-card__normal-price">
              {{ useCurrencyFormat(listedPrice) }}
            </div>
            <div class="item-card__discount">{{ discount }}%</div>
          </div>
        </template>
      </div>
      <!--      <button class="item-card__button">Test</button>-->
    </a>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCurrencyFormat } from '@/utils/number'
import { pages } from '@/config'

export default {
  name: 'ItemCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()

    const price = computed(() => {
      return props.data?.price
    })

    const offeredPrice = computed(() => {
      return price.value.offer
    })

    const listedPrice = computed(() => {
      return price.value.list
    })

    const discount = computed(() => {
      return (((listedPrice.value - offeredPrice.value) / listedPrice.value) * 100).toFixed(0)
    })

    const hasDiscount = computed(() => {
      return discount.value > 0
    })

    const goToUrl = () => {
      if (!props.data.url) return
      window.location.assign(props.data.url)
    }

    const gift = () => {
      store.commit('sender/setProduct', props.data)
      router.push(pages.bliForYou.sender)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    return {
      offeredPrice,
      listedPrice,
      discount,
      hasDiscount,
      useCurrencyFormat,
      goToUrl,
      gift
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/responsive";

.item-card {
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: $shadow;
  border-radius: 8px;
  background-color: $white;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 16px -4px rgba(0, 0, 0, 0.24);
    margin-top: -8px;
  }
  transition: all .3s ease-out;
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__banner {
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: $global-radius $global-radius 0 0;
      object-fit: contain;
    }
  }
  &__content {
    height: 64px;
    padding: 4px 10px 10px;
  }
  &__name {
    font-size: $font-size-medium;
    font-weight: normal;
    color: $font-color;
    line-height: 1.29;
    height: 2.6em;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 210px;
    line-break: anywhere;
  }
  &__final-price {
    display: block;
    color: $orange-dark;
    line-height: 1.5;
    font-size: 16px;
    font-family: "efframedium", Helvetica, Arial, sans-serif;
    margin: 2px 0;
  }
  &__price-info {
    display: flex;
    width: 100%;
    align-items: center;
    font-size: $font-size-small;
  }
  &__normal-price {
    display: inline-flex;
    line-height: 1.33;
    color: $font-color-2;
    text-decoration: line-through;
  }
  &__discount {
    display: inline-flex;
    margin: 0 auto 0 5px;
    border-radius: $global-radius;
    background-color: $red-light-4;
    color: $red-light;
    line-height: 1.33;
    padding: 2px 5px;
    font-family: "efframedium", Helvetica, Arial, sans-serif;
  }
  &__button {
    margin-top: auto;
    padding: 8px;
  }
  .preview {
    display: flex;
    flex-direction: row;
    padding: 16px;
    .item-card__banner {
      flex: 0 0 104px;
      border-radius: 16px;
      margin-right: 8px;
    }
  }
}
</style>
