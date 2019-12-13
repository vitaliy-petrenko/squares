import { orderedArray } from '../misc'

describe('ordered array', () => {
  it('zero', () => {
    expect(orderedArray(0)).toEqual([])
  })

  it('positive', () => {
    expect(orderedArray(3)).toEqual([0, 1, 2])
  })

  it('negative', () => {
    expect(orderedArray(-3)).toEqual([])
  })
})
