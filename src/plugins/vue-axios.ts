import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { suid } from 'rand-token'

export default function ({ $axios, $cookies }: { $axios: NuxtAxiosInstance; $cookies: NuxtCookies }) {
  let accessCountToken: string = $cookies.get('access-count-token')
  if (!accessCountToken) {
    accessCountToken = suid(16)
    $cookies.set('access-count-token', accessCountToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  }

  $axios.onRequest((config) => {
    console.log(`[${config.method}]: ${config.baseURL}/${config.url}`, config.params)
  })
  $axios.onResponse((response) => {
    return response.data
  })
  $axios.setHeader('access-count-token', accessCountToken)
}
