# Generated by Django 4.0.6 on 2022-08-16 04:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationship', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='follow',
            old_name='followed_id',
            new_name='followed',
        ),
        migrations.RenameField(
            model_name='follow',
            old_name='follower_id',
            new_name='follower',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='like_item_id',
            new_name='likeitem',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='like_user_id',
            new_name='likeuser',
        ),
    ]