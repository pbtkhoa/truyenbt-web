import LocalScheme from '@nuxtjs/auth/lib/schemes/local'
import { setUserForAuth } from '@/utils/helpers'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user
    const user = await this.$auth.requestWith(this.name, endpoint, this.options.endpoints.user)

    setUserForAuth(this.$auth.ctx.app.$cookies, this.$auth, user)
  }
}
