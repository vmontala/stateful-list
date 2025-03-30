<template>
  <div class="post">
    <NuxtLink to="/">
      &lt; Go back to list
    </NuxtLink>
    <Card component="section" class="post__details">
      <div class="post__section">
        <div class="post__label">
          <template v-if="post.title || (!post.title && !post.headline)">
            Title
            <template v-if="post.headline">
              (and headline)
            </template>
          </template>
          <template v-else-if="post.headline">
            Headline
          </template>
        </div>
        <h2 class="post__title">
          {{ post.title || post.headline || '<Work in Progress>' }}
          <template v-if="post.title && post.headline">
            ({{ post.headline }})
          </template>
        </h2>
      </div>
      <div class="post__section">
        <div class="post__label">
          Content
        </div>
        <ClientOnly>
          <PostContent :content="post.content" />
          <template #fallback>
            Loading content...
          </template>
        </ClientOnly>
      </div>
      <div class="post__section">
        <div class="post__label">
          Metadata
        </div>
        <PostMetadata :metadata="metadata">
          <template #Date="{ value }">
            <span :title="value.label.initial" v-if="value">
              {{ value.label.relative }}
            </span>
          </template>
          <template #Link="{ value }">
            <a
              :href="value"
              target="_blank"
              v-if="value"
            >
              {{ value }}
            </a>
          </template>
        </PostMetadata>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import usePostsStore from '~/stores/posts'

const postsStore = usePostsStore()
const route = useRoute()

const post = ref(postsStore.getById(parseInt(route.params.id, 10)))

const metadata = computed(() => ({
  ID: post.value.id,
  Status: post.value.status,
  Platform: post.value.platform,
  Author: post.value.author,
  Date: post.value.date,
  Link: post.value.link,
  'Tag(s)': post.value.tags,
  'Image(s)': post.value.images.length ? `${post.value.images.length} attachments` : undefined,
}))

definePageMeta({
  title: 'Post details'
})
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);

  .post__details {
    flex-direction: column;
    gap: var(--s-lg);
  }

  .post__section {
    display: flex;
    flex-direction: column;
    gap: var(--s-sm);
  }

  .post__label {
    text-transform: uppercase;
    font-size: var(--f-sm);
    color: var(--color-generic-gray);
  }

  .post__title {
    font-size: var(--f-lg);
  }
}
</style>
