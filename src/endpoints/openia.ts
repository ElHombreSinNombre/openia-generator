import { openia } from '../utils/openia'

export class OpenIA {
  static async fetchCompletion(value: string) {
    try {
      const res = await openia.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: value }]
      })
      if (res?.choices) {
        return res.choices[0].message.content
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Failed to create completion: ${e.message}`)
      }
    }
  }
  static async createImage(value: string, number: string, resolution: string) {
    try {
      const res = await openia.images.generate({
        model: 'dall-e-3',
        prompt: value,
        n: parseInt(number),
        size: resolution as '256x256' | '512x512' | '1024x1024',
        quality: 'standard'
      })
      if (res?.data) {
        return res.data[0].url
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Failed to create image: ${e.message}`)
      }
    }
  }
}
