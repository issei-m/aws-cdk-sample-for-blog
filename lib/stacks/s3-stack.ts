import * as cdk from 'aws-cdk-lib'
import { RemovalPolicy } from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { Stack, type StackProps } from '../stack'

export class S3Stack extends Stack {
  public readonly publicUserUploadedFilesBucket: cdk.aws_s3.IBucket

  constructor (scope: Construct, id: string, props: StackProps) {
    super(scope, id, props)

    this.publicUserUploadedFilesBucket = new cdk.aws_s3.Bucket(this, 'PublicUserUploadedFilesBucket', {
      bucketName: `${this.prefix}-public-user-uploaded-files`,
      removalPolicy: RemovalPolicy.RETAIN
    })
  }
}
