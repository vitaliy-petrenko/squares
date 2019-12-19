export class EmptyModel {
}

export class ColorModel {
  constructor(public color: string) {
  }
}

export class EmojiModel {
  constructor(public content: string) {
  }
}

export class HelloEmojiModel {
  static symbol: string = '✋'
}

export class TextModel {
  constructor(public content: string) {
  }
}

export class IconModel {
}

export class ImageModel {
}

export class MenuItemModel {
}


export type TCellModel = EmptyModel | EmojiModel | TextModel | HelloEmojiModel | IconModel | ImageModel | MenuItemModel
