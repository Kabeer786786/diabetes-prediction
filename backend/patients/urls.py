from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.get_all_patients),
    path('patients/create/', views.create_patient),
    path('patients/<int:pk>/', views.get_patient),
    path('patients/<int:pk>/update/', views.update_patient),
    path('patients/<int:pk>/delete/', views.delete_patient),
]