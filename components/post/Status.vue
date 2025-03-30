<template>
  <Pill :type="map[status.value]">
    {{ status.label }}
  </Pill>
</template>

<script lang="ts" setup>
defineProps({
  status: {
    type: Object,
    required: true,
  },
})

const map = {
  published: 'secondary',
  scheduled: 'primary',
  archived: 'tertiary',
}
</script>
