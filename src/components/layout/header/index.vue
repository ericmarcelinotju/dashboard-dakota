<template>
  <div
    class="
      relative
      z-10
      flex-shrink-0 flex
      h-20
      border-b border-gray-200
      lg:border-none
    "
  >
    <button
      class="
        px-4
        border-r border-gray-200
        text-soft-gray
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-soft-gray
        lg:hidden
      "
      type="button"
      @click="handleOpenSidebar"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuAlt1Icon aria-hidden="true" class="h-6 w-6" />
    </button>
    <!-- Search bar -->
    <div class="flex-1 px-4 flex justify-between sm:px-6 lg:mx-auto lg:px-6">
      <div class="flex-1 flex items-center">
        <h1 class="text-xl font-bold text-soft-gray">
          Halo, {{ user.username }} !
        </h1>
      </div>
      <div class="ml-4 flex items-center md:ml-6">
        <!-- About button -->
        <!-- <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="
                relative
                p-1
                rounded-full
                text-bg-primary text-soft-gray
                hover:text-soft-gray
                focus:outline-none
                focus:ring-1
                focus:ring-offset-2
                focus:ring-soft-gray
              "
              @click="handleAbout"
            >
              <div
                aria-hidden="true"
                class="
                  flex
                  items-center
                  justify-center
                  text-white text-2xl
                  font-bold
                  h-6
                  w-6
                "
              >
                ?
              </div>
            </MenuButton>
          </div>
        </Menu> -->
        <!-- Notification dropdown -->
        <!-- <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="
                relative
                p-1
                rounded-full
                text-bg-primary text-soft-gray
                hover:text-soft-gray
                focus:outline-none
                focus:ring-1
                focus:ring-offset-2
                focus:ring-soft-gray
              "
            >
              <BellIcon aria-hidden="true" class="text-white h-6 w-6" />
              <div
                v-if="notifications.length > 0"
                class="
                  absolute
                  top-0
                  right-0
                  w-2
                  h-2
                  rounded-full
                  bg-primary-red
                "
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="
                origin-top-right
                absolute
                right-0
                mt-4
                w-52
                rounded-md
                shadow-lg
                py-1
                z-10
                bg-soft-gray
                ring-1 ring-soft-gray
                focus:outline-none
              "
            >
              <MenuItem v-if="notifications.length <= 0">
                <span
                  class="
                    block
                    px-4
                    py-2
                    text-sm text-primary-gray
                    cursor-pointer
                  "
                  >{{ $t("app.components.notification.empty") }}</span
                >
              </MenuItem>
              <MenuItem
                v-for="notification in notifications"
                v-else
                :key="notification.id"
                v-slot="{ active }"
              >
                <a
                  :class="[
                    active ? 'bg-white' : '',
                    'block px-4 py-2 text-primary-gray cursor-pointer',
                  ]"
                  @click="handleNotification(notification)"
                >
                  <div class="font-bold">
                    {{ notification.title }}
                  </div>
                  <div
                    class="
                      text-sm
                      whitespace-nowrap
                      text-ellipsis
                      overflow-hidden
                    "
                  >
                    {{ notification.subject }}
                  </div>
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu> -->

        <!-- Profile dropdown -->
        <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="
                max-w-xs
                rounded-full
                flex
                items-center
                text-sm
                lg:p-2 lg:rounded-md lg:hover:bg-red-500
              "
            >
              <img v-if="user.avatar" :src="user.avatar" class="h-10 w-10 rounded-full" alt="avatar">
              <UserCircleIcon v-else class="text-white h-10 w-10 rounded-full" />
              <ChevronDownIcon
                aria-hidden="true"
                class="
                  hidden
                  flex-shrink-0
                  ml-1
                  h-5
                  w-5
                  text-soft-gray
                  lg:block
                "
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="
                origin-top-right
                absolute
                right-0
                mt-4
                w-48
                rounded-md
                shadow-lg
                overflow-hidden
                z-10
                bg-white
                ring-1 ring-soft-gray
                focus:outline-none
              "
            >
              <MenuItem v-slot="{ active }">
                <a
                  class="block px-4 py-2 text-primary-gray"
                >
                  <div class="mb-2">
                    <b>{{ user.role.name }}</b>
                  </div>
                  <div>{{ user.username }}</div>
                </a>
              </MenuItem>
              <hr />
              <MenuItem v-slot="{ active }">
                <a
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-primary-gray cursor-pointer flex items-center',
                  ]"
                  @click="handleLogout"
                >
                  <LogoutIcon class="h-6 w-6 rounded-full mr-4" />
                  <span>{{ $t("global.logout") }}</span>
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
