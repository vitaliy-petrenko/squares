import { action, computed, observable, reaction } from 'mobx'
import {
  calculateGridSize,
  getViewportSize,
  I2DVector,
  IFromCellScenarioArguments,
  isMobile,
  makeFromCellScenario,
  makeSpiralScenario,
  runGridScenario
} from '../helpers/grid'
import { debounce } from 'lodash'
import { searchRandomEmoji } from '../helpers/emoji'
import { delay } from '../helpers/scenario'
import bind from '../decorators/bind'

export enum EViews { initial, application, snake }

export type TFlipperContent = string | null

export interface ICell {
  content?: TFlipperContent
  isHello?: boolean
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
          content: null
        })
      }
    }

    this.grid = result
  }

  @action
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

  @action
  private startAnimation() {
    this.isAnimationRun = true
  }

  @action
  private stopAnimation() {
    this.isAnimationRun = false

    if (this.initWasRequested) {
      this.init()
    }

    this.initWasRequested = false
  }

  @action
  async showInitialAnimation() {
    this.startAnimation()

    const
      { columns, rows, grid, isMobile } = this,
      CLEAR_OFFSET = 1,
      STEP_DELAY = isMobile ? 15 : 10,
      midCol = Math.floor(columns / 2),
      midRow = Math.floor(rows / 2),
      midCellId = grid[midRow][midCol],
      midCell = this.getCell(midCellId),
      midCellSymbol = '✋'

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

            if (midCellId === id) {
              cell.content = midCellSymbol
            } else {
              cell.content = searchRandomEmoji(['snow', 'happy', 'santa', 'gift', 'family'])
            }
          })
        }
      )
    }

    this.initialAnimationWasShown = true

    await delay(300)

    {
      const clear = async (vectors: I2DVector[]) => {
        const
          scenarioConfig: IFromCellScenarioArguments = {
            columns, rows,
            cell: {
              column: midCol,
              row: midRow,
            },
            vectors,
            minColumn: CLEAR_OFFSET,
            minRow: CLEAR_OFFSET,
            maxColumn: columns - CLEAR_OFFSET,
            maxRow: rows - CLEAR_OFFSET,
          },
          scenario = makeFromCellScenario(scenarioConfig)

        await runGridScenario(scenario, STEP_DELAY * 2, (data) => {
          data.forEach(({ column, row }) => {
            const
              id = grid[row][column],
              cell = this.getCell(id)

            if (midCellId !== id) {
              cell.content = ''
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

    midCell.isHello = true


    await delay(800)

    {
      const
        scenarioConfig = { columns, rows },
        scenario = makeSpiralScenario(scenarioConfig)

      await runGridScenario(
        scenario,
        STEP_DELAY,
        (data) => {
          let stop = false

          data.forEach(({ column, row }) => {
            const
              id = grid[row][column],
              cell = this.getCell(id)

            cell.content = ''

            stop = row === CLEAR_OFFSET && column === CLEAR_OFFSET - 1
          })

          if (stop) return true
        }
      )
    }

    midCell.isHello = false
    midCell.content = ''

    this.stopAnimation()

    await this.showInitialAnimation()
  }

  @computed
  get square() {
    return this.columns * this.rows
  }

  @bind
  getCell(id: string) {
    return this.cells.get(id)!
  }

  constructor() {
    this.isMobile = isMobile()

    this.init()

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
}

const makeGrid = () => {
  return new GridService()
}

export default makeGrid
