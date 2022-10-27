<script setup>
defineProps({
  to: { type: [String, Object], default: null },
  buttonRef: { type: Function, default: () => ({}) },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null }
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :ref="buttonRef"
    class="plain-button"
    :to="to"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.plain-button {
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: inherit;
  font-family: var(--font-family);
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-text-secondary);
  }
}
</style>
