const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)'; // bright yellow

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min; //lodash random snippet


export const generateSparkle = (color = DEFAULT_COLOR) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2,
    },
  }
}