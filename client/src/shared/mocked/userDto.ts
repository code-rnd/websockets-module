const names = [
  "Rob",
  "Ann",
  "Ron",
  "Harry Potter",
  "Voland",
  "Bob",
  "Alex",
  "Grinch",
  "Jhony Boy",
];
const colors = [
  "#DB4D4C",
  "#FF944D",
  "#FEB84D",
  "#FFDB70",
  "#B7DB4B",
  "#71B84C",
  "#4EB8B8",
  "#4CB7DB",
  "#4C94DA",
  "#4D71DB",
  "#9370DA",
  "#B871B8",
  "#DA94DA",
  "#FF7294",
  "#FFADC4",
  "#6AD19E",
];

const rndGenNumber = (max: number = 2, min: number = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
export const getUserDto = (): { id: string; name: string; color: string } => {
  return {
    id: (+new Date()).toString(16),
    name: names[rndGenNumber(names.length - 1, 0)],
    color: colors[rndGenNumber(colors.length - 1, 0)],
  };
};
