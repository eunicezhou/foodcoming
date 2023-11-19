import boto3

bucket_name = "www.foodcoming.store"
s3 = boto3.client(
    's3',
    aws_access_key_id='AKIAWSBWBJWOJ2REXOHL',
    aws_secret_access_key='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',
    region_name='ap-northeast-1')


def uploadToS3(file, bucket_name, object_name):
    s3.upload_fileobj(file, bucket_name, object_name)