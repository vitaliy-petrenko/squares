interface I2DDirectionVector {
  x: 1 | 0 | -1
  y: 1 | 0 | -1
}

interface IMatrixCell {
  column: number
  row: number
}

interface IFromCellScenarioArguments extends IGridParams {
  cell: IMatrixCell
  vectors: I2DDirectionVector[]
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

interface IGetMenuPositionArguments extends IGridParams {
  isMobile: boolean
  isPortrait: boolean
}

interface IMenuPosition extends IMatrixCell {
  vector: I2DDirectionVector
}

type TGridScenario = Iterable<IMatrixCell[]>
type TStopScenario = true | void
type TRunScenarioProcessFunction = (cells: IMatrixCell[]) => TStopScenario
