from re import S
from rest_framework import fields, serializers
from plan.models import Chart


class chartserialize(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = '__all__'
