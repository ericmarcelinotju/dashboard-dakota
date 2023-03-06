<template>
  <TransitionRoot
    as="template"
    :show="value"
  >
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      :open="value"
      @close="close"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          aria-hidden="true"
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >
          &#8203;
        </span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              overflow-visible
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-4
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6
            "
          >
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                class="
                  bg-white
                  rounded-md
                  text-gray-400
                  hover:text-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-soft-gray
                "
                type="button"
                @click="close"
              >
                <span class="sr-only">Close</span>
                <XIcon
                  aria-hidden="true"
                  class="h-6 w-6"
                />
              </button>
            </div>
            <div class="sm:flex sm:items-start">
              <div
                v-if="hasIcon"
                class="
                  mx-auto
                  flex-shrink-0 flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  sm:mx-0 sm:h-10 sm:w-10
                  bg-soft-gray
                "
              >
                <ExclamationIcon
                  aria-hidden="true"
                  class="`h-6 w-6 text-primary-gray`"
                />
              </div>
              <div class="w-full text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-gray-900 font-bold"
                >
                  {{ title }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ description }}
                  </p>
                </div>
                <slot />
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                v-if="hasConfirm"
                :class="`${type}-button`"
                :disabled="loading"
                type="button"
                @click="confirm"
              >
                <Loading v-if="loading" />
                {{ confirmText }}
              </button>
              <button
                v-if="hasCancel"
                class="default-button mr-6"
                type="button"
                @click="close"
              >
                {{ cancelText }}
              </button>
              <slot name="action" />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script src="./script.js"></script>
