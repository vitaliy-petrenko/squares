import { action, computed, observable, reaction } from 'mobx'
import {
  calculateGridSize,
  getViewportSize,
  isMobile,
  makeFromCellScenario,
  makeSpiralScenario,
  runGridScenario
} from '../helpers/grid'
import { debounce } from 'lodash'
import { searchRandomEmoji } from '../helpers/emoji'
import { delay } from '../helpers/scenario'
import bind from '../decorators/bind'
import cellStyles from '../components/Cell/Cell.module.scss'
import { EmojiModel, EmptyModel, HelloEmojiModel, TCellModel } from '../models/cell'

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
  @observable isMobile: boolean = false

  @observable
  private view: EViews = EViews.initial

  @observable
  grid: string[][] = []

  @observable
  private cells = new Map<string, ICell>()

  private menuPosition: IGridCell = {
    column: 0,
    row: 0
  }

  private pagePosition: IGridCell = {
    column: 0,
    row: 0
  }

  constructor() {
    this.isMobile = isMobile()

    this.init()

    this.showInitialAnimation = this.withAnimationDecorator(this.showInitialAnimation)

    window.addEventListener('resize', debounce(() => {
      this.viewportSize = getViewportSize()
    }, 500))

    reaction(() => {
      return this.viewportSize
    }, () => {
      this.isMobile = isMobile()
      this.init()
    })
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

  private initialAnimationWasShown = false

  private isAnimationRun = false
  private initWasRequested = false

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

  private withAnimationDecorator(method: Function) {
    return async (...args: any) => {
      this.startAnimation()
      await method.apply(this, args)
      this.stopAnimation()
    }
  }

  async showInitialAnimation() {
    const
      { columns, rows, grid, isMobile } = this,
      CLEAR_OFFSET = 1,
      STEP_DELAY = isMobile ? 15 : 10,
      midColumn = Math.floor(columns / 2),
      midRow = Math.floor(rows / 2),
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
              cell.model = new EmptyModel()
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

            cell.model = new EmptyModel()
          })
        }
      )
    }

    const
      endDelay = helloAnimationTime - (performance.now() - beforeLastAnimationTimestamp)

    if (endDelay > 0) {
      await delay(endDelay)
    }

    middleCell.model = new EmptyModel()

    this.initialAnimationWasShown = true
  }

  @computed
  get square() {
    return this.columns * this.rows
  }

  @bind
  getCell(id: string): ICell {
    return this.cells.get(id)!
  }
}

const makeGrid = () => {
  return new GridService()
}


export default makeGrid
