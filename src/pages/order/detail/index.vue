<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%]">
        <div class="default-field">
          <label
            class="default-label"
            for="code"
          >
            Kode<sup>*</sup>
          </label>
          <input
            id="code"
            v-model="params.code"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="title"
          >
            Title<sup>*</sup>
          </label>
          <input
            id="title"
            v-model="params.title"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="description"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            v-model="params.description"
            class="default-input"
          />
        </div>

        <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="runTime"
            >
              Durasi<sup>*</sup>
            </label>
            <input
              id="runTime"
              v-model="params.runTime"
              class="default-input"
              required
              type="number"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="releaseDate"
            >
              Tanggal Rilis<sup>*</sup>
            </label>
            <Datepicker
              id="releaseDate"
              v-model="params.releaseDate"
              auto-apply
              input-class-name="default-input"
              vertical
            />
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="rating"
            >
              Rating Usia<sup>*</sup>
            </label>
            <input
              id="rating"
              v-model="params.rating"
              class="default-input"
              required
              type="number"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="genre"
            >
              Genre
            </label>
            <input
              id="genre"
              v-model="params.genre"
              class="default-input"
              required
              type="text"
            >
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="actors"
            >
              Aktor
            </label>
            <InputMultitext
              id="actors"
              v-model="params.actors"
              placeholder="Nama-nama aktor"
            />
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="actresses"
            >
              Aktris
            </label>
            <InputMultitext
              id="actresses"
              v-model="params.actresses"
              placeholder="Nama-nama aktris"
            />
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="producer"
            >
              Produser
            </label>
            <input
              id="producer"
              v-model="params.producer"
              class="default-input"
              type="text"
            >
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="distributor"
            >
              Distributor
            </label>
            <input
              id="distributor"
              v-model="params.distributor"
              class="default-input"
              type="text"
            >
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="director"
            >
              Director
            </label>
            <input
              id="director"
              v-model="params.director"
              class="default-input"
              type="text"
            >
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="writer"
            >
              Writer
            </label>
            <input
              id="writer"
              v-model="params.writer"
              class="default-input"
              type="text"
            >
          </div>
        </div>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
