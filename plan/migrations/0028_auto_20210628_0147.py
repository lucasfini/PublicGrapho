# Generated by Django 3.0.8 on 2021-06-28 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0027_auto_20210628_0122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chart',
            name='graphid',
            field=models.CharField(max_length=32),
        ),
    ]