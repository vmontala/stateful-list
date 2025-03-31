<template>
  <div class="application">
    <header class="application__header">
      <h1 class="application__title">
        {{ $route.meta.title }}
      </h1>
    </header>
    <main class="application__view">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.application {
  width: 100%;
  max-width: 100rem;
  padding: var(--s-xxl) var(--s-lg);
  display: flex;
  flex-direction: column;
  gap: var(--s-xxl);

  .application__title {
    font-size: var(--f-xl);
  }

  .application__header {

  }

  .application__view {
    container-type: inline-size;
  }
}
</style>
