# Generated by Django 4.0.6 on 2022-08-13 05:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('big_category', models.CharField(choices=[('outer', '아우터'), ('dress', '원피스'), ('top', '상의'), ('pants', '바지'), ('skirt', '스커트'), ('shoes', '신발'), ('accessory', '악세사리')], max_length=20)),
                ('small_category', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('feature', models.TextField()),
                ('product_defect', models.TextField()),
                ('size', models.CharField(max_length=6)),
                ('wear_count', models.IntegerField()),
                ('price', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='item_sets', to='item_post.category')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_sets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=10)),
                ('gu', models.CharField(max_length=10)),
                ('dong', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='StylePhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='item_post')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='style_photo_sets', to='item_post.item')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='style_photo_sets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='item_post')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photo_sets', to='item_post.item')),
            ],
        ),
        migrations.CreateModel(
            name='LocationSet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location_sets', to='item_post.item')),
                ('location_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location_sets', to='item_post.location')),
            ],
        ),
    ]