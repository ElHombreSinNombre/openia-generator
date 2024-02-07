import { Text } from './../types/Text'

const textParsers = (data: any): Text[] => {
  const text = data.map((text: Text) => {
    return {
      text: text
    }
  })
  return text
}

export default textParsers
