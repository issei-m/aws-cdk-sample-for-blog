import * as cdk from 'aws-cdk-lib'
import {Configuration, Stage} from '../stage-context'
import { S3Stack } from './s3-stack'
import { ApplicationStack } from './application-stack'

export interface Stacks {
  s3Stack: S3Stack
  applicationStack: ApplicationStack
}

export function synthesizeStacks (
  app: cdk.App,
  resourceNamePrefix: string,
  config: Configuration,
  buildStackName: (baseName: string) => string,
): Stacks {
  const baseStackProps = {
    resourceNamePrefix: resourceNamePrefix,
  }

  const s3Stack = new S3Stack(app, buildStackName('S3'), {
    ...baseStackProps,
  })

  const applicationStack = new ApplicationStack(app, buildStackName('Application'), {
    ...baseStackProps,
    publicUserUploadedFilesBucket: s3Stack.publicUserUploadedFilesBucket,
    functionMemorySize: config.applicationFunctionMemorySize,
  })

  return {
    s3Stack,
    applicationStack,
  }
}
