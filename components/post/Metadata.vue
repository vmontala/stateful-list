<template>
  <dl class="post-metadata">
    <div
      v-for="(value, title) in metadata"
      :key="title"
      class="post-metadata__entry"
    >
      <dt class="post-metadata__title">{{ title }}:</dt>
      <dd class="post-metadata__value" v-if="$slots[title]">
        <slot :name="title" :value="value">
          -
        </slot>
      </dd>
      <dd class="post-metadata__value" v-else-if="value">
        {{ value }}
      </dd>
      <dd v-else>-</dd>
    </div>
  </dl>
</template>

<script lang="ts" setup>
defineProps({
  metadata: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.post-metadata {
  display: flex;
  flex-direction: column;
  gap: var(--s-xs);

  .post-metadata__entry {
    display: flex;
    gap: var(--s-xs);
  }

  .post-metadata__title {
    color: var(--color-generic-gray);
  }

  .post-metadata__value {
    display: flex;
    flex-direction: column;
  }
}
</style>
