import { isEqual, uniqWith } from 'lodash'
import { MAX_CELL_SIZE, MIN_CELL_SIZE } from '../constants'
import { delay } from './scenario'

export interface IGridParams {
  columns: number
  rows: number
}

export interface IViewportSize {
  viewportWidth: number
  viewportHeight: number
}

export const getViewportSize = (): IViewportSize => {
  const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window

  return {
    viewportWidth,
    viewportHeight,
  }
}

const isPortraitMode = (): boolean => {
  const { viewportWidth, viewportHeight } = getViewportSize()

  return viewportWidth > viewportHeight
}

export const getDesktopMinColumnsAndRows = () => ({
  minColumns: 12,
  minRows: 11,
})

export const getMobileMinColumnsAndRows = () => {
  const isPortrait = isPortraitMode()


  return {
    minColumns: isPortrait ? 8 : 7,
    minRows: isPortrait ? 7 : 8,
  }
}

const getMinAndMaxCellSize = () => ({
  MIN_CELL_SIZE,
  MAX_CELL_SIZE
})

export const isMobile = () => {
  const
    { MIN_CELL_SIZE } = getMinAndMaxCellSize(),
    { minColumns, minRows } = getDesktopMinColumnsAndRows(),
    { viewportHeight, viewportWidth } = getViewportSize()

  return viewportWidth <= MIN_CELL_SIZE * minColumns || viewportHeight <= MIN_CELL_SIZE * minRows
}

export const getMinGridSize = () => (
  isMobile() ? getMobileMinColumnsAndRows() : getDesktopMinColumnsAndRows()
)

export const calculateGridSize = ({ viewportWidth, viewportHeight }: IViewportSize): IGridParams => {
  const
    { MIN_CELL_SIZE, MAX_CELL_SIZE } = getMinAndMaxCellSize(),
    { minColumns, minRows } = getMinGridSize()

  let
    gridItemSize = Math.min(viewportHeight / minRows, viewportWidth / minColumns)

  if (gridItemSize < MIN_CELL_SIZE) gridItemSize = MIN_CELL_SIZE
  if (gridItemSize > MAX_CELL_SIZE) gridItemSize = MAX_CELL_SIZE

  const
    columns = Math.min(Math.max(Math.round(viewportWidth / gridItemSize), minColumns), 45),
    rows = Math.min(Math.max(Math.round(viewportHeight / gridItemSize), minRows), 30)

  return {
    columns,
    rows,
  }
}


/**
 1 2 3
 8 x 4
 7 6 5
 */

export const getFlipDirectionKey = ({ x, y }: I2DVector): number => {
  if (x === 1) {
    if (y === 0) {
      return 4
    } else if (y === 1) {
      return 5
    } else {
      return 3
    }
  } else if (x === 0) {
    if (y === 1) {
      return 6
    } else if (y === 0) {
      return 4
    } else {
      return 2
    }
  } else {
    if (y === 0) {
      return 8
    } else if (y === 1) {
      return 7
    } else {
      return 1
    }
  }
}

export interface I2DVector {
  x: number
  y: number
}

export interface IGridCell {
  column: number
  row: number
}

export const makeSpiralScenario = ({ columns, rows }: IGridParams) => ({
  [Symbol.asyncIterator]: async function* () {
    let
      column = -1,
      row = 0,
      minColumn = 0,
      minRow = 0,
      maxColumn = columns,
      maxRow = rows,
      vector: I2DVector = {
        x: 1,
        y: 0
      }

    const
      getVectorX = () => vector.x,
      getVectorY = () => vector.y,
      getNext = (): { nextX: number, nextY: number } | null => {
        const
          nextX = column + getVectorX(),
          nextY = row + getVectorY()

        if (getVectorY() === 0) {
          if (minColumn === maxColumn) return null

          if (nextX >= maxColumn) {
            vector = {
              x: 0,
              y: 1,
            }
            minRow++
            return getNext()
          }

          if (nextX < minColumn) {
            vector = {
              x: 0,
              y: -1,
            }
            maxRow--
            return getNext()
          }
        }

        if (getVectorX() === 0) {
          if (minRow === maxRow) return null

          if (nextY >= maxRow) {
            vector = {
              x: -1,
              y: 0,
            }
            maxColumn--
            return getNext()
          }

          if (nextY < minRow) {
            vector = {
              x: 1,
              y: 0,
            }
            minColumn++
            return getNext()
          }
        }

        return { nextX, nextY }
      }

    while (true) {
      const next = getNext()

      if (!next) break

      const { nextX, nextY } = next

      column = nextX
      row = nextY

      yield [{ column, row }]
    }
  }
})

export type TFromCellScenarioArguments = IGridParams & { cell: IGridCell } & { vectors: I2DVector[] }

export const makeFromCellScenario = (
  { columns, rows, cell, vectors }: TFromCellScenarioArguments
) => ({
  [Symbol.asyncIterator]: async function* () {
    let
      previousCells = [cell]

    const
      minColumn = 0,
      maxColumn = columns - 1,
      minRow = 0,
      maxRow = rows - 1,
      filteredVectors = uniqWith(
        vectors.filter(
          vector => !(vector.x === vector.y && vector.x === 0)
        ),
        isEqual
      ),
      yieldedCells = [{ ...cell }],
      getNext = () => {
        const nextCells: IGridCell[] = []

        filteredVectors.forEach(vector => {
          previousCells.forEach(({ column, row }) => {
            if (
              (vector.x === -1 && column <= cell.column) ||
              (vector.x === 1 && column >= cell.column) ||
              (vector.y === -1 && row <= cell.row) ||
              (vector.y === 1 && row >= cell.row)
            ) {
              const cell = {
                column: column + vector.x,
                row: row + vector.y,
              }

              if (yieldedCells.find(({ column, row }) => column === cell.column && row === cell.row)) return

              yieldedCells.push(cell)
              nextCells.push(cell)
            }
          })
        })

        const filtered = uniqWith(
          nextCells.filter(
            ({ column, row }) =>
              (column >= minColumn && row >= minRow && column <= maxColumn && row <= maxRow)
          ),
          isEqual
        )

        if (!filtered.length) return null

        return filtered
      }

    yield [{ ...cell }]

    while (true) {
      const nextCells = getNext()

      if (!nextCells) break

      yield nextCells

      previousCells = nextCells
    }
  }
})

export const runGridScenario = async (
  scenario: AsyncIterable<IGridCell[]>,
  stepDelay: number,
  process: (data: IGridCell[]) => void
) => {
  for await (const data of scenario) {
    process(data)

    if (stepDelay > 0) {
      await delay(stepDelay)
    }
  }
}

export const getFilledMatrix = <T>({ columns, rows, value }: IGridParams & { value: T }): T[][] => {
  const result: T[][] = []

  for (let row = 0; row < rows; row++) {
    result.push([])
    for (let column = 0; column < columns; column++) {
      result[row].push(value)
    }
  }

  return result
}
