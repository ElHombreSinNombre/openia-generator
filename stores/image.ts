import { defineStore } from "pinia";
import { OpenAIApi } from "openai";

export const useImageStore = defineStore("image", {
  state: () => ({
    image: Array<[]>(),
    error: false,
  }),
  getters: {
    getImage(state: any) {
      return state.image;
    },
    getImageError(state: any) {
      return state.error;
    },
  },
  actions: {
    async fetchImage(
      openai: OpenAIApi,
      value: string,
      number: string,
      resolution: any
    ) {
      try {
        const res = await openai.createImage({
          prompt: value,
          n: parseInt(number),
          size: resolution,
        });
        if (res.status == 200) {
          res.data.data.forEach((image: any) => {
            this.image.push({ image: image.url, value: value });
          });
        }
      } catch (e) {
        this.error = true;
        return e;
      }
    },
  },
});
