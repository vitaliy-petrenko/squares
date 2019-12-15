import React, { useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { orderedArray } from '../../helpers/misc'
import Flipper from '../Flipper'
import styles from './Grid.module.scss'
import classNames from 'classnames'
import { calculateGridSize } from '../../helpers/grid'

interface IProps {
}

const calculateGrid = () => calculateGridSize()

class Grid extends React.Component<IProps> {
  state = {
    grid: calculateGrid()
  }

  get gridRows() {
    return orderedArray(this.state.grid.rows)
  }

  get gridColumns() {
    return orderedArray(this.state.grid.columns)
  }

  onWindowResize = () => {
    this.setState({
      grid: calculateGrid()
    })
  }

  onWindowResizeDebounced = debounce(this.onWindowResize, 400)

  componentDidMount(): void {
    window.addEventListener('resize', this.onWindowResizeDebounced)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onWindowResizeDebounced)
  }

  render() {
    const
      rowsArray = this.gridRows,
      columnsArray = this.gridColumns

    return (
      <div className={styles.grid}>
        <div className={styles.gridIn}>
          {
            rowsArray.map(row => (
              <Row key={row}>
                {
                  columnsArray.map(column => (
                    <Col key={column}>
                      <Flipper
                        x={column}
                        y={row}
                        columnsCount={columnsArray.length}
                        rowsCount={rowsArray.length}
                      />
                    </Col>
                  ))
                }
              </Row>
            ))
          }
        </div>
      </div>
    )
  }
}

const Row: React.FC = ({ children }) => <div className={styles.row}>{children}</div>

const getRandomFloatingClass = () => styles[`isFloating${Math.round(10 * Math.random())}`]

const Col: React.FC = ({ children }) => {
  const
    [isEmpty] = useState(true),
    floatingClass = useMemo(getRandomFloatingClass, [isEmpty])

  return (
    <div
      className={
        classNames(styles.col, isEmpty && floatingClass)
      }
    >
      <div className={styles.colIn}>
        {children}
      </div>
    </div>
  )
}

export default Grid
