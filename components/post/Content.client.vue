<template>
  <div class="post-content">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="content" />
    <Button @click="toggle()">
      Show {{ formatted ? 'plain' : 'formatted' }} content
    </Button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const formatted = ref(false)

const getPlainContent = (content: string) => {
  const element = document.createElement('span')

  element.innerHTML = content

  return element.textContent
}

const content = computed(() => formatted.value ? props.content : getPlainContent(props.content))

const toggle = () => {
  formatted.value = !formatted.value
}
</script>

<style scoped>
.post-content {
  display: flex;
  flex-direction: column;
  gap: var(--s-sm);
  align-items: flex-start;
}
</style>

<style>
.post-content {
  p + P {
    margin-top: var(--s-sm);
  }

  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  s {
    text-decoration: line-through;
  }
}
</style>
