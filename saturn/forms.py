from django import forms
from sandbox.models import DummyUser


class UsernameForm(forms.ModelForm):
    class Meta:
        model = DummyUser
        fields = ['username']
