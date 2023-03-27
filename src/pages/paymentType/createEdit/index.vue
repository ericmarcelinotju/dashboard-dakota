<template>
  <DefaultCreateEdit>
    <template #form>
      <DefaultTabs
        :options="tabOptions"
      >
        <template #paymentType>
          <payment-type-form
            :loading="loading"
            :payment-type="params"
          />
        </template>
        <template #theater>
          <theater-form
            :loading="loading"
            :payment-type="params"
          />
        </template>
      </DefaultTabs>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
