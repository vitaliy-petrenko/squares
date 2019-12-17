import React from 'react'
import Grid from './components/Grid'
import withGridContext from './hoc/withGridContext'

const GridWithContext = withGridContext(Grid)

const App: React.FC = () => {
  return (
    <GridWithContext/>
  )
}

export default App
