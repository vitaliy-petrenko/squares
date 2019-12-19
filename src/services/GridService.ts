import { action, computed, observable, reaction } from 'mobx'
import { debounce } from 'lodash'
import {
  calculateGridSize,
  delay,
  getMatrixMidPoint,
  getMenuPosition,
  getViewportSize,
  isMobileMode,
  isPortraitMode,
  makeFromCellScenario,
  makeSpiralScenario,
  runGridScenario,
} from '../helpers/grid'
import { searchRandomEmoji } from '../helpers/emoji'
import bind from '../decorators/bind'
import cellStyles from '../components/Cell/Cell.module.scss'
import { ColorModel, EmojiModel, EmptyModel, HelloEmojiModel, TCellModel } from '../models/cell'

export enum EViews { initial, application, snake }

export interface ICell {
  model: TCellModel
}

export class GridService {
  @observable
  columns: number = 0

  @observable
  rows: number = 0

  @observable.struct viewportSize = getViewportSize()
  @observable isMobile: boolean = isMobileMode()
  @observable isPortrait: boolean = isPortraitMode()
  @observable
  grid: string[][] = []
  @observable
  private view: EViews = EViews.initial
  @observable
  private cells = new Map<string, ICell>()
  private initialAnimationWasShown = false
  private isAnimationRun = false
  private initWasRequested = false

  constructor() {
    this.showInitialAnimation = this.withAnimationDecorator(this.showInitialAnimation)
    this.place404 = this.withAnimationDecorator(this.place404)

    window.addEventListener('resize', debounce(() => {
      this.viewportSize = getViewportSize()
    }, 400))

    reaction(() => {
      return this.viewportSize
    }, () => {
      this.init()
    })

    this.init()
  }

  private async init() {
    if (this.isAnimationRun) {
      this.initWasRequested = true
      return
    }

    const { columns, rows } = calculateGridSize(this.viewportSize)

    this.columns = columns
    this.rows = rows
    this.isMobile = isMobileMode()
    this.isPortrait = isPortraitMode()

    this.initGrid()

    while (!this.isAnimationCanceled()) {
      if (!this.initialAnimationWasShown) {
        await this.delayAnimation(1000)
        await this.showInitialAnimation()
      }

      await this.place404()
    }
  }

  @computed
  get middleCell(): IGridCell {
    return getMatrixMidPoint(this.grid)
  }

  @computed
  get square() {
    return this.columns * this.rows
  }

  @computed
  private get menuPosition(): IMenuPosition {
    const { columns, rows, isMobile, isPortrait } = this

    return getMenuPosition({ columns, rows, isMobile, isPortrait })
  }

  @computed
  private get pageLeftCornerPosition(): IGridCell {
    return {
      column: 0,
      row: 0
    }
  }

  startAnimation() {
    this.isAnimationRun = true
  }

  stopAnimation() {
    this.isAnimationRun = false

    if (this.initWasRequested) {
      this.init()
    }

    this.initWasRequested = false
  }

  @bind
  isAnimationCanceled() {
    return this.initWasRequested
  }

  async delayAnimation(ms: number) {
    if (!this.isAnimationCanceled()) {
      await delay(ms)
    }
  }

