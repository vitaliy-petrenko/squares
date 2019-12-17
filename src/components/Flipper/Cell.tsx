import React from 'react'
import classNames from 'classnames'
import styles from './Cell.module.scss'
import { ECellType } from '../../services/GridService'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'


const Cell = observer(({ id }: { id: string }) => {
  const
    gridService = useGrid(),
    { type, content } = gridService.getCell(id)

  switch (type) {
    case(ECellType.text): {
      return(
        <div className={classNames(styles.cell, styles.isText)}>
          {content}
        </div>
      )
    }

    default: {
      return (
        <div className={styles.cell}/>
      )
    }
  }
})

export default Cell
