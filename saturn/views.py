from django.shortcuts import render


def home(request):
    return render(request, 'saturn/index.html')
