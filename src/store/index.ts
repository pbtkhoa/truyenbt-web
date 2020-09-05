import { getAccessorType } from 'typed-vuex'
import * as manga from '~/store/manga'

export const accessorType = getAccessorType({
  modules: {
    manga,
  },
})
