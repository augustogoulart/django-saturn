from django.db import models


class DummyUser(models.Model):
    username = models.CharField(max_length=255)

    def __str__(self):
        return self.username
