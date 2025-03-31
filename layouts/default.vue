<template>
  <div class="application">
    <header>
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
  display: flex;
  flex-direction: column;
  gap: var(--s-xxl);
  max-width: 100rem;
  padding: var(--s-xxl) var(--s-lg);
  width: 100%;

  .application__title {
    font-size: var(--f-xl);
  }

  .application__view {
    container-type: inline-size;
  }
}
</style>
