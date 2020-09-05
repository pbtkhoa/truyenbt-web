import Manga from '~/models/Manga'

const state = () => ({
  items: [] as Manga[],
})

export type State = ReturnType<typeof state>

export default state
