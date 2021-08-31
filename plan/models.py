from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.core.validators import MaxValueValidator
# Create your models here.


class MenuItems(models.Model):
    picture = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=20, default='')

    def __str__(self):
        return str(self.pk)




class UserProfile(models.Model):
    user = models.OneToOneField(User,  on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=100, default='')
    city = models.CharField(default='', max_length=20)

    def __str__(self):
        return str(self.user.username)


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user=kwargs['instance'])


post_save.connect(create_profile, sender=User)


class Chart(models.Model):

    # All Chart Properties

    userid = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=32, default="Graph")
    graphid = models.CharField(max_length=32, unique=True)
    data = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.title
