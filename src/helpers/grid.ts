import { MAX_CELL_SIZE, MIN_CELL_SIZE } from '../constants'

export interface IGridParams {
  columns: number
  rows: number
}

export const getDesktopMinColumnsAndRows = () => ({
  minColumns: 11,
  minRows: 11,
})

export const getMobileMinColumnsAndRows = () => ({
  minColumns: 7,
  minRows: 7,
})

const getMinAndMaxCellSize = () => ({
  MIN_CELL_SIZE,
  MAX_CELL_SIZE
})

export const isMobile = () => {
  const
    { MIN_CELL_SIZE } = getMinAndMaxCellSize(),
    { minColumns, minRows } = getDesktopMinColumnsAndRows()

  return window.innerWidth <= MIN_CELL_SIZE * minColumns || window.innerHeight <= MIN_CELL_SIZE * minRows
}

export const getMinGridSize = () => (
  isMobile() ? getMobileMinColumnsAndRows() : getDesktopMinColumnsAndRows()
)

const getWindowSize = () => {
  const { innerHeight: windowHeight, innerWidth: windowWidth } = window

  return {
    windowWidth,
    windowHeight,
  }
}

export const calculateGridSize = (): IGridParams => {
  const
    { windowWidth, windowHeight } = getWindowSize(),
    { MIN_CELL_SIZE, MAX_CELL_SIZE } = getMinAndMaxCellSize(),
    { minColumns, minRows } = getMinGridSize()

  let
    gridItemSize = Math.min(windowHeight / minRows, windowWidth / minColumns)

  if (gridItemSize < MIN_CELL_SIZE) gridItemSize = MIN_CELL_SIZE
  if (gridItemSize > MAX_CELL_SIZE) gridItemSize = MAX_CELL_SIZE

  const
    columns = Math.min(Math.max(Math.round(windowWidth / gridItemSize), minColumns), 45),
    rows = Math.min(Math.max(Math.round(windowHeight / gridItemSize), minRows), 30)

  return {
    columns,
    rows,
  }
}
