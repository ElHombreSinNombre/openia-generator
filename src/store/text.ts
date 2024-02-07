import { defineStore } from 'pinia'
import { OpenIA } from '../endpoints/openia'
import { Text } from './../types/Text'
import textParsers from '../parsers/text'

export const useTextStore = defineStore('text', {
  state: () => ({
    text: [] as Text[]
  }),
  getters: {
    getText(state: any) {
      return state.text
    }
  },
  actions: {
    async fetchText(value: string) {
      try {
        const text = await OpenIA.fetchCompletion(value)
        const parsed = textParsers(text)
        this.text = [...this.text, ...parsed]
      } catch (e) {
        throw new Error('Failed to fetch text')
      }
    }
  }
})
