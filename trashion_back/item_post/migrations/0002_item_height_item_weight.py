# Generated by Django 4.0.6 on 2022-08-16 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item_post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='height',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=4),
        ),
        migrations.AddField(
            model_name='item',
            name='weight',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=4),
        ),
    ]