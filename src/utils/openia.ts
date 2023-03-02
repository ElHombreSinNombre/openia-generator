import OpenAI from 'openai'

const configuration = new OpenAI({
  apiKey: import.meta.env.VITE_Open_AI_Key,
  dangerouslyAllowBrowser: true
})

export const openia = configuration
