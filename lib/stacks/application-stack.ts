import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { StackProps, Stack } from '../stack'

export interface ApplicationStackProps extends StackProps {
  publicUserUploadedFilesBucket: cdk.aws_s3.IBucket
  functionMemorySize: number
}

export class ApplicationStack extends Stack {
  constructor (scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props)

    const myHandlerFuncRole = new cdk.aws_iam.Role(this, 'ApplicationFunctionRole', {
      roleName: `${this.prefix}-application-function-role`,
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com')
    })
    myHandlerFuncRole.addManagedPolicy(cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'))
    new cdk.aws_lambda.Function(this, 'ApplicationFunction', {
      role: myHandlerFuncRole,
      code: cdk.aws_lambda.Code.fromInline(`
import os

def handler(event, context):
    return { 'bucket': os.environ['BUCKET_NAME'] }
`.trim()),
      handler: 'index.handler',
      architecture: cdk.aws_lambda.Architecture.ARM_64,
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
      functionName: `${this.prefix}-application`,
      memorySize: props.functionMemorySize,
      environment: {
        BUCKET_NAME: props.publicUserUploadedFilesBucket.bucketName,
      }
    })
  }
}
