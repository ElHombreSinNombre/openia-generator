import { openia } from "../utils/openia";

export class OpenIA {
  static async fetchCompletion(value: string) {
    try {
      const res = await openia.createCompletion({
        model: "text-davinci-003",
        prompt: value,
      });
      if (res.status === 200) {
        return res.data.choices;
      }
    } catch (e) {
      throw new Error("Failed in create completion");
    }
  }
  static async createImage(value: string, number: string, resolution: any) {
    try {
      const res = await openia.createImage({
        prompt: value,
        n: parseInt(number),
        size: resolution,
      });
      if (res.status == 200) {
        return res.data.data;
      }
    } catch (e) {
      throw new Error("Failed in create image");
    }
  }
}
