import React, { useMemo, useState } from 'react'
import { orderedArray } from '../../helpers/misc'
import Flipper from '../Flipper'
import styles from './Grid.module.scss'
import classNames from 'classnames'

interface IProps {
  columns: number
  rows: number
}

const Grid: React.FC<IProps> = ({ columns, rows }) => {
  const
    rowsArray = orderedArray(rows),
    columnsArray = orderedArray(columns)

  return (
    <div className={styles.grid}>
      <div className={styles.gridIn}>
        {
          rowsArray.map(row => (
            <Row key={row}>
              {
                columnsArray.map(column => (
                  <Col key={column}>
                    <Flipper/>
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

const Row: React.FC = ({ children }) => <div className={styles.row}>{children}</div>

const getRandomFloatingClass = () => styles[`isFloating${Math.round(10 * Math.random())}`]

const Col: React.FC = ({ children }) => {
  const
    [isEmpty] = useState(false),
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
