import React from 'react'
import { Properties as TCSSProperties } from 'csstype'
import styles from './Cell.module.scss'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'
import classNames from 'classnames'
import { ColorModel, EmojiModel, HelloEmojiModel, TCellModel, TextModel } from '../../models/cell'

const CellComponentFactory = observer(({ id }: { id: string }) => {
  const
    { getCellData } = useGrid(),
    model: TCellModel = getCellData(id).model

  let component

  if (model instanceof EmojiModel) {
    component = <Emoji {...model}/>
  }

  if (model instanceof HelloEmojiModel) {
    component = <HelloEmoji/>
  }

  if (model instanceof TextModel) {
    component = <Text {...model}/>
  }

  if (model instanceof ColorModel) {
    component = <Color {...model}/>
  }

  return (
    <>
      {component}
    </>
  )
})

export const Emoji: React.FC<EmojiModel> = ({ content }) => (
  <div className={classNames(styles.cell, styles.cellEmoji)}>
    {content}
  </div>
)

export const HelloEmoji: React.FC = () => (
  <div className={classNames(styles.cell, styles.cellEmoji, styles.cellHelloEmoji)}>
    {HelloEmojiModel.symbol}
  </div>
)

export const Text: React.FC<TextModel> = ({ content }) => (
  <div className={classNames(styles.cell, styles.cellText)}>
    {content}
  </div>
)

export const Color: React.FC<ColorModel> = ({ color }) => {
  const css: TCSSProperties = {}

  css.background = color

  return <div className={classNames(styles.cell, styles.cellColor)} style={css}/>
}

export default CellComponentFactory
