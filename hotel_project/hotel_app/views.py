from django.shortcuts import render

# Create your views here.
from .models import Clients

def dd(requset):
    Clients.objects.all().delete