  async showInitialAnimation() {
    const
      { columns, rows, grid, isMobile } = this,
      STEP_DELAY = isMobile ? 15 : 8,
      { column: midColumn, row: midRow } = this.middleCell,
      middleCellId = grid[midRow][midColumn],
      middleCell = this.getCellData(middleCellId)

    {
      const
        scenarioConfig = { columns, rows },
        scenario = makeSpiralScenario(scenarioConfig),
        iteration = ({ column, row }: IGridCell) => {
          const
            id = grid[row][column],
            cell = this.getCellData(id)

          if (middleCellId === id) {
            middleCell.model = new EmojiModel(HelloEmojiModel.symbol)
          } else {
            cell.model = new EmojiModel(searchRandomEmoji([
              'snow', 'happy', 'santa', 'gift', 'family', 'beer', 'coffee', 'cup tea', 'glass wine', 'celebration', 'orange fruit'
            ]))
          }
        },
        process: TRunScenarioProcessFunction = cells => cells.forEach(iteration)

      await this.runAnimationScenario(
        scenario,
        STEP_DELAY,
        process,
      )
    }

    await this.delayAnimation(300)

    {
      const clear = async (vectors: I2DDirectionVector[]) => {
        const
          CLEAR_OFFSET = 1,
          scenarioConfig: IFromCellScenarioArguments = {
            columns, rows,
            cell: {
              column: midColumn,
              row: midRow,
            },
            vectors,
            minColumn: CLEAR_OFFSET,
            minRow: CLEAR_OFFSET,
            maxColumn: columns - CLEAR_OFFSET,
            maxRow: rows - CLEAR_OFFSET,
          },
          scenario = makeFromCellScenario(scenarioConfig),
          iteration = ({ column, row }: IGridCell) => {
            const
              id = grid[row][column],
              cell = this.getCellData(id)

            if (middleCellId !== id) {
              this.clearCell(cell)
            }
          },
          process: TRunScenarioProcessFunction = cells => cells.forEach(iteration)

        await this.runAnimationScenario(
          scenario,
          STEP_DELAY * 2.5,
          process,
        )
      }

      !isMobile && await clear([
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ])

      await clear([
        { x: -1, y: 1 },
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ])
    }

    middleCell.model = new HelloEmojiModel()

    let beforeLastAnimationTimestamp = performance.now()
    const helloAnimationTime = parseInt(cellStyles.helloAnimationTime)

    await this.delayAnimation(helloAnimationTime * .9)

    {
      const
        scenarioConfig: IFromCellScenarioArguments = {
          columns, rows, cell: { column: midColumn, row: this.rows - 1 }, vectors: [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
          ]
        },
        scenario = makeFromCellScenario(scenarioConfig),
        iteration = ({ column, row }: IGridCell) => {
          const
            id = grid[row][column],
            cell = this.getCellData(id)

          this.clearCell(cell)
        },
        process: TRunScenarioProcessFunction = cells => cells.forEach(iteration)

      await this.runAnimationScenario(
        scenario,
        20,
        process,
      )
    }

    const
      endDelay = helloAnimationTime - (performance.now() - beforeLastAnimationTimestamp)

    if (endDelay > 0) {
      await this.delayAnimation(endDelay)
    }

    this.clearCell(middleCell)

    this.initialAnimationWasShown = true
  }

  @bind
  getCellData(id: string): ICell {
    return this.cells.get(id)!
  }

  clearCell = (cell: ICell): void => {
    if (cell && !(cell.model instanceof EmptyModel)) cell.model = new EmptyModel()
  }

  async place404() {
    const
      // #321A4F, #16203A, #103234
      c1 = '#5a2f8e',
      c2 = null,
      c3 = '#267479'

    const array404 = (this.isMobile && this.isPortrait) ? [
      [c1, c2, c1],
      [c1, c1, c1],
      [c2, c2, c1],
      [c3, c3, c3],
      [c3, c2, c3],
      [c3, c3, c3],
      [c1, c2, c1],
      [c1, c1, c1],
      [c2, c2, c1],
    ] : [
      [c1, c2, c1, c3, c3, c3, c1, c2, c1],
      [c1, c1, c1, c3, c2, c3, c1, c1, c1],
      [c2, c2, c1, c3, c3, c3, c2, c2, c1],
    ]

    const
      columns404 = array404[0].length,
      rows404 = array404.length,
      scenarioConfig: IFromCellScenarioArguments = {
        columns: columns404, rows: rows404, cell: { column: 0, row: 0 }, vectors: [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
        ]
      },
      scenario = makeFromCellScenario(scenarioConfig),
      middleCell = this.middleCell,
      getWithShift = ({ row, column }: IGridCell): string => {
        return this.grid[row + middleCell.row - getMatrixMidPoint(array404).row][column + middleCell.column - getMatrixMidPoint(array404).column]
      },
      iteration = ({ column, row }: IGridCell) => {
        const
          id = getWithShift({ column, row }),
          cell = this.getCellData(id)

        const color = array404[row][column]

        if (color) {
          cell.model = new ColorModel(color)
        }
      },
      process: TRunScenarioProcessFunction = cells => cells.forEach(iteration)

    await this.runAnimationScenario(
      scenario,
      100,
      process,
    )

    await this.delayAnimation(500)

    await this.runAnimationScenario(
      scenario,
      40,
      cells => cells.forEach(({ column, row }) =>
        this.clearCell(this.getCellData(getWithShift({ column, row })))),
    )
  }

  @action
  private initGrid() {
    let result: string[][] = []

    this.cells.clear()

    for (let row = 0; row < this.rows; row++) {
      result.push([])

      for (let column = 0; column < this.columns; column++) {
        const cellId = `${row}-${column}`

        result[row].push(cellId)

        this.cells.set(cellId, {
          model: new EmptyModel()
        })
      }
    }

    this.grid = result
  }

  private withAnimationDecorator(method: Function) {
    return async (...args: any) => {
      if (this.isAnimationCanceled()) return

      this.startAnimation()
      await method.apply(this, args)
      this.stopAnimation()
    }
  }

  private async runAnimationScenario(scenario: TGridScenario, stepDelay: number, process: TRunScenarioProcessFunction) {
    await runGridScenario(scenario, stepDelay, process, this.isAnimationCanceled)
  }
}

const makeGrid = () => {
  return new GridService()
}


export default makeGrid
