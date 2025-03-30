<template>
  <button
    type="button"
    class="button"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  align-items: center;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-sm);
  color: var(--color-generic-white);
  display: flex;
  justify-content: center;
  padding: var(--s-xs) var(--s-sm);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    filter: brightness(125%);
  }
}
</style>
