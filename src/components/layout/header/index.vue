<template>
  <div class="relative z-10 flex-shrink-0 flex h-20">
    <div class="flex-1 px-4 flex justify-end px-6 mx-auto">
      <div class="ml-4 flex items-center">
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
        <!-- Log dropdown -->
        <Popover
          v-if="hasPermission('GET')"
          v-slot="{ open }"
          as="div"
          class="ml-3 relative"
        >
          <div>
            <PopoverButton
              class="
                relative
                p-1
                rounded-full
                text-bg-primary text-soft-gray
                hover:text-soft-gray
                outline-none
              "
              :class="{
                'ring-1 ring-offset-2 ring-soft-gray': open,
              }"
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
            </PopoverButton>
            <PopoverPanel>
              <div
                class="
                  fixed
                  top-0
                  right-0
                  w-72
                  bg-white
                  mt-16
                  mr-6
                  p-2
                  text-center
                  shadow-lg
                "
              >
                <div class="text-lg font-bold mb-2">Notification</div>

                <div
                  class="max-h-96 -mr-2 overflow-x-hidden overflow-y-auto"
                  v-if="notifications.length > 0"
                >
                  <div
                    v-for="noti in notifications"
                    :key="noti.id"
                    class="
                      relative
                      p-2
                      mb-2
                      text-sm text-left
                      cursor-pointer
                      hover:bg-gray-100
                    "
                    @click="
                      () =>
                        noti.type === 'event'
                          ? handleEventLog()
                          : handleSystemLog()
                    "
                  >
                    <div class="absolute top-0 flex items-center w-full">
                      <span class="whitespace-nowrap mr-2 text-xs">
                        {{ noti.created_at }}
                      </span>
                      <hr class="border-gray-600 w-full" />
                    </div>
                    <div class="mt-4 ml-2">
                      <div class="text-amber-600 mt-2">
                        {{ noti.title }}
                      </div>
                      <div>
                        {{ noti.subject }}
                      </div>
                      <div class="truncate" v-html="noti.content" />
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm text-primary-blue h-48">
                  There are no notifications
                </div>
                <div class="flex gap-x-2 w-full mt-4">
                  <button class="info-button text-sm" @click="handleEventLog">
                    Event Log
                  </button>
                  <button class="info-button text-sm" @click="handleSystemLog">
                    System Log
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </div>
        </Popover>

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
                focus:outline-none
                focus:ring-1
                focus:ring-offset-2
                focus:ring-soft-gray
                lg:p-2 lg:rounded-md lg:hover:bg-primary-blue
              "
            >
              <UserCircleIcon class="text-white h-8 w-8 rounded-full" />
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
                shadow-lg
                py-1
                z-10
                bg-white
                ring-1 ring-soft-gray
                focus:outline-none
              "
            >
              <MenuItem v-slot="{ active }">
                <a
                  :class="[
                    active ? 'bg-white' : '',
                    'block px-4 py-2 text-primary-gray',
                  ]"
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
                    active ? 'bg-white' : '',
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
