<template>
  <DefaultPage title="Ticket">
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="false"
        :has-edit="false"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="handleDelete"
        @edit="handleEdit"
        @search="handleSearch"
      >
        <template #user="{ item }">
          <span>{{ item.user?.username }}</span>
        </template>
        <template #status="{ item }">
          <span class="default-tag">{{ item.status }}</span>
        </template>
        <template #view="{ item }">
          <div class="action">
            <a @click="handleDetail(item)"> Lihat </a>
          </div>
        </template>
      </DefaultTable>
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
