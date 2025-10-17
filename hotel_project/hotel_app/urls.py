from django.urls import path
from hotel_app import views

urlpatterns = [
    path('main_page/', views.main),
]