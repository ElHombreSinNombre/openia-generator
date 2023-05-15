import { Text } from "./../models/Text";

const textParsers = (data: any): Text[] => {
  const text = data.map((text: any) => {
    return {
      text: text.text,
    };
  });
  return text;
};

export default textParsers;
