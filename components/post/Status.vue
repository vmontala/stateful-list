<template>
  <Pill :type="map[status]">
    {{ status }}
  </Pill>
</template>

<script lang="ts" setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
})

const map = {
  published: 'secondary',
  scheduled: 'primary',
  archived: 'tertiary',
}
</script>
