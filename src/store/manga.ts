import { mutationTree, actionTree } from 'nuxt-typed-vuex'
import Manga from '~/models/Manga'
import { removeNamespace } from '~/utils/helpers'
import MangaChapter from '~/models/MangaChapter'
import { MangaSortDate } from '~/utils/constants'

export const MangaActions = {
  GET_HOT_MANGAS: 'manga/GET_HOT_MANGAS',
  GET_TOP_MANGAS: 'manga/GET_TOP_MANGAS',
  GET_LATEST_MANGAS: 'manga/GET_LATEST_MANGAS',
  GET_DETAIL_MANGAS: 'manga/GET_DETAIL_MANGAS',
  GET_DETAIL_MANGA_CHAPTER: 'manga/GET_DETAIL_MANGA_CHAPTER',
  SEARCH_MANGAS: 'manga/SEARCH_MANGAS',
}

const _MangaActions = removeNamespace<typeof MangaActions>('manga/', MangaActions)

export const state = () => ({
  hotMangas: [] as Manga[],
  topMangas: {} as { [key: string]: Manga[] },
  paginateList: {
    items: [] as Manga[],
    total: 0 as number,
    page: 1 as number,
    totalPages: 1 as number,
  },
  item: null as Manga | null,
  mangaChapter: null as MangaChapter | null,
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setHotMangas: (state, hotMangas: Manga[]) => (state.hotMangas = hotMangas),
  setTopMangas: (state, { topMangas, dateSort }: { topMangas: Manga[]; dateSort: MangaSortDate }) =>
    (state.topMangas[dateSort] = topMangas),
  setPaginateList: (state, paginateList: Paginate<Manga>) => (state.paginateList = paginateList),
  setItem: (state, manga: Manga | null) => (state.item = manga),
  setMangaChapter: (state, mangaChapter: MangaChapter | null) => (state.mangaChapter = mangaChapter),
})

export const actions = actionTree(
  { state, mutations },
  {
    async [_MangaActions.GET_HOT_MANGAS]({ commit }): Promise<void> {
      const hotMangas: Manga[] = await this.$axios.$get(`manga/hot-mangas`)
      commit('setHotMangas', hotMangas)
    },
    async [_MangaActions.GET_TOP_MANGAS]({ commit }, dateSort: MangaSortDate): Promise<void> {
      const topMangas: Manga[] = await this.$axios.$get(`manga/top-mangas?sort-date=${dateSort}`)
      commit('setTopMangas', { topMangas, dateSort })
    },
    async [_MangaActions.GET_LATEST_MANGAS]({ commit }, page: number = 1): Promise<void> {
      const mangaLatest: Paginate<Manga> = await this.$axios.$get(`manga?limit=12&page=${page}`)
      commit('setPaginateList', mangaLatest)
    },
    async [_MangaActions.GET_DETAIL_MANGAS]({ commit }, slug: string): Promise<void> {
      const manga: Manga = await this.$axios.$get(`manga/${slug}`)
      commit('setItem', manga)
    },
    async [_MangaActions.GET_DETAIL_MANGA_CHAPTER](
      { commit },
      { slug, chapter }: { slug: string; chapter: string }
    ): Promise<MangaChapter> {
      const mangaChapter: MangaChapter = await this.$axios.$get(`manga/${slug}/${chapter}`)
      commit('setMangaChapter', mangaChapter)

      return mangaChapter
    },
    async [_MangaActions.SEARCH_MANGAS]({ commit }, { page, tag, status }): Promise<void> {
      const mangas: Paginate<Manga> = await this.$axios.$get(`manga/search-mangas`, {
        params: {
          page,
          status,
          tags: tag,
          limit: 12,
        },
      })
      commit('setPaginateList', mangas)
    },
  }
)
