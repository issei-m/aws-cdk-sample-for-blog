import { Stack as BaseStack, type StackProps as BaseStackProps } from 'aws-cdk-lib'
import type { Construct } from 'constructs'

export interface StackProps extends BaseStackProps {
  resourceNamePrefix: string
}

export class Stack extends BaseStack {
  protected readonly prefix: string

  constructor (scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    this.prefix = props.resourceNamePrefix
  }
}
