<template>
  <div class="absolute h-full w-full flex flex-col justify-center text-white">
    <img
      alt="login background"
      class="absolute h-full w-full"
      src="@/assets/img/login-background.png"
    >
    <div class="mx-auto w-full max-w-sm lg:w-96 z-10">
      <h2 class="mt-6 text-3xl text-center">
        Central Recording Management System
      </h2>

      <div class="mt-8">
        <form
          action="#"
          method="POST"
          @submit.prevent="handleLogin"
        >
          <div
            v-if="error"
            class="font-bold text-sm text-[#ff0000] mb-4"
          >
            {{ error }}
          </div>
          <div class="relative">
            <UserIcon class="absolute left-0 w-6 h-6" />
            <input
              id="username"
              v-model="params.username"
              autocomplete="username"
              name="username"
              placeholder="Username"
              required
              type="text"
            >
          </div>

          <div class="mt-4 relative">
            <LockClosedIcon class="absolute left-0 w-6 h-6" />
            <input
              id="password"
              v-model="params.password"
              autocomplete="password"
              class="default-input"
              name="password"
              placeholder="Password"
              required
              type="password"
            >
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="params.remember_me"
                class="default-checkbox cursor-pointer"
                name="remember-me"
                type="checkbox"
              >
              <label
                class="block text-sm cursor-pointer"
                for="remember-me"
              >
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                class="font-medium cursor-pointer"
                @click="handleForgotPassword"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div class="mt-6 text-center">
            <button
              class="info-button login"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <DefaultModal
        v-model="visibleForgotPasswordModal"
        description="Please enter the username and the email address associated with the username. The instructions will be sent to the Email bound with the username."
        :has-icon="false"
        :is-close-on-confirm="false"
        :loading="forgotPasswordLoading"
        title="Reset Password"
        type="info"
        @close="onCloseForgotPassword"
        @confirm="onConfirmForgotPassword"
      >
        <input
          v-model="forgotPasswordParams.username"
          class="default-input mt-4"
          placeholder="Username"
          required
          type="text"
        >
        <input
          v-model="forgotPasswordParams.email"
          class="default-input my-6"
          placeholder="Email"
          required
          type="text"
        >
        <div
          v-if="forgotPasswordMessage"
          class="font-bold text-sm text-[#ff0000] mb-4"
        >
          {{ forgotPasswordMessage }}
        </div>
      </DefaultModal>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
input#username,
input#password {
  @apply mt-1 pl-8 block w-full shadow-sm text-sm border-0 border-b border-white bg-transparent ring-0 outline-0;

  &::placeholder {
    @apply text-gray-400;
  }
}

button.login {
  @apply text-xl py-2 px-12;
}
</style>
