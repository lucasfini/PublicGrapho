# Generated by Django 3.0.8 on 2021-05-28 03:08

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plan', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chart',
            name='user',
        ),
        migrations.AlterField(
            model_name='chart',
            name='borderwidth',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(99)]),
        ),
        migrations.AlterField(
            model_name='chart',
            name='hoverborderwidth',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(99)]),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_created', to=settings.AUTH_USER_MODEL),
        ),
    ]