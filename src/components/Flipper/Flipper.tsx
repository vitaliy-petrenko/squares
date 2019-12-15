import React from 'react'
import classNames from 'classnames'
import styles from './Flipper.module.scss'

interface IProps {
  rowsCount: number,
  columnsCount: number,
  x: number,
  y: number
}

interface IState {
  flip: boolean
}

export default class Flipper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      flip: false,
    }

    const { rowsCount, columnsCount, x, y } = props

    const
      middleX = Math.floor(columnsCount / 2),
      middleY = Math.floor(rowsCount / 2)

    const delayStep = 120

    console.log(middleX, middleY)

    const iterationDuration = Math.max(middleX, middleY) * delayStep

    if (Math.abs(middleX - x) > 2 * columnsCount / 5 || Math.abs(middleY - y) > 2 * rowsCount / 5) return

    setTimeout(() => {
      setInterval(this.flip, iterationDuration)
    }, (Math.abs(middleX - x) + Math.abs(middleY - y)) * delayStep)
  }

  flip = () => {
    this.setState(prevState => ({
      ...prevState,
      flip: !prevState.flip
    }))
  }

  get flipDirectionClass() {
    const { rowsCount, columnsCount, x, y } = this.props

    const
      middleX = Math.floor(columnsCount / 2),
      middleY = Math.floor(rowsCount / 2),
      diffX = x - middleX,
      diffY = y - middleY

    if (Math.abs(diffX) === Math.abs(diffY)) {
      //middle
      if (diffX === 0 && diffY === 0) {
        return 'flipDirection4'
      }

      //corners
      if (x < middleX) {
        if (y < middleY) {
          //to left top
          return 'flipDirection1'
        } else {
          //to left bottom
          return 'flipDirection7'
        }
      } else {
        if (y < middleY) {
          //to right top
          return 'flipDirection3'
        } else {
          //to right bottom
          return 'flipDirection5'
        }
      }
    } else {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          return 'flipDirection8'
        } else {
          return 'flipDirection4'
        }
      } else {
        if (diffY < 0) {
          return 'flipDirection2'
        } else {
          return 'flipDirection6'
        }
      }
    }
  }

  render() {
    const { flip } = this.state

    return (
      <div className={classNames(styles.flipper, styles[this.flipDirectionClass], flip && styles.isFlipped)}
           onClick={this.flip}>
        <div className={styles.flipperIn}>
          <div className={styles.flipperSide}>
          </div>

          <div className={styles.flipperSide}>
          </div>
        </div>
      </div>
    )
  }
}
