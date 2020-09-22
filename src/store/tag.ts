import { mutationTree, actionTree } from 'nuxt-typed-vuex'
import { removeNamespace } from '~/utils/helpers'
import Tag from '~/models/Tag'

export const TagActions = {
  GET_TAGS: 'tag/GET_TAGS',
}

const _TagActions = removeNamespace<typeof TagActions>('tag/', TagActions)

export const state = () => ({
  items: [] as Tag[],
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setTags: (state, tags: Tag[]) => (state.items = tags),
})

export const actions = actionTree(
  { state, mutations },
  {
    async [_TagActions.GET_TAGS]({ commit }): Promise<void> {
      const tags: Tag[] = await this.$axios.$get(`tag`)
      commit('setTags', tags)
    },
  }
)
