export const orderedArray = (count: number): number[] => Array.from(Array(count < 0 ? 0 : count).keys())

export const randomInteger = (max: number, min: number = 0) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}
