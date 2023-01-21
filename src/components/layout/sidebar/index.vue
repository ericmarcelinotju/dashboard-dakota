<template>
  <div class="shadow-lg text-white">
    <!-- Static sidebar for desktop -->
    <div class="z-20 flex w-28 flex-col fixed inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow px-2 pt-1">
        <nav
          aria-label="Sidebar"
          class="flex-1 flex flex-col divide-y divide-soft-gray"
        >
          <div class="space-y-1 w-full">
            <DefaultNavigation :navigation="navigations" />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
