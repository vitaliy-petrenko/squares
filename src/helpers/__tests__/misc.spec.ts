import { getOrderedArray } from '../misc'

describe('ordered array', () => {
  it('zero', () => {
    expect(getOrderedArray(0)).toEqual([])
  })

  it('positive', () => {
    expect(getOrderedArray(3)).toEqual([0, 1, 2])
  })

  it('negative', () => {
    expect(getOrderedArray(-3)).toEqual([])
  })
})
