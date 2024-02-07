import { defineStore } from 'pinia'
import { OpenIA } from '../endpoints/openia'
import { Image } from './../types/Image'
import imageParsers from '../parsers/image'

export const useImageStore = defineStore('image', {
  state: () => ({
    image: [] as Image[]
  }),
  getters: {
    getImage(state: any) {
      return state.image
    }
  },
  actions: {
    async fetchImage(value: string, number: string, resolution: any) {
      try {
        const image = await OpenIA.createImage(value, number, resolution)
        const parsed = imageParsers(image)
        this.image = [...this.image, ...parsed]
      } catch (e) {
        throw new Error('Failed to fetch images')
      }
    }
  }
})
