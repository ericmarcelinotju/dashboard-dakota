<template>
  <div
    id="app-body"
    class="min-h-full"
  >
    <img
      alt="default background"
      class="-z-50 absolute h-full w-full"
      src="@/assets/img/default-background.jpg"
    >
    <div class="fixed z-10 w-full">
      <DefaultHeader
        id="header"
        @about="handleAbout"
        @logout="handleLogout"
        @notification="handleNotification"
      />
    </div>
    <DefaultSidebar />
    <div class="pl-28 min-h-screen flex flex-col flex-1 pt-20">
      <main class="flex-1 pb-8">
        <router-view v-slot="{ Component }">
          <transition
            mode="out-in"
            name="fade"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <!-- <DefaultFooter id="footer" /> -->
    </div>
    <DefaultModal
      v-model="visibleNotificationModal"
      :confirm-text="$t('global.ok')"
      :description="currNotification.subject"
      :has-cancel="false"
      :has-icon="false"
      :title="currNotification.title"
      type="success"
    >
      <div
        class="border rounded-md mt-4 p-3"
        v-html="currNotification.content"
      />
    </DefaultModal>
  </div>
</template>

<script src="./script.js"></script>
