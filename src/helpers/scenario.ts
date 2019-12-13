export type TScenario = { delay?: number, value: any }

export const delay = (ms: number) => {
  return new Promise(function (resolve, reject) {
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

      yield value
    }
  }
})

export const runScenario = async <T>(scenes: TScenario[], process: (item: T) => any) => {
  const scenario = makeScenario(scenes)

  for await (const item of scenario) {
    process(item)
  }
}
