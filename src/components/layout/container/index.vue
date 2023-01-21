<template>
  <div id="app-body" class="min-h-full">
    <div class="fixed border-b z-10 w-full bg-primary-red">
      <DefaultHeader
        id="header"
        @logout="handleLogout"
        @notification="handleNotification"
        @about="handleAbout"
        @open-sidebar="handleOpenSidebar"
      />
    </div>
    <DefaultSidebar :sidebar-open="sidebarOpen" @close="handleCloseSidebar" />
    <div class="lg:pl-72 min-h-screen flex flex-col flex-1 pt-20">
      <main class="flex-1 pb-8">
        <div class="mt-8">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
      <DefaultFooter id="footer" />
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
