# Generated by Django 3.0.8 on 2021-05-27 22:28

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
            name='MenuItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.ImageField(upload_to='images/')),
                ('title', models.CharField(default='', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(default='', max_length=100)),
                ('city', models.CharField(default='', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('graphid', models.CharField(max_length=32)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('xaxistitle', models.CharField(blank=True, max_length=255, null=True)),
                ('yaxistitle', models.CharField(blank=True, max_length=255, null=True)),
                ('borderwidth', models.IntegerField(blank=True, max_length=2, null=True)),
                ('hoverborderwidth', models.IntegerField(blank=True, max_length=255, null=True)),
                ('backgroundcolor', models.CharField(blank=True, max_length=255, null=True)),
                ('bordercolor', models.CharField(blank=True, max_length=255, null=True)),
                ('hoverbordercolor', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
