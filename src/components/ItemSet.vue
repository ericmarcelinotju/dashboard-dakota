<template>
  <div class="item-set">
    <div
      v-if="title"
      class="item-set__title"
    >
      <div>{{ title }}</div>
      <div
        v-if="seeAllLink"
        class="action-button tx-blue"
        @click="seeAll"
      >
        See all
      </div>
    </div>
    <div class="item-set__list hide-scroll-bar">
      <div
        v-if="loading"
        class="item-set__loading"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="empty-bar__container"
        >
          <empty-bar
            class="empty-bar"
            height="100%"
          />
        </div>
      </div>
      <div
        v-for="(data) in items"
        v-else
        :key="data.id"
        class="item-set__list-item"
      >
        <item-card :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import EmptyBar from '@/components/helper/EmptyBar.vue'
import ItemCard from '@/components/ItemCard.vue'

export default {
  components: {
    EmptyBar,
    ItemCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
    seeAllLink: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const seeAll = () => {
      window.open('https://www.blibli.com/cari/hadiah?page=1&start=0&searchTerm=hadiah&intent=false&merchantSearch=true&multiCategory=true&customUrl=hadiah&sort=0&rating=4&catIntent=false&shipment=blibli')
    }

    return {
      seeAll
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/responsive";

$itemWidth: 150px;

.item-set {
  position: relative;
  padding: 16px;
  width: 100%;
  &:first-child {
    margin-top: -120px;
  }
  &__title {
    font-size: 18px;
    font-family: efframedium,Helvetica,Arial,sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: bold;
    .action-button {
      font-size: $font-size-medium;
      line-height: 16px;
      cursor: pointer;
    }
  }
  &__list {
    display: flex;
    overflow-x: auto;
    //padding: 8px 0;
    margin: 0 -16px;
    padding: 16px;
    &-item {
      position: relative;
      flex: 0 0 $itemWidth;
      width: $itemWidth;
      &:first-child {
        //margin-left: 16px;
      }
      &:not(:first-child) {
        margin-left: 8px;
      }
      &:last-child {
        //padding-right: 16px;
        &:after {
          content: " ";
          position: absolute;
          width: 16px;
          right: -16px;
          height: 100%;
          top: 0;
        }
      }
    }
  }
  .hide-scroll-bar::-webkit-scrollbar {
    @include desktop {
      overflow-x: hidden;
    }
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scroll-bar {
    @include desktop {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  }
}
</style>
