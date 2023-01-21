<template>
  <form>
    <div class="default-field">
      <label
        class="default-label"
        for="branch"
      >
        {{ $t("app.fields.branch") }}*
      </label>
      <InputDropdown
        id="branch"
        v-model="params.branch_id"
        class="default-input"
        :options="branches"
        @input="onChangeBranch"
      />
    </div>
  </form>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
.default-field {
  .default-label {
    width: 240px;
  }
  .default-input {
    width: 240px;
    flex: none;
  }
}
</style>
