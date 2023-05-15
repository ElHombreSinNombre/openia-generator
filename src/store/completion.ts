import { defineStore } from "pinia";
import { OpenIA } from "./../endpoints/openia";
import { Text } from "./../models/Text";
import textParsers from "../parsers/text";

export const useCompletionStore = defineStore("completion", {
  state: () => ({
    completion: [] as Text[],
  }),
  getters: {
    getCompletion(state: any) {
      return state.completion;
    },
  },
  actions: {
    async fetchCompletion(value: string) {
      try {
        const text = await OpenIA.fetchCompletion(value);
        const parsed = textParsers(text);
        this.completion.push(...parsed);
      } catch (e) {
        throw new Error("Failed to fetch text");
      }
    },
  },
});
