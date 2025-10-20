from django.shortcuts import render
from datetime import date, timedelta

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