import { calculateGridSize, getMinGridSize } from '../grid'

describe('grid helper', () => {
  it('must return columns more than in minColumns argument, rows more than minRows', () => {
    const
      { minColumns, minRows } = getMinGridSize(),
      { columns, rows } = calculateGridSize()

    expect({
      columns: columns >= minColumns,
      rows: rows >= minRows,
    }).toEqual({ columns: true, rows: true })
  })
})
