import { Image } from './../types/Image'

const imageParsers = (data: any): Image[] => {
  const image = data.map((image: Image) => {
    return {
      url: image
    }
  })
  return image
}

export default imageParsers
