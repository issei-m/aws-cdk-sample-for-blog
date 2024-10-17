import { configs as availableConfigs } from './configs'
import { type IConstruct } from 'constructs/lib/construct'

export interface Configuration {
  applicationFunctionMemorySize: number
}

export type Stage = 'dev' | 'prod'

export class StageContext {
  public readonly stage: Stage
  public readonly config: Configuration
  private static instance: StageContext

  private constructor (stage: Stage, config: Configuration) {
    this.stage = stage
    this.config = config
  }

  public static getContext (construct: IConstruct): StageContext {
    if (StageContext.instance === undefined) {
      const stage = construct.node.tryGetContext('stage')
      if (stage === undefined) {
        throw new Error('The context [stage] must be provided, forgot to specify "--context stage=XXX" option?')
      }

      const config = availableConfigs[stage as Stage]
      if (config === undefined) {
        throw new Error(`The env "${stage as string}" is not available, it must be either of [${Object.keys(availableConfigs).join(', ')}]`)
      }

      StageContext.instance = new StageContext(stage as Stage, config)
    }

    return StageContext.instance
  }
}
