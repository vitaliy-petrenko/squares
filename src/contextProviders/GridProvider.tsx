import React from 'react'
import makeGrid, { GridService } from '../services/GridService' // 6.x or mobx-react-lite@1.4.0
import { useLocalStore } from 'mobx-react'

const gridContext = React.createContext<GridService | null>(null)

export const GridProvider: React.FC = ({ children }) => {
  const store = useLocalStore(makeGrid)
  return <gridContext.Provider value={store}>{children}</gridContext.Provider>
}

export const useGrid = () => {
  const store = React.useContext(gridContext)

  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useGrid must be used within a GridProvider.')
  }

  return store
}
