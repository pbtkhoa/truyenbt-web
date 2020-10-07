export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/styles.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-filter.ts',
    '~/plugins/vue-tooltip.ts',
    '~/plugins/vue-modal.ts',
    '~/plugins/vue-validate.ts',
    '~/plugins/vue-axios.ts',
    '~/plugins/vue-lazyload.ts',
    {
      src: '~/plugins/vue-image-lightbox.ts',
      ssr: false,
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/style-resources', 'nuxt-typed-vuex', '@nuxtjs/fontawesome'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:8888/api',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['@nuxtjs/auth'],
  },

  srcDir: 'src/',

  styleResources: {
    scss: ['./assets/vars/*.scss', './assets/helpers/*.scss'],
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  fontawesome: {
    icons: {
      solid: ['faThumbsUp', 'faHeart', 'faEye', 'faHeartBroken'],
    },
  },

  auth: {
    localStorage: false,
    strategies: {
      authToken: {
        _scheme: '~/utils/authScheme',
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'accessToken' },
          user: { url: 'auth/profile', method: 'get', propertyName: false },
        },
        autoFetchUser: false,
      },
    },
  },
}
