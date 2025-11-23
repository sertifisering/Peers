from django.urls import path
from .views.event_views import EventListAPI, EventDetailAPI

urlpatterns = [
    path("", EventListAPI.as_view()),
    path("<int:event_id>/", EventDetailAPI.as_view()),
]
