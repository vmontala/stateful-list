<template>
  <div class="dropdown">
    <select
      v-model="model"
      class="dropdown__field"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :key="option.label"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="dropdown__value">
      {{ selected.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: String, required: true })

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const selected = computed(() => props.options.find((option) => option.value === model.value))

defineOptions({ inheritAttrs: false })
</script>

<style scoped>
.dropdown {
  border: var(--border);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  position: relative;

  &:focus-within {
    outline: var(--outline);
  }

  .dropdown__field {
    inset: 0;
    opacity: 0;
    position: absolute;
  }

  .dropdown__value {
    background-color: var(--color-generic-white);
    padding: var(--s-sm) 0 var(--s-sm) var(--s-sm);
    display: flex;
    align-items: center;
  }

  .dropdown__field[disabled] + .dropdown__value {
    background-color: var(--color-generic-background);
    color: var(--color-generic-gray);
  }
}
</style>
