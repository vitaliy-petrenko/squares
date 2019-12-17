import React from 'react'
import classNames from 'classnames'
import styles from './Cell.module.scss'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'


const Cell = observer(({ id }: { id: string }) => {
  const
    { getCell } = useGrid(),
    cell = getCell(id)

  if (!cell) return null

  const
    { content } = cell

  return (
    <div className={classNames(styles.cell, styles.isText)}>
      {content}
    </div>
  )
})

export default Cell
