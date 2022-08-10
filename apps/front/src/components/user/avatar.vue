<script lang="ts" setup></script>

<template>
  <div class="avatar">
    <div class="flex items-center gap-4 h-full">
      <div class="img bg-red" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  height: 100%;
  .img {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 50%;
  }
}
</style>
