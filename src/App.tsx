import React, { useEffect } from 'react'
import Grid from './components/Grid'
import { runScenario } from './helpers/scenario'

const App: React.FC = () => {
  useEffect(() => {
    console.log('something happends')
  })

  return (
    <Grid/>
  )
}

export default App

const run = async () => {
  await runScenario([
    { delay: 1000, value: () => 'function' },
    { delay: 1000, value: 2 },
    { delay: 1000, value: 3 },
    { delay: 1000, value: 4 },
    { delay: 1000, value: () => 'function' },
  ], value => {
    console.log(value)

    return false
  })
}

run().then(() => {
  console.log('finally')
})

