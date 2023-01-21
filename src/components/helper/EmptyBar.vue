<template>
  <div :style="style" />
</template>

<script src="./js/empty-bar.js"></script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/responsive";

div {
  border-radius: $global-radius;
  background: $gray-light-4;
  background-image: linear-gradient(to right, $gray-light-4 10%, $gray-light-3 40%, $gray-light-4 60%);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: shimmer;
  -webkit-animation-timing-function: linear;
}

@keyframes shimmer {
  0% {
    background-position: -250px 0;
  }
  100% {
    background-position: 250px 0;
  }
}
</style>
