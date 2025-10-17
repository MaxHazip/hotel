from django.shortcuts import render
from datetime import datetime

# Create your views here.
def main(request):

    today = datetime.now()

    context = {
        'today': today,
    }

    return render(request, 'main_content.html', context)