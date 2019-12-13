import React from 'react'
import classNames from 'classnames'
import styles from './Flipper.module.scss'
import { randomInteger } from '../../helpers/misc'

const emojiArray = ['🗼',
  '🗽',
  '🗾',
  '🗿',
  '😀',
  '😁',
  '😂',
  '😃',
  '😄',
  '😅',
  '😆',
  '😇',
  '😈',
  '😉',
  '😊',
  '😋',
  '😌',
  '😍',
  '😎',
  '😏',
  '😐',
  '😑',
  '😒',
  '😓',
  '😔',
  '😕',
  '😖',
  '😗',
  '😘',
  '😙',
  '😚',
  '😛',
  '😜',
  '😝',
  '😞',
  '😟',
  '😠',
  '😡',
  '😢',
  '😣',
  '😤',
  '😥',
  '😦',
  '😧',
  '😨',
  '😩',
  '😪',
  '😫',
  '😬',
  '😭',
  '😮',
  '😯',
  '😰',
  '😱',
  '😲',
  '😳',
  '😴',
  '😵',
  '😶',
  '😷',
  '😸',
  '😹',
  '😺',
  '😻',
  '😼',
  '😽',
  '😾',
  '😿',
  '🙀',
  '🙁',
  '🙂',
  '🙃',
  '🙄',
  '🙅🏻‍♀️',
  '🙅🏻‍♂️',
  '🙅🏻',
  '🙅🏼‍♀️',
  '🙅🏼‍♂️',
  '🙅🏼',
  '🙅🏽‍♀️',
  '🙅🏽‍♂️',
  '🙅🏽',
  '🙅🏾‍♀️',
  '🙅🏾‍♂️',
  '🙅🏾',
  '🙅🏿‍♀️',
  '🙅🏿‍♂️',
  '🙅🏿',
  '🙅‍♀️',
  '🙅‍♂️',
  '🙅',
  '🙆🏻‍♀️',
  '🙆🏻‍♂️',
  '🙆🏻',
  '🙆🏼‍♀️',
  '🙆🏼‍♂️',
  '🙆🏼',
  '🙆🏽‍♀️',
  '🙆🏽‍♂️',
  '🙆🏽',
  '🙆🏾‍♀️',
  '🙆🏾‍♂️',
  '🙆🏾',
  '🙆🏿‍♀️',
  '🙆🏿‍♂️',
  '🙆🏿',
  '🙆‍♀️',
  '🙆‍♂️',
  '🙆',
  '🙇🏻‍♀️',
  '🙇🏻‍♂️',
  '🙇🏻',
  '🙇🏼‍♀️',
  '🙇🏼‍♂️',
  '🙇🏼',
  '🙇🏽‍♀️',
  '🙇🏽‍♂️',
  '🙇🏽',
  '🙇🏾‍♀️',
  '🙇🏾‍♂️',
  '🙇🏾',
  '🙇🏿‍♀️',]

interface IProps {

}

interface IState {
  flip: boolean
  flipDirection: string
  emojis: string[]
}

const getRandomEmoji = (): string => emojiArray[randomInteger(emojiArray.length - 1)]

export default class Flipper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      flip: false,
      flipDirection: randomInteger(8, 1).toString(),
      emojis: [getRandomEmoji(), getRandomEmoji()]
    }

    setInterval(this.flip, 2500 * randomInteger(40, 1))
  }

  flip = () => {
    this.setState(prevState => ({
      ...prevState,
      flip: !prevState.flip
    }))
  }

  render() {
    const { flip, flipDirection, emojis } = this.state

    return (
      <div className={classNames(styles.flipper, styles[`flipDirection${flipDirection}`], flip && styles.isFlipped)}
           onClick={this.flip}>
        <div className={styles.flipperIn}>
          <div className={styles.flipperSide}>
            {emojis[0]}
          </div>

          <div className={styles.flipperSide}>
            {emojis[1]}
          </div>
        </div>
      </div>
    )
  }
}
