export class EmptyModel {
  readonly isEmpty = true
}

export class EmojiModel {
  readonly isEmoji: true = true

  constructor(public content: string) {
  }
}

export class HelloEmojiModel extends EmojiModel {
  public isHello = true
}

export class TextModel {
  readonly isText: true = true

  constructor(public content: string) {
  }
}

export type TCellModel = EmptyModel | EmojiModel | TextModel | HelloEmojiModel
