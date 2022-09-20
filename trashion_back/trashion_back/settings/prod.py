from .base import *
IP = os.environ.get('IP')

# cors문제
ALLOWED_HOSTS = [".trashion.click","localhost",IP]

# aws s3 setting
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# AWS Access
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
# if using boto3
AWS_S3_REGION_NAME = 'ap-northeast-2'  # change to your region
AWS_S3_SIGNATURE_VERSION = 's3v4'
# S3 Save Link
MEDIA_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/'

STATICFILES_DIRS = (os.path.join(BASE_DIR, 'assets'), )
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
        },
    },
}