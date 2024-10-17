#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { StageContext } from '../lib/stage-context'
import { synthesizeStacks } from '../lib/stacks'

const app = new cdk.App()
const stageContext = StageContext.getContext(app)

const config = stageContext.config
const caramelizedStageName = stageContext.stage.charAt(0).toUpperCase() + stageContext.stage.slice(1)
const buildStackName = (stackName: string): string => `${caramelizedStageName}${stackName}`

synthesizeStacks(
  app,
  stageContext.stage,
  config,
  buildStackName,
)
