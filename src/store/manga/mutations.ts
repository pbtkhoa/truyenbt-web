import { State } from '~/store/manga/state'
import Manga from '~/models/Manga'

export default {
  setList(state: State, mangas: Manga[]) {
    state.items = [...state.items, ...mangas]
  },
}
