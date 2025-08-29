// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devServer: {
    port: 5173, 
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
