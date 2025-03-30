<template>
  <component :is="component" class="card">
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps({
  component: {
    type: String,
    default: 'div',
  }
})
</script>

<style scoped>
.card {
  background-color: var(--color-generic-white);
  border: var(--border);
  border-radius: var(--border-radius-sm);
  container-type: inline-size;
  display: flex;
  gap: var(--s-md);
  padding: var(--s-md);
  width: 100%;
}
</style>
