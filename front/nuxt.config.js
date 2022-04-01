export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'epic-road-trip',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  styleResources: {
    scss: [
      '~/styles/app.scss'
    ]
  },


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build

  // build: {
  // },

  build: {
    extend (config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  },

  publicRuntimeConfig: {
    strapi: {
      url: process.env.EPIC_ROAD_TRIP_EXTERNAL_API_URL
    },
    EPIC_ROAD_TRIP_EXTERNAL_API_URL: process.env.EPIC_ROAD_TRIP_EXTERNAL_API_URL
  },

  privateRuntimeConfig: {
    strapi: {
      url: process.env.EPIC_ROAD_TRIP_INTERNAL_API_URL
    },
  },

  axios: {
    baseURL: process.env.EPIC_ROAD_TRIP_EXTERNAL_API_URL
  },

  env: {
    VUE_APP_API_URL: process.env.EPIC_ROAD_TRIP_EXTERNAL_API_URL,
  },
}
