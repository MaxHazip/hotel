from django.urls import path
from hotel_app import views

urlpatterns = [
    path('main_page/', views.main),
    path('services/', views.services),
    path('service_page/<int:service_id>', views.sevPage),
    path('rooms/', views.roomsPage),
    path('room_page/<int:room_id>', views.roomPage),
]