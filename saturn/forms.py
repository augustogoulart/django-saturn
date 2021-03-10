from django import forms
from .models import DummyUser


class UsernameForm(forms.ModelForm):
    class Meta:
        model = DummyUser
        fields = ['name']
