from django.db import models


class TheModel(models.Model):
    field = models.CharField(max_length=255)
