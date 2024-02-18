import boto3
from module.get_env import *

bucket_name = "www.foodcoming.store"
s3 = boto3.client(
    's3',
    aws_access_key_id = aws_access_key,
    aws_secret_access_key = aws_secret_access_key,
    region_name ='ap-northeast-1')


def uploadToS3(file, bucket_name, object_name):
    s3.upload_fileobj(file, bucket_name, object_name)