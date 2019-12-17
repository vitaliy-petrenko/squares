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

interface IGridGeneratorStep {
  column: number
  row: number
}

export const makeSpiralScenario = ({ columns, rows }: IGridParams) => ({
  [Symbol.asyncIterator]: async function* () {
    let result: number[][] = []

    for (let j = 0; j < rows; j++) {
      result.push(Array(columns))
    }

    let
      column = -1,
      row = 0,
      minCol = 0,
      minRow = 0,
      maxCol = columns,
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
          if (minCol === maxCol) return null

          if (nextX >= maxCol) {
            vector = {
              x: 0,
              y: 1,
            }
            minRow++
            return getNext()
          }

          if (nextX < minCol) {
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
            maxCol--
            return getNext()
          }

          if (nextY < minRow) {
            vector = {
              x: 1,
              y: 0,
            }
            minCol++
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

      yield { column, row }
    }
  }
})

export const runGridScenario = async (
  scenario: AsyncIterable<IGridGeneratorStep>,
  stepDelay: number,
  process: (data: IGridGeneratorStep[]) => boolean
) => {
  for await (const data of scenario) {
    const breakScenario = process([data])
    if (breakScenario) break

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
