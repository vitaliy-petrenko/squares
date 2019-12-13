import React from 'react'
import classNames from 'classnames'
import styles from './Flipper.module.scss'
import { randomInteger } from '../../helpers/misc'

interface IProps {

}

interface IState {
  flip: boolean,
  flipDirection: string
}

export default class Flipper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      flip: false,
      flipDirection: randomInteger(8, 1).toString()
    }

    setInterval(this.flip, 3000 * randomInteger(100, 1))
  }

  flip = () => {
    this.setState(prevState => ({
      ...prevState,
      flip: !prevState.flip
    }))
  }

  render() {
    const { flip, flipDirection } = this.state

    return (
      <div className={classNames(styles.flipper, styles[`flipDirection${flipDirection}`], flip && styles.isFlipped)}
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
