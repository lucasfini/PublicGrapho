# Generated by Django 3.0.8 on 2021-06-26 22:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0025_chart_graph'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chart',
            name='graph',
        ),
    ]
