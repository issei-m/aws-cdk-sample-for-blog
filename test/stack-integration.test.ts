import * as cdk from 'aws-cdk-lib'
import { synthesizeStacks } from '../lib/stacks'
import { Template } from 'aws-cdk-lib/assertions'

describe('Stack integration testing', () => {
  const app = new cdk.App()

  const stacks = synthesizeStacks(
    app,
    'test',
    {
      applicationFunctionMemorySize: 1024,
    },
    (baseName: string) => `Test${baseName}`,
  )

  describe('S3Stack', () => {
    test('synthesizes the way we expect', () => {
      expect(Template.fromStack(stacks.s3Stack)).toMatchSnapshot()
    })
  })

  describe('ApplicationStack', () => {
    test('synthesizes the way we expect', () => {
      expect(Template.fromStack(stacks.applicationStack)).toMatchSnapshot()
    })
  })
})
