<template>
  <component
    :is="icon"
    fill="currentColor"
    :style="{
      height: `${size / 10}rem`,
      width: `${size / 10}rem`,
    }"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: '32',
  },
})

const size = computed(() => parseInt(props.size, 10))
</script>
