import { getRandomArrayItem } from './misc'
import { emojiIndex } from 'emoji-mart'

export const searchRandomEmoji = (() => {
  const
    cache = new Map(),
    getSearchResults = (searchString: string): string[] => {
      const fromCache = cache.get(searchString)

      if (fromCache) {
        return fromCache
      }

      // @ts-ignore
      const searchResults = emojiIndex.search(searchString).map((item) => item.native)

      // console.log(searchString, searchResults)

      cache.set(searchString, searchResults)

      return searchResults
    }

  return (searchStrings: string[]): string => {
    return getRandomArrayItem(searchStrings.map(getSearchResults).flat())
  }
})()
