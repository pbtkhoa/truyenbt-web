import { mutationTree, actionTree } from 'nuxt-typed-vuex'
import Manga from '~/models/Manga'
import removeNamespace from '~/utils/helpers'

export const MangaActions = {
  GET_LATEST_MANGA: 'manga/GET_LATEST_MANGA',
}

const _MangaActions = removeNamespace<typeof MangaActions>(
  'manga/',
  MangaActions
)

export const state = () => ({
  latest: {
    items: [] as Manga[],
    total: 0 as number,
    page: 1 as number,
  },
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setLatest: (state, mangaLatest: Paginate<Manga>) =>
    (state.latest = mangaLatest),
})

export const actions = actionTree(
  { state, mutations },
  {
    async [_MangaActions.GET_LATEST_MANGA]({ commit }) {
      const mangaLatest: Paginate<Manga> = await this.$axios.$get('manga')
      commit('setLatest', mangaLatest)
    },
  }
)
