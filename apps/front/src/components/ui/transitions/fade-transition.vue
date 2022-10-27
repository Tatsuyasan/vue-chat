<template>
  <transition v-bind="$attrs" appear name="fade">
    <slot></slot>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

/* .fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
