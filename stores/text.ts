import { defineStore } from "pinia";
import { OpenAIApi } from "openai";

export const useTextStore = defineStore("text", {
  state: () => ({
    text: Array<[]>(),
    error: false,
  }),
  getters: {
    getText(state: any) {
      return state.text;
    },
    getTextError(state: any) {
      return state.error;
    },
  },
  actions: {
    async fetchText(openai: OpenAIApi, value: string) {
      try {
        const res = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: value,
        });
        if (res.status == 200) {
          res.data.choices.forEach((text: any) => {
            this.text.push(text.text);
          });
        }
      } catch (e) {
        this.error = true;
        return e;
      }
    },
  },
});
