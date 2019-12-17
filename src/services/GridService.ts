import { action, computed, observable, reaction } from 'mobx'
import {
  calculateGridSize,
  getViewportSize,
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
}

export class GridService {
  @observable
  columns: number = 0

  @observable
  rows: number = 0

  @observable.struct viewportSize = getViewportSize()

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
    const
      DELAY = 4000 / this.square,
      { columns, rows, grid } = this,
      midCol = Math.floor(columns / 2),
      midRow = Math.floor(rows / 2),
      midCellId = grid[midRow][midCol],
      midCell = this.getCell(midCellId)

    this.startAnimation()

    {
      const
        scenarioConfig = { columns, rows },
        scenario = makeSpiralScenario(scenarioConfig)

      await runGridScenario(scenario, DELAY / 2, (data) => {
        data.forEach(({ column, row }) => {
          const
            id = grid[row][column],
            cell = this.getCell(id)

          if (midCellId === id) {
            cell.content = '👋'
          } else {
            cell.content = searchRandomEmoji(['snow', 'happy', 'santa', 'gift', 'family'])
          }
        })

        return false
      })
    }

    this.initialAnimationWasShown = true

    await delay(300)

    {
      const
        scenarioConfig = {
          columns, rows,
          cell: {
            column: midCol,
            row: midRow,
          },
          vectors: [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: -1, y: 0 },
          ]
        },
        scenario = makeFromCellScenario(scenarioConfig)

      await runGridScenario(scenario, DELAY, (data) => {
        data.forEach(({ column, row }) => {
          const
            id = grid[row][column],
            cell = this.getCell(id)

          if (midCellId !== id) {
            cell.content = ''
          }
        })

        return false
      })
    }

    await delay(1000)

    midCell.content = ''

    this.stopAnimation()

    this.showInitialAnimation()
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
    this.init()

    window.addEventListener('resize', debounce(() => {
      this.viewportSize = getViewportSize()
    }, 500))

    reaction(() => {
      return this.viewportSize
    }, () => {
      this.init()
    })
  }
}

const makeGrid = () => {
  return new GridService()
}

export default makeGrid
