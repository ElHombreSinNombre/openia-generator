import { Image } from "./../models/Image";

const imageParsers = (data: any): Image[] => {
  const image = data.map((image: any) => {
    return {
      url: image.url,
    };
  });
  return image;
};

export default imageParsers;
