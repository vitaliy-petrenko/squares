import { action, computed, observable, reaction } from 'mobx'
import { calculateGridSize, getViewportSize, makeSpiralScenario, runGridScenario } from '../helpers/grid'
import { debounce } from 'lodash'
import uuid from 'uuid'
import { getRandomEmoji } from '../helpers/emoji'

export enum EViews { initial, application, snake }

export type TFlipperContent = string | null

export interface ICell {
  content?: TFlipperContent
}

export interface ICells {
  [key: string]: ICell
}

export class GridService {
  @observable
  columns: number = 0

  @observable
  rows: number = 0

  @observable.struct viewportSize = getViewportSize()

  @observable
  view: EViews = EViews.initial

  @observable
  grid: string[][] = []

  @observable
  private cells = new Map<string, ICell>()

  getCell(id: string) {
    return this.cells.get(id)
  }

  @action
  private initGrid() {
    let result: string[][] = []

    this.cells.clear()

    for (let row = 0; row < this.rows; row++) {
      result.push([])

      for (let column = 0; column < this.columns; column++) {
        const cellId = uuid.v4()

        result[row].push(cellId)

        this.cells.set(cellId, {
          content: null
        })
      }
    }

    this.grid = result
  }

  @action
  private init() {
    const { columns, rows } = calculateGridSize(this.viewportSize)

    this.columns = columns
    this.rows = rows

    this.initGrid()

    if (this.needToShowInitialAnimation) {
      this.showInitialAnimation()
    }
  }

  private get needToShowInitialAnimation() {
    return true
  }

  @computed
  get square() {
    return this.columns * this.rows
  }

  @action
  async showInitialAnimation() {
    const DELAY = 3000 / this.square

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

          cell.content = getRandomEmoji()
        })

        return false
      })
    }

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

    // const spiral = makeSpiral(this.rows, this.columns)
    //
    // console.log(spiral)
    // this.grid = spiral.map(
    //   row => ({
    //     id: uuid.v4(),
    //     columns: row.map(
    //       value => ({
    //         id: uuid.v4(),
    //         content: getRandomEmoji(),
    //         type: ECellType.text,
    //         delay: LINEAR_DELAY * value + INITIAL_DELAY,
    //       })
    //     )
    //   })
    // )

    // await (delay(INITIAL_DELAY + this.square * LINEAR_DELAY + 1900))
    //
    // const
    //   middleX = Math.floor(this.columns / 2),
    //   middleY = Math.floor(this.rows / 2),
    //   next: IRow[] = this.grid.map(({ id, columns }, y) => ({
    //     id,
    //     columns: columns.map(
    //       ((cell, x) => {
    //           return {
    //             ...cell,
    //             id: uuid.v4(),
    //             delay: Math.max(Math.abs(middleY - y), Math.abs(middleX - x)) * 100,
    //             vector: Math.abs(middleY - y) === Math.abs(middleX - x) ? {
    //               x: x < middleX ? -1 : 1,
    //               y: y < middleY ? -1 : 1
    //             } : x < middleX ? {
    //               x: -1,
    //               y: 0
    //             } : {
    //               x: 1,
    //               y: 0
    //             },
    //             content: null
    //           }
    //         }
    //       ))
    //   }))

    // this.grid = next
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
