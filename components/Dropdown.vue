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
      {{ selected?.label }}
      <Icon-CaretDown class="dropdown__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Option from '~/types/Option'

interface Props {
  options: Option[]
}

const props = defineProps<Props>()

const model = defineModel({ type: String, required: true })

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
    z-index: 1;
  }

  .dropdown__value {
    background-color: var(--color-generic-white);
    padding: var(--s-sm) var(--s-xl) var(--s-sm) var(--s-sm);
    display: flex;
    align-items: center;
    position: relative;
  }

  .dropdown__icon {
    position: absolute;
    right: 0;
  }

  .dropdown__field[disabled] + .dropdown__value {
    background-color: var(--color-generic-background);
    color: var(--color-generic-gray);
  }
}
</style>
