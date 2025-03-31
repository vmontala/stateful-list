<template>
  <Pill :type="map[status.value]">
    {{ status.label }}
  </Pill>
</template>

<script lang="ts" setup>
import type PostStatus from '~/types/PostStatus'

interface Props {
  status: PostStatus
}

defineProps<Props>()

const map: { [key: string]: string } = {
  published: 'secondary',
  scheduled: 'primary',
  archived: 'tertiary',
}
</script>
