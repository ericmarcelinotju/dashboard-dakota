<template>
  <div class="flex-auto min-h-0 flex flex-col">
    <div class="mb-3 flex justify-between items-end">
      <div class="inset-y-0 left-0 flex items-center" />
      <div
        v-if="hasSelection"
        class="right-0 flex items-center"
      >
        <slot name="selection-action" />
      </div>
    </div>
    <div
      class="align-middle min-w-full overflow-x-auto"
      :class="{ shadow: !isBorderless }"
    >
      <table
        class="min-w-full divide-y divide-gray-200"
        :class="{ 'border border-collapse': !isBorderless }"
        :style="tableStyle"
      >
        <thead
          class="bg-gray-100 outline outline-1 outline-gray-300 sticky top-0"
        >
          <tr>
            <th v-if="hasSelection">
              <div>
                <input
                  class="default-checkbox"
                  style="margin-right: 0"
                  type="checkbox"
                  @input="onSelectionInput"
                >
              </div>
            </th>
            <th v-if="hasDetail">
              <!-- Leave empty for header -->
            </th>
            <th
              v-for="field in filterFields"
              :key="field"
              class="head"
              :class="field.class"
              scope="col"
              :title="field.name"
              :width="field.width"
              @click="setSort(field)"
            >
              <div>
                <span class="mr-1">
                  {{
                    field.name &&
                      $t(`app.fields.${toSimplifiedObjectName(field.value)}`)
                  }}
                </span>
                <Component
                  :is="getSortingComponent(field)"
                  v-if="field.sortable"
                  class="inline h-5 w-5 cursor-pointer"
                />
              </div>
            </th>
            <th
              v-if="hasEdit"
              class="head action"
            >
              edit
            </th>
            <th
              v-if="hasDelete"
              class="head action"
            >
              delete
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="hasItems">
            <template
              v-for="(item, index) in items"
              :key="item.id"
            >
              <tr
                class="custom-table-row"
                :class="{ 'cursor-pointer': isClickable }"
                @click="onRowClick(item)"
              >
                <td v-if="hasDetail">
                  <a
                    class="cursor-pointer"
                    @click="onToogleDetail(index, item)"
                  >
                    <ChevronDownIcon
                      v-if="!item.isDetailOpen"
                      class="h-6 w-6"
                    />
                    <ChevronUpIcon
                      v-else
                      class="h-6 w-6"
                    />
                  </a>
                </td>
                <td
                  v-for="field in filterFields"
                  :key="field"
                  :class="field.class"
                >
                  <template v-if="$slots[field.value]">
                    <slot
                      :item="item"
                      :name="field.value"
                    />
                  </template>
                  <span v-else>
                    {{ item[field.value] }}
                  </span>
                </td>
                <td
                  v-if="hasEdit"
                  class="action"
                >
                  <a
                    class="edit"
                    @click="onEdit(item)"
                  >
                    <PencilIcon class="h-6 w-6 mr-1" />
                  </a>
                </td>
                <td
                  v-if="hasDelete"
                  class="action"
                >
                  <a
                    class="delete"
                    @click="onDelete(item)"
                  >
                    <TrashIcon class="h-6 w-6 mr-1" />
                  </a>
                </td>
              </tr>
              <tr v-if="hasDetail && item.isDetailOpen">
                <td colspan="100%">
                  <slot
                    :item="item"
                    name="detail"
                  />
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td :colspan="fields.length">
                <div class="text-center p-12">
                  <template v-if="loading">
                    <img
                      alt="loading..."
                      class="mx-auto h-24 w-24"
                      src="@/assets/img/animated/loading.svg"
                    >
                    <h3 class="mb-3 mt-1 text-sm font-semibold text-gray-500">
                      {{ $t("app.components.customTable.loading.title") }}
                    </h3>
                  </template>
                  <template v-else>
                    <CloudIcon class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-medium text-gray-900">
                      {{
                        $t("app.components.customTable.emptyState.title", {
                          name,
                        })
                      }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      {{
                        $t("app.components.customTable.emptyState.description")
                      }}
                    </p>
                  </template>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      v-if="hasPagination"
      class="flex justify-between items-center mt-4"
    >
      <Pagination
        v-if="total"
        :current="pagination.page"
        :current-total="items.length"
        :per-page="pagination.limit"
        :total="total"
        @page-changed="(page) => (pagination.page = page)"
      />
      <label
        class="sr-only"
        for="item-per-page"
      >
        {{ $t("app.components.customTable.itemPerPageLabel") }}
      </label>
      <select
        id="item-per-page"
        v-model="pagination.limit"
        autocomplete="item-per-page"
        class="
          focus:ring-sky-700 focus:border-sky-700
          h-full
          pr-7
          border-gray-300
          bg-transparent
          text-gray-500
          sm:text-sm
        "
        name="item-per-page"
      >
        <option
          v-for="option in itemPerPageOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
.head {
  @apply px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 whitespace-nowrap;

  &.action {
    @apply text-center w-1;
  }
}
</style>
