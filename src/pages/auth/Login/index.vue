<template>
  <div class="absolute h-full w-full flex">
    <div
      class="
        relative
        flex-1 flex flex-col
        justify-center
        py-12
        px-4
        sm:px-6
        lg:flex-none lg:px-20
        xl:px-24
      "
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            alt="Application Icon"
            class="w-36"
            src="@/assets/img/icon/dakota-red.png"
          >
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form
              action="#"
              class="space-y-6"
              method="POST"
              @submit.prevent="handleLogin"
            >
              <div>
                <label
                  class="default-label"
                  for="username"
                > Username </label>
                <div class="mt-1">
                  <input
                    id="username"
                    v-model="params.username"
                    autocomplete="username"
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      placeholder-gray-400
                      focus:outline-none focus:ring-red-500 focus:border-red-500
                      sm:text-sm
                    "
                    name="username"
                    required
                    type="text"
                  >
                </div>
              </div>

              <div class="space-y-1">
                <label
                  class="default-label"
                  for="password"
                > Password </label>
                <div class="mt-1">
                  <input
                    id="password"
                    v-model="params.password"
                    autocomplete="current-password"
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      placeholder-gray-400
                      focus:outline-none focus:ring-red-500 focus:border-red-500
                      sm:text-sm
                    "
                    name="password"
                    required
                    type="password"
                  >
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    v-model="params.remember_me"
                    class="default-checkbox"
                    name="remember-me"
                    type="checkbox"
                  >
                  <label
                    class="ml-2 block text-sm text-gray-900"
                    for="remember-me"
                  >
                    Remember me
                  </label>
                </div>

                <!-- <div class="text-sm">
                  <a
                    class="font-medium text-red-600 hover:text-red-500"
                    @click="handleForgotPassword"
                  >
                    Forgot your password?
                  </a>
                </div> -->
              </div>

              <button
                class="
                  w-full
                  flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-white
                  bg-primary-red
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-red-500
                "
                type="submit"
              >
                Sign in
              </button>
              <p
                v-if="error"
                class="text-sm text-red-700"
              >
                {{ error }}
              </p>
            </form>
          </div>
        </div>
      </div>
      <span class="absolute bottom-8 left-8">
        Version: {{ appVersion }}
      </span>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        src="@/assets/img/login-background.jpg"
      >
    </div>
  </div>
</template>

<script src="./script.js"></script>
