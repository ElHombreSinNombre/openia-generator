import { defineStore } from "pinia";
import { OpenAIApi } from "openai";

export const useCompletionStore = defineStore("completion", {
  state: () => ({
    completion: Array<[]>(),
    error: false,
  }),
  getters: {
    getCompletion(state: any) {
      return state.completion;
    },
    getCompletionError(state: any) {
      return state.completion;
    },
  },
  actions: {
    async fetchCompletion(openai: OpenAIApi, value: string) {
      try {
        const res = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: value,
        });
        if (res.status == 200) {
          res.data.choices.forEach((completion: any) => {
            this.completion.push(completion.text);
          });
        }
      } catch (e) {
        this.error = true;
        return e;
      }
    },
  },
});
