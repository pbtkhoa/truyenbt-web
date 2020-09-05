import { ActionTree } from 'vuex'
import Manga from '~/models/Manga'
import { State } from '~/store/manga/state'
import removeNamespace from '~/utils/helpers'

export const MangaActions = {
  GET_LIST_MANGA: 'manga/GET_LIST_MANGA',
}

const _MangaActions = removeNamespace<typeof MangaActions>(
  'manga/',
  MangaActions
)

const actions: ActionTree<State, {}> = {
  async [_MangaActions.GET_LIST_MANGA]({ commit }) {
    const mangas: Manga[] = await this.$axios.$get('manga')
    commit('setList', mangas)
  },
}

export default actions
