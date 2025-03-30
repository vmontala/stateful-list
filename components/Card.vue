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
  border: 0.2rem solid var(--color-generic-gray-light);
  border-radius: var(--border-radius-sm);
  container-type: inline-size;
  display: flex;
  gap: var(--s-md);
  padding: var(--s-md);
}
</style>
