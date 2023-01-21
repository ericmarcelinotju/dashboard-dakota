<template>
  <div class="shadow-lg">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="fixed inset-0 flex z-40 lg:hidden" @close="close">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              flex-1 flex flex-col
              max-w-xs
              w-full
              pt-5
              pb-4
              bg-white
            "
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  class="
                    ml-1
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-white
                  "
                  type="button"
                  @click="close"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon aria-hidden="true" class="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <nav
              aria-label="Sidebar"
              class="
                mt-5
                flex-shrink-0
                h-full
                divide-y divide-sky-800
                overflow-y-auto
              "
            >
              <div class="px-2 space-y-1">
                <DefaultNavigation :navigation="navigations" />
              </div>
            </nav>
          </div>
        </TransitionChild>
        <div aria-hidden="true" class="flex-shrink-0 w-14">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="
        hidden
        lg:flex
        w-full
        lg:w-72 lg:flex-col lg:fixed lg:inset-y-0
        mt-20
      "
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow bg-white overflow-y-auto">
        <nav
          aria-label="Sidebar"
          class="
            pt-6
            flex-1 flex flex-col
            divide-y divide-soft-gray
            overflow-y-auto
            bg-secondary-red
          "
        >
          <DefaultNavigation :navigation="navigations" />
        </nav>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
