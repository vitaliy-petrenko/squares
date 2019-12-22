import gridStyle from './components/Grid/Grid.module.scss'
import styles from './components/Cell/Cell.module.scss'

const { minCellSize } = gridStyle

export const
  MIN_CELL_SIZE = parseInt(minCellSize),
  CELL_CLASS_NAMES = styles
