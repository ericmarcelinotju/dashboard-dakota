<template>
  <div class="navigation">
    <template v-for="item in navigation">
      <router-link
        v-if="!item.children"
        :key="item.name"
        active-class="border-r-8 border-primary-red"
        class="
          group
          flex
          items-center
          px-6
          py-3
          leading-6
          font-medium
          text-base
          group
          hover:text-white hover:bg-primary-red
        "
        :class="{ hidden: item.module && !hasPermission(item.module) }"
        :to="item.href || ''"
      >
        <component
          :is="item.icon"
          active-class="text-white"
          aria-hidden="true"
          class="mr-4 h-6 w-6 text-base group hover:bg-red-600"
        />
        {{ item.name }}
      </router-link>
      <Disclosure
        v-else
        :key="`parent-${item.name}`"
        v-slot="{ open }"
        as="div"
        class="space-y-1"
        :class="{ hidden: !hasAnyPermission(item.children) }"
        :default-open="hasActiveChild(item.children)"
      >
        <DisclosureButton
          active-class="bg-primary-red text-white"
          :class="[
            'hover:text-white hover:bg-red-600',
            'group w-full flex items-center px-6 py-3 text-left text-base font-medium',
          ]"
        >
          <component
            :is="item.icon"
            aria-hidden="true"
            class="mr-4 flex-shrink-0 h-6 w-6"
          />
          <span class="flex-1">
            {{ item.name }}
          </span>
          <svg
            aria-hidden="true"
            :class="[
              open ? 'rotate-90' : '',
              'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150',
            ]"
            viewBox="0 0 20 20"
          >
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </DisclosureButton>
        <DisclosurePanel class="space-y-1">
          <router-link
            v-for="subItem in item.children"
            :key="subItem.name"
            active-class="bg-primary-red text-white"
            class="
              group
              w-full
              flex
              items-center
              pl-10
              pr-2
              py-2
              text-base
              font-medium
              hover:text-white hover:bg-red-600
            "
            :class="{
              hidden: subItem.module && !hasPermission(subItem.module),
            }"
            :to="subItem.href"
          >
            <component
              :is="subItem.icon"
              aria-hidden="true"
              class="mr-4 flex-shrink-0 h-6 w-6"
            />
            {{ subItem.name }}
          </router-link>
        </DisclosurePanel>
      </Disclosure>
    </template>
  </div>
</template>

<script src="./script.js"></script>
