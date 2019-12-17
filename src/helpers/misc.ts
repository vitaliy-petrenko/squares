export const getOrderedArray = (count: number): number[] => Array.from(Array(count < 0 ? 0 : count).keys())

export const getRandomInteger = (max: number, min: number = 0) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  return Math.round(rand)
}

export const getRandomArrayItem = <T>(array: T[]): T => array[getRandomInteger(array.length - 1)]
