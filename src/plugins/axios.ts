import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onRequest((config) => {
    console.log(`[${config.method}]: ${config.baseURL}/${config.url}`)
  })
  $axios.onResponse((response) => {
    return response.data
  })
}
