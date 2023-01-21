<template>
  <NotificationGroup
    group="bottom"
    position="bottom"
  >
    <div
      aria-live="assertive"
      class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end"
    >
      <div class="w-full flex flex-col items-center space-y-4 sm:items-start">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div
              class="p-4"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <CheckCircleIcon
                    v-if="notification.type === 'success'"
                    aria-hidden="true"
                    class="h-6 w-6 text-green-400"
                  />
                  <ExclamationCircleIcon
                    v-else-if="notification.type === 'warning'"
                    aria-hidden="true"
                    class="h-6 w-6 text-yellow-400"
                  />
                  <XCircleIcon
                    v-else-if="notification.type === 'danger'"
                    aria-hidden="true"
                    class="h-6 w-6 text-red-400"
                  />
                  <QuestionMarkCircleIcon
                    v-else
                    aria-hidden="true"
                    class="h-6 w-6 text-sky-400"
                  />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">
                    {{ notification.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ notification.text }}
                  </p>
                </div>
                <div
                  v-if="false"
                  class="ml-4 flex-shrink-0 flex"
                >
                  <button
                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    @click="false"
                  >
                    <span class="sr-only">Close</span>
                    <XIcon
                      aria-hidden="true"
                      class="h-5 w-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script src="./js/notification.js"></script>
