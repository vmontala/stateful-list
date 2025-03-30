<template>
  <div class="search">
    <input
      v-model="model"
      type="text"
      placeholder="Search..."
      class="search__field"
      v-bind="$attrs"
    >
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: String, required: true })

defineOptions({ inheritAttrs: false })
</script>

<style scoped>
.search {
  border: var(--border);
  border-radius: var(--border-radius-sm);
  overflow: hidden;

  &:focus-within {
    outline: var(--outline);
  }

  .search__field {
    padding: var(--s-sm);
    width: 100%;

    &::placeholder {
      color: var(--color-generic-gray-light);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }

    &[disabled] {
      background-color: var(--color-generic-background);
      color: var(--color-generic-gray);
    }

    &:focus-visible {
      outline: 0;
    }
  }

  @container (min-width: 60rem) {
    position: relative;

    .search__field {
      inset: 0;
      position: absolute;
    }
  }
}
</style>
