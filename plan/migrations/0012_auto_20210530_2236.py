# Generated by Django 3.0.8 on 2021-05-30 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0011_remove_userprofile_chart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='description',
            field=models.CharField(default='', max_length=100),
        ),
    ]