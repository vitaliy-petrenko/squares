import React from 'react'
import styles from './Grid.module.scss'
import classNames from 'classnames'
import Cell from '../Flipper'
import { useGrid } from '../../contextProviders/GridProvider'
import { observer } from 'mobx-react'

const Grid = observer(() => {
  const { grid } = useGrid()

  return (
    <div className={styles.grid}>
      {
        grid.map(({ id, columns }) => (
          <Row key={id}>
            {
              columns.map(id => (
                <Col key={id}>
                  <Cell id={id}/>
                </Col>
              ))
            }
          </Row>
        ))
      }
    </div>
  )
})

const Row: React.FC = ({ children }) => <div className={styles.row}>{children}</div>

const Col: React.FC = ({ children }) => {
  return (
    <div
      className={
        classNames(styles.col)
      }
    >
      {children}
    </div>
  )
}

export default Grid
