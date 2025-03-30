<template>
  <div class="pill" :class="type">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: '',
  }
})

const type = computed(() => {
  if (!props.type) {
    return []
  }

  return [`pill--${props.type}`]
})
</script>

<style scoped>
.pill {
  background-color: var(--color-generic-gray-light);
  border-radius: var(--border-radius-sm);
  color: var(--color-generic-white);
  font-size: var(--f-sm);
  padding: var(--s-xs) var(--s-sm);

  &.pill--primary {
    background-color: var(--color-primary);
  }

  &.pill--secondary {
    background-color: var(--color-secondary);
  }

  &.pill--tertiary {
    background-color: var(--color-tertiary);
  }
}
</style>
