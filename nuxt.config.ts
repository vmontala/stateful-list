// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@pinia/nuxt',
  ],
  css: ['reset-css', '~/main.css'],
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal', 'italic'],
    },
  }
})
