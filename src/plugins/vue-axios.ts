import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { v4 } from 'uuid'
import { ACCESS_COUNT_TOKEN } from '~/utils/constants'

export default function ({ $axios, $cookies }: { $axios: NuxtAxiosInstance; $cookies: NuxtCookies }) {
  let accessCountToken: string = $cookies.get(ACCESS_COUNT_TOKEN)
  if (!accessCountToken) {
    accessCountToken = v4()
    $cookies.set(ACCESS_COUNT_TOKEN, accessCountToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  }

  $axios.onRequest((config) => {
    console.log(`[${config.method}]: ${config.baseURL}/${config.url}`, config.params)
  })
  $axios.onResponse(({ data }) => data)
  $axios.setHeader('access-count-token', accessCountToken)
}
