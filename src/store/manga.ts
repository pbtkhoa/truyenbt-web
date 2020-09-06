import { mutationTree, actionTree } from 'nuxt-typed-vuex'
import Manga from '~/models/Manga'
import { removeNamespace } from '~/utils/helpers'
import MangaChapter from '~/models/MangaChapter'

export const MangaActions = {
  GET_LATEST_MANGA: 'manga/GET_LATEST_MANGA',
  GET_DETAIL_MANGA: 'manga/GET_DETAIL_MANGA',
  GET_DETAIL_MANGA_CHAPTER: 'manga/GET_DETAIL_MANGA_CHAPTER',
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
    totalPages: 1 as number,
  },
  item: null as Manga | null,
  mangaChapter: null as MangaChapter | null,
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setLatest: (state, mangaLatest: Paginate<Manga>) =>
    (state.latest = mangaLatest),
  setItem: (state, manga: Manga | null) => (state.item = manga),
  setMangaChapter: (state, mangaChapter: MangaChapter | null) =>
    (state.mangaChapter = mangaChapter),
})

export const actions = actionTree(
  { state, mutations },
  {
    async [_MangaActions.GET_LATEST_MANGA](
      { commit },
      page: number = 1
    ): Promise<void> {
      const mangaLatest: Paginate<Manga> = await this.$axios.$get(
        `manga?limit=12&page=${page}`
      )
      commit('setLatest', mangaLatest)
    },
    async [_MangaActions.GET_DETAIL_MANGA](
      { commit },
      slug: string
    ): Promise<void> {
      const manga: Manga = await this.$axios.$get(`manga/${slug}`)
      commit('setItem', manga)
    },
    async [_MangaActions.GET_DETAIL_MANGA_CHAPTER](
      { commit },
      { slug, chapter }: { slug: string; chapter: string }
    ): Promise<MangaChapter> {
      const mangaChapter: MangaChapter = await this.$axios.$get(
        `manga/${slug}/${chapter}`
      )
      commit('setMangaChapter', mangaChapter)

      return mangaChapter
    },
  }
)
