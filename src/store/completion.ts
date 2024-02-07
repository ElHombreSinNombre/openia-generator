import { defineStore } from 'pinia'
import { OpenIA } from './../endpoints/openia'
import { Text } from './../types/Text'
import textParsers from '../parsers/text'

export const useCompletionStore = defineStore('completion', {
  state: () => ({
    completion: [] as Text[]
  }),
  getters: {
    getCompletion(state: any) {
      return state.completion
    }
  },
  actions: {
    async fetchCompletion(value: string) {
      try {
        const completion = await OpenIA.fetchCompletion(value)
        const parsed = textParsers(completion)
        this.completion = [...this.completion, ...parsed]
      } catch (e) {
        throw new Error('Failed to fetch text')
      }
    }
  }
})
