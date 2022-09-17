// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxtjs/tailwindcss'],
    buildModules: ['@pinia/nuxt', 'floating-vue/nuxt'],
    css: ['@/assets/css/scrollbars.css', '@/assets/css/global.css']
})
