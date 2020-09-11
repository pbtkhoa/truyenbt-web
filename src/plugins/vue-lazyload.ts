import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
const loading = require('~/assets/loading.gif')
const error = require('~/assets/404.jpg')

Vue.use(VueLazyload, {
  loading,
  error,
  preLoad: 1,
  attempt: 1,
})
