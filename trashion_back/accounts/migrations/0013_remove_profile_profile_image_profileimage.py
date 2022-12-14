# Generated by Django 4.0.6 on 2022-09-10 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_profile_profile_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='profile_image',
        ),
        migrations.CreateModel(
            name='ProfileImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_image', models.ImageField(null=True, upload_to='profile')),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile_image', to='accounts.profile')),
            ],
        ),
    ]
