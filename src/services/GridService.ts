import { action, computed, observable, reaction } from 'mobx'
import { calculateGridSize, getViewportSize, makeSpiralScenario, runGridScenario } from '../helpers/grid'
import { debounce } from 'lodash'
import { getRandomEmojiFromSearch } from '../helpers/emoji'
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
    const { columns, rows } = calculateGridSize(this.viewportSize)

    this.columns = columns
    this.rows = rows

    this.initGrid()

    if (!this.initialAnimationWasShown) {
      await this.showInitialAnimation()
    }
  }

  private initialAnimationWasShown = false

  @action
  async showInitialAnimation() {
    const DELAY = 3000 / this.square

    await delay(1000)

    {
      const
        { columns, rows, grid } = this,
        scenarioConfig = { columns, rows },
        scenario = makeSpiralScenario(scenarioConfig)

      await runGridScenario(scenario, DELAY, (data) => {
        data.forEach(({ column, row }) => {
          const
            id = grid[row][column],
            cell = this.getCell(id)

          if (!cell) return

          cell.content = getRandomEmojiFromSearch(['winter', 'christmas', 'santa', 'gift', 'family'])
        })

        return false
      })
    }

    this.initialAnimationWasShown = true

    const
      { columns, rows, grid } = this,
      scenarioConfig = { columns, rows },
      scenario = makeSpiralScenario(scenarioConfig)

    await runGridScenario(scenario, DELAY, (data) => {
      data.forEach(({ column, row }) => {
        const
          id = grid[row][column],
          cell = this.getCell(id)

        if (!cell) return

        cell.content = null
      })

      return false
    })

    this.showInitialAnimation()
  }

  @computed
  get square() {
    return this.columns * this.rows
  }

  @bind
  getCell(id: string) {
    return this.cells.get(id)
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
