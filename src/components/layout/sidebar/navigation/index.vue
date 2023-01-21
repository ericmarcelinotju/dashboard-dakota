<template>
  <div class="navigation">
    <template v-for="item in navigation">
      <router-link
        v-if="!item.children"
        :key="item.name"
        active-class="bg-gray-200/50"
        class="menu-container"
        :class="{ hidden: item.module && !hasPermission(item.module) }"
        :to="item.href || ''"
      >
        <div class="menu-box">
          <img
            :alt="item.icon"
            :src="item.icon"
          >
          <div class="menu-detail">
            {{ item.name }}
          </div>
        </div>
      </router-link>
      <Popover
        v-else
        :key="`parent-${item.name}`"
        as="div"
        class="text-sm relative"
        :class="{ hidden: !hasAnyPermission(item.children) }"
        :default-open="hasActiveChild(item.children)"
      >
        <PopoverButton
          active-class="bg-gray-200/50"
          class="menu-container"
        >
          <div class="menu-box">
            <img
              :alt="item.icon"
              :src="item.icon"
            >
            <div class="menu-detail">
              {{ item.name }}
            </div>
          </div>
        </PopoverButton>
        <PopoverPanel
          v-slot="{ close }"
          class="
            absolute
            -top-2
            left-32
            flex
            gap-4
            border border-gray-300
            bg-white
            rounded-md
            shadow-lg
            p-4
          "
        >
          <router-link
            v-for="subItem in item.children"
            :key="subItem.name"
            class="menu-container is-child"
            :class="{
              hidden: subItem.module && !hasPermission(subItem.module),
            }"
            :to="subItem.href"
            @click="close"
          >
            <div class="menu-box">
              <div
                class="
                  h-16
                  w-16
                  mb-1
                  flex
                  justify-center
                  items-center
                  rounded-md
                  bg-gray-200/50
                "
              >
                <img
                  :alt="subItem.name"
                  :src="subItem.icon"
                >
              </div>
              <div class="menu-detail">
                {{ subItem.name }}
              </div>
            </div>
          </router-link>
        </PopoverPanel>
      </Popover>
    </template>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss">
.menu-container {
  @apply w-full block items-center mt-1 px-3 py-2 leading-6 rounded-md outline-none text-sm hover:bg-gray-200/50;

  &.is-child {
    @apply text-black border border-transparent hover:bg-inherit hover:border-gray-300;
  }

  .menu-box {
    @apply flex flex-col justify-center items-center;

    img {
      @apply w-4/5;
    }

    .menu-detail {
      @apply text-center whitespace-nowrap;
    }
  }
}
</style>
