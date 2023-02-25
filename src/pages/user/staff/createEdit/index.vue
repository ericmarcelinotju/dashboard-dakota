<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="overflow-y-auto pb-6">
        <DefaultTabs :options="tabOptions">
          <template #profile>
            <user-form
              :loading="loading"
              :user="params"
            />
          </template>
          <template #workin>
            <work-form
              :loading="loading"
              :user="params"
            />
          </template>
        </DefaultTabs>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
