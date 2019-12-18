import React from 'react'
import styles from './Cell.module.scss'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'
import classNames from 'classnames'
import { EmojiModel, EmptyModel, HelloEmojiModel, TCellModel, TextModel } from '../../models/cell'

const CellWrap: React.FC = ({ children }) => (
  <div className={styles.cell}>
    {children}
  </div>
)

const CellComponentFactory = observer(({ id }: { id: string }) => {
  const
    { getCell } = useGrid(),
    model: TCellModel = getCell(id).model

  let component

  if (model instanceof EmojiModel) {
    component = <Emoji {...model}/>
  }

  if (model instanceof HelloEmojiModel) {
    component = <HelloEmoji {...model}/>
  }

  if (model instanceof TextModel) {
    component = <Text {...model}/>
  }

  if (model instanceof EmptyModel) {
    component = <></>
  }

  return (
    <CellWrap>
      {component}
    </CellWrap>
  )
})

const Emoji: React.FC<EmojiModel> = (model) => (
  <div className={classNames(styles.cellEmoji)}>
    {model.content}
  </div>
)

const HelloEmoji: React.FC<HelloEmojiModel> = (model) => (
  <div className={classNames(styles.cellEmoji, styles.cellHelloEmoji)}>
    {model.content}
  </div>
)

const Text: React.FC<TextModel> = (model) => (
  <div className={styles.cellText}>
    {model.content}
  </div>
)

export default CellComponentFactory
