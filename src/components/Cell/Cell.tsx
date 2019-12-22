import React from 'react'
import styles from './Cell.module.scss'
import { observer } from 'mobx-react'
import { useGrid } from '../../contextProviders/GridProvider'
import classNames from 'classnames'
import { EmojiModel, EmptyModel, MenuModel, TCellModel, TextModel } from '../../models/cell'
import withClassName from '../../hoc/withClassName'

const CellFactory = observer(({ id }: { id: string }) => {
  const
    { getCellData } = useGrid(),
    model: TCellModel = getCellData(id).model

  let component

  if (model instanceof EmptyModel) {
    component = <EmptyWithClassName className={model.className}/>
  }

  if (model instanceof EmojiModel) {
    component = <EmojiWithClassName content={model.content} className={model.className}/>
  }

  if (model instanceof TextModel) {
    component = <TextWithClassName content={model.content} className={model.className}/>
  }

  if (model instanceof MenuModel) {
    component = <Menu content={model.content}/>
  }

  return (
    <div className={styles.cell}>
      {component}
    </div>
  )
})

interface ITextProps {
  content: string
}

interface IEmojiProps extends ITextProps {
}

interface IMenuProps extends IEmojiProps {
}

const Empty: React.FC = () => <></>

const EmptyWithClassName = withClassName(Empty)

const Text: React.FC<ITextProps> = ({ content }) => (
  <div className={classNames(styles.cellText)}>
    {content}
  </div>
)

const TextWithClassName = withClassName(withClassName(Text))

const Emoji: React.FC<IEmojiProps> = ({ content }) => (
  <div className={classNames(styles.cellEmoji)}>
    {content}
  </div>
)

const EmojiWithClassName = withClassName(Emoji)

const Menu: React.FC<IMenuProps> = ({ content }) => {
  const onClick = () => console.log('click')

  return (
    <div className={classNames(styles.cellMenu)} onClick={onClick}>
      {content}
    </div>
  )
}

export default CellFactory
