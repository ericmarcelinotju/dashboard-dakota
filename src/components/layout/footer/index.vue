<template>
  <footer>
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="
          flex
          justify-between
          border-t border-gray-200
          py-8
          text-sm text-gray-500 text-center
          sm:text-right
        "
      >
        <SwitchGroup
          v-if="false"
          as="div"
          class="flex items-center"
        >
          <span class="mr-3">
            <span class="text-sm font-medium text-gray-900">English </span>
          </span>
          <Switch
            v-model="enabled"
            :class="[
              enabled ? 'bg-sky-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500',
            ]"
            @click="switchLanguage"
          >
            <span
              aria-hidden="true"
              :class="[
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              ]"
            />
          </Switch>
          <span class="ml-3">
            <span class="text-sm font-medium text-gray-900">Indonesia </span>
          </span>
        </SwitchGroup>
        <select
          v-if="false"
          id="country"
          v-model="i18n.locale"
          autocomplete="country-name"
          class="
            mt-1
            block
            w-full
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none focus:ring-sky-500 focus:border-sky-500
            sm:text-sm
          "
          name="country"
        >
          <option
            v-for="locale in i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
        <div>
          <span> Copyright &copy; 2022 </span>
          <a
            class="text-sky-700 hover:text-sky-900"
            href="https://datis.co.id/"
            target="_blank"
          >
            DATIS
          </a>
          Software.
        </div>
      </div>
    </div>
  </footer>
</template>

<script src="./script.js"></script>
