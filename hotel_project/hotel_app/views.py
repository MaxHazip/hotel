from django.shortcuts import render, get_object_or_404
from datetime import date, timedelta
from .models import *

# Create your views here.
def main(request):

    today = date.today()
    tomorrow = (today + timedelta(days=1)).isoformat()
    today = today.isoformat()

    context = {
        'today': today,
        'tomorrow': tomorrow,
    }

    return render(request, 'main_content.html', context)

def services(request):

    services = Services.objects.all()

    context = {
        'services': services
    }

    return render(request, 'services.html', context)

def sevPage(request, service_id: int):

    service = get_object_or_404(Services, id=service_id)


    context = {
        'service': service,
    }

    return render(request, 'service-page.html', context)

def roomsPage(request):

    context = {

    }

    return render(request, 'rooms.html', context)