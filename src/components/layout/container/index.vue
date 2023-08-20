<template>
  <div
    id="app-body"
    class="min-h-full"
  >
    <div class="fixed border-b z-10 w-full bg-primary-red">
      <DefaultHeader
        id="header"
        @about="handleAbout"
        @change-theater="handleChangeTheater"
        @logout="handleLogout"
        @notification="handleNotification"
        @open-sidebar="handleOpenSidebar"
      />
    </div>
    <DefaultSidebar
      :sidebar-open="sidebarOpen"
      @close="handleCloseSidebar"
    />
    <div class="lg:pl-72 min-h-screen flex flex-col flex-1 pt-20">
      <main class="flex-1 pb-8">
        <div>
          <router-view v-slot="{ Component }">
            <transition
              mode="out-in"
              name="fade"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
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

    <DefaultModal
      v-model="visibleChangeTheaterModal"
      :confirm-text="$t('global.ok')"
      description="Select current active theater"
      :has-cancel="false"
      :has-icon="false"
      title="Select Theater"
      type="success"
    >
      <div class="mt-4 grid grid-cols-3 gap-6">
        <div>
          <label
            class="mr-2"
            for="no-theater"
          >
            No Theater
          </label>
          <input
            id="no-theater"
            v-model="activeTheater"
            type="radio"
            :value="theater"
          >
        </div>
        <div
          v-for="theater in theaters"
          :key="theater.id"
        >
          <label
            class="mr-2"
            :for="theater.id"
          >
            {{ theater.name }}
          </label>
          <input
            :id="theater.id"
            v-model="activeTheater"
            type="radio"
            :value="theater"
          >
        </div>
      </div>
    </DefaultModal>
  </div>
</template>

<script src="./script.js"></script>
