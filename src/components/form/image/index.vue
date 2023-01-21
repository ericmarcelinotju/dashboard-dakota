<template>
  <div>
    <div
      v-if="isMultiple"
      class="w-full mt-1"
    >
      <label class="block border max-w-lg rounded-md">
        <input
          :id="id"
          accept="image/*"
          class="
            block
            w-full
            text-sm text-gray-500
            border border-gray-300
            rounded-md
            focus:ring-green-500 focus:border-green-500
            file:mr-4
            file:py-2
            file:px-4
            file:rounded-md
            file:border-0
            file:text-sm
            file:font-semibold
            file:text-gray-700
          "
          :name="name"
          type="file"
          @change="onFileChange"
        >
      </label>
    </div>
    <div
      v-else
      class="py-20 bg-white px-2"
    >
      <div class="max-w-lg rounded-md overflow-hidden">
        <div class="flex">
          <div class="w-full">
            <div
              class="
                rounded-lg
                border-dashed border-2 border-gray-300
                bg-gray-50
                flex
                p-6
                items-start
              "
            >
              <div
                class="
                  border
                  relative
                  h-24
                  w-24
                  rounded-md
                  justify-center
                  flex
                  items-center
                  mr-2
                "
              >
                <div class="">
                  <CloudUploadIcon class="w-12 h-12 text-gray-500" />
                </div>

                <input
                  class="
                    h-full
                    w-full
                    opacity-0
                    cursor-pointer
                    absolute
                    top-0
                    left-0
                    right-0
                    bottom-0
                    border
                    bg-slate-300
                  "
                  multiple
                  type="file"
                  @change="onFileChange"
                >
              </div>
              <div
                v-if="images"
                class="
                  relative
                  rounded-md
                  grid grid-cols-4
                  items-center
                  w-full
                  gap-2
                "
              >
                <div
                  v-for="(image, index) in images"
                  :key="index"
                  class="object-cover relative flex items-center justify-center"
                >
                  <div class="relative opacity-70 rounded-md">
                    <img
                      class="h-24 w-24 object-cover rounded-md"
                      :src="image"
                    >
                  </div>
                  <div
                    class="
                      absolute
                      top-0
                      left-0
                      right-0
                      bottom-0
                      flex
                      justify-center
                      items-center
                    "
                  >
                    <button
                      class="
                        p-1
                        rounded-full
                        bg-gray-50
                        text-gray-500
                        hover:bg-red-700 hover:text-white
                      "
                      @click="removeImage(index)"
                    >
                      <TrashIcon class="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
