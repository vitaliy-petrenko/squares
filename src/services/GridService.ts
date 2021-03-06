import { action, computed, observable, reaction } from 'mobx'
import { debounce } from 'lodash'
import {
  calculateGridSize,
  delay,
  getMatrixCellWithOffset,
  getMatrixMidPoint,
  getMatrixSlice,
  getMenuPosition,
  getViewportSize,
  isMobileMode,
  isPortraitMode,
  makeFromCellScenario,
  makeSpiralScenario,
  runGridScenario,
} from '../helpers/grid'
import bind from '../decorators/bind'
import cellStyles from '../components/Cell/Cell.module.scss'
import { E_RAW_DATA_MODEL_TYPE, EmojiModel, EmptyModel, MenuModel, TCellModel, TextModel } from '../models/cell'
import { CELL_CLASS_NAMES } from '../constants'
import { MENU_CONFIG } from '../pagesData'

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
    this.placeMenu = this.withAnimationDecorator(this.placeMenu)

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

  @computed
  get middleCell(): IMatrixCell {
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
  private get pageLeftCornerPosition(): IMatrixCell {
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
      this.initWasRequested = false
      this.init()
    }
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
        iteration = ({ column, row }: IMatrixCell) => {
          const
            id = grid[row][column],
            cell = this.getCellData(id)

          if (middleCellId === id) {
            middleCell.model = new EmojiModel({ content: EmojiModel.HELLO_EMOJI })
          } else {
            cell.model = new EmojiModel()
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
          iteration = ({ column, row }: IMatrixCell) => {
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

    middleCell.model.setClassName(EmojiModel.HELLO_CLASS)

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
        iteration = ({ column, row }: IMatrixCell) => {
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
  }

  @bind
  getCellData(id: string): ICell {
    return this.cells.get(id)!
  }

  clearCell = (cell: ICell): void => {
    if (!(cell.model instanceof EmptyModel)) {
      cell.model = new EmptyModel()
    } else if (!cell.model.isClean) {
      cell.model.clear()
    }
  }

  async placeMenu() {
    const
      { column, row, vector } = getMenuPosition({
        columns: this.columns,
        rows: this.rows,
        isMobile: this.isMobile,
        isPortrait: this.isPortrait,
      })

    let gridSlice: string[]

    if (vector.x === 1) {
      gridSlice = getMatrixSlice(this.grid, { column, row }, { column: column + MENU_CONFIG.length, row: row }).flat()
    } else {
      gridSlice = getMatrixSlice(this.grid, { column, row }, { column: column, row: row + MENU_CONFIG.length }).flat()
    }

    for (let i = 0; i < MENU_CONFIG.length; i++) {
      const { title, link, symbol } = MENU_CONFIG[i]

      const cell = this.getCellData(gridSlice[i])

      if (!cell) return

      cell.model = new MenuModel({ content: symbol, title })

      await this.delayAnimation(140)
    }

  }

  async place404() {
    const
      c1 = CELL_CLASS_NAMES.cell404Color1,
      c2 = null,
      c3 = CELL_CLASS_NAMES.cell404Color2

    let
      cellType = E_RAW_DATA_MODEL_TYPE.EMPTY,
      array404 = (this.isMobile && this.isPortrait) ? [
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

    if (this.isMobile) {
      if ((this.isPortrait && (this.rows - 3 < array404.length)) || this.columns - 3 < array404[0].length) {
        array404 = [
          ['4', '0', '4'],
        ]
        cellType = E_RAW_DATA_MODEL_TYPE.TEXT
      }
    }


    const
      columns404 = array404[0].length,
      rows404 = array404.length,
      middleCell = this.middleCell,
      rowOffset = middleCell.row - getMatrixMidPoint(array404).row,
      columnOffset = middleCell.column - getMatrixMidPoint(array404).column,
      scenarioConfig: IFromCellScenarioArguments = {
        columns: columns404, rows: rows404, cell: { column: 0, row: 0 }, vectors: [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
        ]
      },
      scenario = makeFromCellScenario(scenarioConfig),
      iteration = ({ column: column404, row: row404 }: IMatrixCell) => {
        const gridCell = getMatrixCellWithOffset(this.grid, { column: column404, row: row404 }, {
          rowOffset,
          columnOffset
        })

        if (!gridCell) return

        const
          { column, row } = gridCell,
          cell = this.getCellData(this.grid[row][column]),
          value = array404[row404][column404]

        if (value) {
          if (cellType === E_RAW_DATA_MODEL_TYPE.EMPTY) {
            cell.model = new EmptyModel({ className: value })
          } else {
            cell.model = new TextModel({ content: value })
          }
        }
      },
      process: TRunScenarioProcessFunction = cells => cells.forEach(iteration)

    await this.runAnimationScenario(
      scenario,
      100,
      process,
    )

    // await this.delayAnimation(1000)

    await this.runAnimationScenario(
      scenario,
      100,
      cells => cells.forEach(({ column, row }) => {
        const gridCell = getMatrixCellWithOffset(this.grid, { column, row }, { rowOffset, columnOffset })

        if (!gridCell) return

        this.clearCell(this.getCellData(this.grid[gridCell.row][gridCell.column]))
      })
    )

    await this.place404()
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
    if (!this.initialAnimationWasShown) {
      this.initialAnimationWasShown = true
      // await this.delayAnimation(1000)
      // await this.showInitialAnimation()
    }

    await this.placeMenu()
    await this.place404()
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
