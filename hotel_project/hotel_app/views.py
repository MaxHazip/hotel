from django.shortcuts import render
from datetime import datetime, timedelta

# Create your views here.
def main(request):

    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    today_str = today.strftime('%m.%d.%Y')
    tomorrow_str = tomorrow.strftime('%m.%d.%Y')

    context = {
        'today': today_str,
        'tomorrow': tomorrow_str,
    }

    return render(request, 'main_content.html', context)