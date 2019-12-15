export type TScenarioValue = any | Function
export type TScenario = { delay?: number, value: TScenarioValue }

export const delay = (ms: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

export const makeScenario = (scenarios: TScenario[]) => ({
  [Symbol.asyncIterator]: async function* () {
    for (let i = 0; i < scenarios.length; i++) {
      const { delay: sceneDelay, value } = scenarios[i]

      if (sceneDelay) {
        await delay(sceneDelay)
      }

      yield typeof value === 'function' ? value() : value
    }
  }
})

export const runScenario = async <T>(scenes: TScenario[], process: (item: T) => boolean) => {
  const scenario = makeScenario(scenes)

  for await (const item of scenario) {
    const breakScenario = process(item)
    if (breakScenario) break
  }
}
