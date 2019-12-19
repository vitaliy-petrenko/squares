interface I2DDirectionVector {
  x: 1 | 0 | -1
  y: 1 | 0 | -1
}

interface IGridCell {
  column: number
  row: number
}

interface IFromCellScenarioArguments extends IGridParams {
  cell: IGridCell
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

interface IMenuPosition extends IGridCell {
  vector: I2DDirectionVector
}

type TGridScenario = AsyncIterable<IGridCell[]>
type TStopScenario = true | void
type TRunScenarioProcessFunction = (cells: IGridCell[]) => TStopScenario
