import { mutationTree, actionTree } from 'nuxt-typed-vuex'
import Manga from '~/models/Manga'
import { removeNamespace } from '~/utils/helpers'
import { MangaSortDate } from '~/utils/constants'

export const MangaActions = {
  GET_TOP_MANGAS: 'manga/GET_TOP_MANGAS',
}

const _MangaActions = removeNamespace<typeof MangaActions>('manga/', MangaActions)

export const state = () => ({
  topMangas: {} as { [key: string]: Manga[] },
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setTopMangas: (state, { topMangas, dateSort }: { topMangas: Manga[]; dateSort: MangaSortDate }) =>
    (state.topMangas[dateSort] = topMangas),
})

export const actions = actionTree(
  { state, mutations },
  {
    async [_MangaActions.GET_TOP_MANGAS]({ commit, state }, dateSort: MangaSortDate): Promise<void> {
      if (!state.topMangas[dateSort] || state.topMangas[dateSort].length === 0) {
        const topMangas: Manga[] = await this.$axios.$get(`manga/top-mangas?sort-date=${dateSort}`)
        commit('setTopMangas', { topMangas, dateSort })
      }
    },
  }
)
