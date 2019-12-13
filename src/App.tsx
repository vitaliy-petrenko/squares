import React, { useEffect, useState } from 'react'
import Grid from './components/Grid'
import { calculateGridSize } from './helpers/grid'
import { runScenario } from './helpers/scenario'

const calculateGrid = () => calculateGridSize()

const App: React.FC = ({ children }) => {
  const
    [grid, setGrid] = useState(calculateGrid()),
    reCalc = () => setGrid(calculateGrid())

  useEffect(() => {
    window.addEventListener('resize', reCalc)

    return () => window.removeEventListener('resize', reCalc)
  })

  return (
    <Grid columns={grid.columns} rows={grid.rows}/>
  )
}

export default App

runScenario([
  { delay: 0, value: 10 },
  { delay: 1000, value: 10 },
  { delay: 1000, value: 'aDS' },
  { delay: 1000, value: 10 },
  { delay: 1000, value: 10 },
], console.log)

