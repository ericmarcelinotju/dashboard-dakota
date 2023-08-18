<template>
  <DefaultCreateEdit>
    <template #form>
      <div v-if="formLoading">
        <Loading />
      </div>
      <div
        v-else
        class="p-6 overflow-y-auto"
      >
        <div class="default-field">
          <label class="default-label">
            Kode
          </label>
          <input
            id="code"
            v-model="params.code"
            class="default-input"
            disabled
            type="text"
          >
        </div>

        <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="date"
            >
              Tanggal
            </label>
            <input
              id="date"
              v-model="params.date"
              class="default-input"
              disabled
              type="text"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="time"
            >
              Waktu
            </label>
            <input
              id="time"
              v-model="params.time"
              class="default-input"
              disabled
              type="text"
            >
          </div>

          <hr class="col-span-12">

          <div class="col-span-12 text-lg">
            Pemesan :
          </div>
          <div class="default-field col-span-4">
            <label class="default-label">
              Username
            </label>
            <p
              class="link"
              @click="onUserClick(params.user.id)"
            >
              {{ params.user?.username }}
            </p>
          </div>
          <div class="default-field col-span-4">
            <label class="default-label">
              Email
            </label>
            <p>{{ params.user?.email }}</p>
          </div>
          <div class="default-field col-span-4">
            <label class="default-label">
              Nomor Telepon
            </label>
            <p>{{ params.user?.phone }}</p>
          </div>

          <hr class="col-span-12">

          <div class="col-span-12 text-lg">
            Isi Pesanan :
          </div>

          <template v-if="params.category === 'product'">
            <div class="default-field col-span-3">
              <label class="default-label">
                Kode
              </label>
            </div>
            <div class="default-field col-span-3">
              <label class="default-label">
                Kuantitas
              </label>
            </div>
            <div class="default-field col-span-3">
              <label class="default-label">
                Harga
              </label>
            </div>
            <div class="default-field col-span-3">
              <label class="default-label">
                Total
              </label>
            </div>
            <template
              v-for="item in params.items"
              :key="item"
            >
              <div class="col-span-3">
                <span
                  class="link"
                  @click="onProductClick(item.product.id)"
                >
                  {{ item.product.code }}
                </span>
                <span> - {{ item.product.name }}</span>
              </div>
              <div class="col-span-3">
                <p>{{ item.qty }}</p>
              </div>
              <div class="col-span-3">
                <p>{{ item.price }}</p>
              </div>
              <div class="col-span-3">
                <p>{{ item.total }}</p>
              </div>
            </template>
          </template>
          <template v-else-if="params.category === 'ticket'">
            <div class="default-field col-span-2">
              <label class="default-label">
                Studio
              </label>
            </div>
            <div class="default-field col-span-2">
              <label class="default-label">
                Film
              </label>
            </div>
            <div class="default-field col-span-2">
              <label class="default-label">
                Tanggal Tayang
              </label>
            </div>
            <div class="default-field col-span-2">
              <label class="default-label">
                Jam Tayang
              </label>
            </div>
            <div class="default-field col-span-1">
              <label class="default-label">
                Kursi
              </label>
            </div>
            <div class="default-field col-span-3">
              <label class="default-label">
                Total
              </label>
            </div>
            <template
              v-for="item in params.items"
              :key="item"
            >
              <div class="col-span-2">
                <span
                  class="link"
                  @click="onStudioClick(item.screening.studio?.id)"
                >
                  {{ item.screening.studio?.code }}
                </span>
                <span> - {{ item.screening.studio?.name }}</span>
              </div>
              <div class="col-span-2">
                <span
                  class="link"
                  @click="onMovieClick(item.screening.movie.id)"
                >
                  {{ item.screening.movie.code }}
                </span>
                <span> - {{ item.screening.movie.title }}</span>
              </div>
              <div class="col-span-2">
                <p>{{ item.screening.date }}</p>
              </div>
              <div class="col-span-2">
                <p>{{ item.screening.time }}</p>
              </div>
              <div class="col-span-1">
                <p>{{ item.seat.name }}</p>
              </div>
              <div class="col-span-3">
                <p>{{ item.total }}</p>
              </div>
            </template>
          </template>

          <hr class="col-span-12">

          <label class="col-span-9 text-right">
            Sub Total
          </label>
          <div class="col-span-3">
            <p>{{ params.subTotalAmount }}</p>
          </div>
          <label class="col-span-9 text-right">
            Total
          </label>
          <div class="col-span-3">
            <p>{{ params.totalAmount }}</p>
          </div>
        </div>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
