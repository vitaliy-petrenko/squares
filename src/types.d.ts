interface I2DDirectionVector {
  x: 1 | 0 | -1
  y: 1 | 0 | -1
}

interface IGridCell {
  column: number
  row: number
}

interface IFromCellScenarioArguments extends IGridParams {
  cell: IGridCell,
  vectors: I2DDirectionVector[],
  minColumn?: number
  minRow?: number
  maxColumn?: number
  maxRow?: number
}

interface IGridParams {
  columns: number
  rows: number
}

interface IViewportSize {
  viewportWidth: number
  viewportHeight: number
}

type TFlipperContent = string | null

