<template>
  <NuxtLink :to="`/posts/${post.id}`" class="post">
    <Card component="article" class="post__details">
      <PostStatus :status="post.status" class="post__status" />
      <div class="post__id">
        #{{ post.id }}
      </div>
      <h2
        class="post__title"
        :class="{ 'post__title--placeholder': !post.title && !post.headline }"
      >
        {{ post.formattedTitle }}
      </h2>
      <div class="post__context">
        <template v-if="action">
          {{ action }}
        </template>
        <div class="post__platform" :class="[`post__platform--${post.platform.value}`]">
          {{ post.platform.label }}
        </div>
        <template v-if="post.author">
          by
          <div class="post__author">
            {{ post.author }}
          </div>
        </template>
        <div
          class="post__date"
          :title="post.date.label.initial"
          v-if="post.date"
        >
          {{ post.date.label.relative }}
        </div>
      </div>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type Post from '~/types/Post'

interface Props {
  post: Post
}

const props = defineProps<Props>()

// While ideally this should be done with some `i18n` library, I really like going for user
// interfaces that can be read in natural text
const actionMap: { [key: string]: string } = {
  draft: 'Drafted for',
  scheduled: 'Scheduled for',
  published: 'Published on',
  archived: 'Published on',
}

const action = computed(() => actionMap[props.post.status.value])
</script>

<style scoped>
.post {
  color: inherit;
  text-decoration: none;

  &:hover .post__details ,
  &:focus-visible .post__details {
    outline: var(--outline);
  }

  .post__details {
    align-items: center;
    flex-wrap: wrap;
  }

  .post__id,
  .post__context {
    font-size: var(--f-sm);
  }

  .post__id,
  .post__context {
    color: gray;
  }

  .post__id {
    align-self: flex-start;
    margin-left: auto;
  }

  .post__title {
    flex-basis: 100%;
    font-size: var(--f-lg);

    &.post__title--placeholder {
      color: var(--color-generic-gray);
    }
  }

  .post__context {
    display: flex;
    gap: 0.5ch;
  }

  .post__platform {
    &.post__platform--linkedin {
      color: var(--color-platform-linkedin);
    }

    &.post__platform--facebook {
      color: var(--color-platform-facebook);
    }
  }

  .post__author {
    color: var(--color-generic-foreground);
  }

  @container (min-width: 40rem) {
    .post__title,
    .post__context {
      min-width: 75%;
    }

    .post__title {
      order: 0;
      flex-basis: initial;
    }

    .post__id {
      order: 1;
    }

    .post__context {
      order: 2;
    }

    .post__status {
      margin-left: auto;
      order: 3;
    }
  }
}
</style>
