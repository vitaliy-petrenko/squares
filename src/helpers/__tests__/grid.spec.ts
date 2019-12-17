import {
  calculateGridSize,
  getFilledMatrix,
  getFlipDirectionKey,
  getMinGridSize,
  IGridParams,
  makeSpiralScenario,
  runGridScenario
} from '../grid'

describe('make grid helper', () => {
  it('must return columns more than in minColumns argument, rows more than minRows', () => {
    const
      { minColumns, minRows } = getMinGridSize(),
      { columns, rows } = calculateGridSize({ viewportHeight: 768, viewportWidth: 1024 })

    expect({
      columns: columns >= minColumns,
      rows: rows >= minRows,
    }).toEqual({ columns: true, rows: true })
  })
})

describe('makeEmptyMatrix helper', () => {
  const emptyMatrix = getFilledMatrix({ columns: 3, rows: 4, value: 0 })

  it('must return array of undefined', () => {
    expect(emptyMatrix).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  })
})

describe('make ordered spiral helper', () => {
  const getSpiral = async ({ columns, rows }: IGridParams): Promise<number[][]> => {
    const
      config = { columns, rows },
      spiralScenario = makeSpiralScenario(config),
      spiral = getFilledMatrix({ ...config, value: 0 })

    let value = 0

    await runGridScenario(spiralScenario, 0, ([{ column, row }]) => {
      spiral[row][column] = value++
      return false
    })

    return spiral
  }

  it('must return spiral', async () => {
    const spiral = await getSpiral({ columns: 3, rows: 3 })

    expect(spiral).toEqual([
      [0, 1, 2],
      [7, 8, 3],
      [6, 5, 4],
    ])
  })

  it('must return spiral with no square (landscape) grid', async () => {
    const spiral = await getSpiral({ columns: 6, rows: 3 })

    expect(spiral).toEqual([
      [0, 1, 2, 3, 4, 5],
      [13, 14, 15, 16, 17, 6],
      [12, 11, 10, 9, 8, 7],
    ])
  })

  it('must return spiral with no square (portrait) grid', async () => {
    const spiral = await getSpiral({ columns: 3, rows: 6 })

    expect(spiral).toEqual([
      [0, 1, 2],
      [13, 14, 3],
      [12, 15, 4],
      [11, 16, 5],
      [10, 17, 6],
      [9, 8, 7],
    ])
  })
})

describe('getFlipDirectionKey helper', () => {
  /**
   1 2 3
   8 x 4
   7 6 5
   */

  it('must return right direction', () => {
    const directions = [
      [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
      [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
      [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    ].map(row => row.map(getFlipDirectionKey))

    expect(directions).toEqual([
      [1, 2, 3],
      [8, 4, 4],
      [7, 6, 5],
    ])
  })
})
