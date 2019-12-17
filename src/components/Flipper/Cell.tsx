import React from 'react'
import classNames from 'classnames'
import styles from './Cell.module.scss'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'

export const HELLO_CLASS_NAME = styles.isHello

const Cell = observer(({ id }: { id: string }) => {
  const
    { getCell } = useGrid(),
    cell = getCell(id)

  if (!cell) return null

  const
    { content, isHello } = cell,
    className = classNames(
      styles.cell,
      styles.isText,
      isHello && styles.isHello
    )

  return (
    <div className={className}>
      {content}
    </div>
  )
})

export default Cell
