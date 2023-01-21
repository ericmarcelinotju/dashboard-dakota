<template>
  <span
    class="skeletonBox"
    :style="{ height, width, backgroundColor}"
  />
</template>

<script src="./js/skeleton-box.js"></script>

<style lang="scss" scoped>
.skeletonBox {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 13px;
}
</style>
