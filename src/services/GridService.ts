import { action, computed, observable, reaction } from 'mobx'
import {
  calculateGridSize,
  getMatrixMidPoint,
  getMenuPosition,
  getViewportSize,
  isMobileMode,
  isPortraitMode,
  makeFromCellScenario,
  makeSpiralScenario,
  runGridScenario
} from '../helpers/grid'
import { debounce } from 'lodash'
import { searchRandomEmoji } from '../helpers/emoji'
import { delay } from '../helpers/scenario'
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
    this.init()

    this.showInitialAnimation = this.withAnimationDecorator(this.showInitialAnimation)

    window.addEventListener('resize', debounce(() => {
      this.viewportSize = getViewportSize()
    }, 500))

    reaction(() => {
      return this.viewportSize
    }, () => {
      this.isMobile = isMobileMode()
      this.isPortrait = isPortraitMode()
      this.init()
    })
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

  async showInitialAnimation() {
    const
      { columns, rows, grid, isMobile } = this,
      CLEAR_OFFSET = 1,
      STEP_DELAY = isMobile ? 15 : 8,
      { column: midColumn, row: midRow } = this.middleCell,
      middleCellId = grid[midRow][midColumn],
      middleCell = this.getCell(middleCellId),
      helloSymbol = '✋'

    {
      const
        scenarioConfig = { columns, rows },
        scenario = makeSpiralScenario(scenarioConfig)

      await runGridScenario(
        scenario,
        STEP_DELAY,
        (data) => {
          data.forEach(({ column, row }) => {
            const
              id = grid[row][column],
              cell = this.getCell(id)

            if (middleCellId === id) {
              middleCell.model = new EmojiModel(helloSymbol)
            } else {
              cell.model = new EmojiModel(searchRandomEmoji([
                'snow', 'happy', 'santa', 'gift', 'family', 'beer', 'coffee', 'cup tea', 'glass wine', 'celebration', 'orange fruit'
              ]))
            }
          })
        }
      )
    }

    await delay(300)

    {
      const clear = async (vectors: I2DDirectionVector[]) => {
        const
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
          scenario = makeFromCellScenario(scenarioConfig)

        await runGridScenario(scenario, STEP_DELAY * 2.5, (data) => {
          data.forEach(({ column, row }) => {
            const
              id = grid[row][column],
              cell = this.getCell(id)

            if (middleCellId !== id) {
              this.clearCell(cell)
            }
          })
        })
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

    middleCell.model = new HelloEmojiModel(helloSymbol)

    let beforeLastAnimationTimestamp = performance.now()
    const helloAnimationTime = parseInt(cellStyles.helloAnimationTime)

    await delay(helloAnimationTime * .9)

    {
      const
        scenarioConfig: IFromCellScenarioArguments = {
          columns, rows, cell: { column: midColumn, row: this.rows - 1 }, vectors: [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
          ]
        },
        scenario = makeFromCellScenario(scenarioConfig)

      await runGridScenario(
        scenario,
        20,
        (data) => {
          data.forEach(({ column, row }) => {
            const
              id = grid[row][column],
              cell = this.getCell(id)

            this.clearCell(cell)
          })
        }
      )
    }

    const
      endDelay = helloAnimationTime - (performance.now() - beforeLastAnimationTimestamp)

    if (endDelay > 0) {
      await delay(endDelay)
    }

    this.clearCell(middleCell)

    // this.initialAnimationWasShown = true

    await this.place404()

    await this.showInitialAnimation()
  }

  @bind
  getCell(id: string): ICell {
    return this.cells.get(id)!
  }

  clearCell = (cell: ICell): void => {
    cell.model = new EmptyModel()
  }

  async place404() {
    const
      // #321A4F, #16203A, #103234
      c1 = '#5a2f8e',
      c2 = 'transparent',
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
        columns: columns404, rows: rows404, cell: getMatrixMidPoint(array404), vectors: [
          { x: -1, y: 1 },
          { x: -1, y: -1 },
          { x: 0, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ]
      },
      scenario = makeFromCellScenario(scenarioConfig),
      middleCell = this.middleCell,
      getWithShift = ({ row, column }: IGridCell): string => {
        return this.grid[row + middleCell.row - getMatrixMidPoint(array404).row][column + middleCell.column - getMatrixMidPoint(array404).column]
      }

    await runGridScenario(
      scenario,
      80,
      (data) => {
        data.forEach(({ column, row }) => {
          const
            id = getWithShift({ column, row }),
            cell = this.getCell(id)

          const color = array404[row][column]

          if (color) {
            cell.model = new ColorModel(array404[row][column])
          }
        })
      }
    )

    await delay(500)

    await runGridScenario(
      scenario,
      80,
      (data) => {
        data.forEach(({ column, row }) => {
          this.clearCell(this.getCell(getWithShift({ column, row })))
        })
      }
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

  private async init() {
    if (this.isAnimationRun) {
      this.initWasRequested = true
      return
    }

    const { columns, rows } = calculateGridSize(this.viewportSize)

    this.columns = columns
    this.rows = rows

    this.initGrid()

    if (!this.initialAnimationWasShown) {
      await delay(1000)
      this.showInitialAnimation()
    }
  }

  private withAnimationDecorator(method: Function) {
    return async (...args: any) => {
      this.startAnimation()
      await method.apply(this, args)
      this.stopAnimation()
    }
  }
}

const makeGrid = () => {
  return new GridService()
}


export default makeGrid
