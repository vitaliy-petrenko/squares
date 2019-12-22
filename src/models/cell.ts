import { searchRandomEmoji } from '../helpers/emoji'
import { CELL_CLASS_NAMES } from '../constants'
import { computed, observable } from 'mobx'

interface IBaseModelProps {
  className?: string
}

interface ITextModelProps extends IBaseModelProps {
  content: string
}

interface IEmojiModelProps extends IBaseModelProps {
  content?: string
}

abstract class BaseModel {
  @observable
  className?: string

  setClassName(className: string) {
    this.className = className
  }

  constructor(props?: IBaseModelProps) {
    if (props) {
      const { className } = props
      this.className = className
    }
  }
}

export class EmptyModel extends BaseModel {
  get isClean(): boolean {
    return !this.className
  }

  clear() {
    this.className = undefined
  }
}

export class TextModel extends BaseModel {
  content: string

  constructor(props: ITextModelProps) {
    super(props)

    this.content = props.content
  }
}

export class EmojiModel extends BaseModel {
  static get random(): string {
    return searchRandomEmoji([
      'snow', 'happy', 'santa', 'gift', 'family', 'beer', 'coffee', 'cup tea', 'glass wine', 'celebration', 'orange fruit'
    ])
  }

  static HELLO_EMOJI: string = '✋'
  static HELLO_CLASS: string = CELL_CLASS_NAMES.cellHelloEmoji

  @observable
  private _content?: string

  @computed
  get content(): string {
    return this._content || EmojiModel.random
  }

  set content(content: string) {
    this._content = content
  }

  constructor(props?: IEmojiModelProps) {
    const superConfig: IBaseModelProps = {}

    if (props && props.className) superConfig.className = props.className

    super(superConfig)

    if (props && props.content) {
      this._content = props.content
    }
  }
}

export class IconModel extends BaseModel {

}

export class ImageModel extends BaseModel {
}


export type TCellModel = EmptyModel | EmojiModel | TextModel | IconModel | ImageModel

export enum E_RAW_DATA_MODEL_TYPE { TEXT, EMOJI, EMPTY}
