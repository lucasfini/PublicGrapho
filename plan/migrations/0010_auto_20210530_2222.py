# Generated by Django 3.0.8 on 2021-05-30 22:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0009_auto_20210530_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='chart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plan.Chart'),
        ),
    ]
