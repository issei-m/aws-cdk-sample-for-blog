import { type Stage, type Configuration } from './stage-context'

export const configs: Record<Stage, Configuration> = {
  prod: {
    applicationFunctionMemorySize: 1024,
  },
  dev: {
    applicationFunctionMemorySize: 128,
  }
}
