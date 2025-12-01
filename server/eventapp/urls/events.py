from django.urls import path
from eventapp.views import EventListAPI, EventDetailAPI, EventUpdateFormAPI

urlpatterns = [
    # Event endpoints
    path("", EventListAPI.as_view()),
    path("<int:eventId>/", EventDetailAPI.as_view()),
    
    # Update event form data
    path("update/<int:eventId>/", EventUpdateFormAPI.as_view()),
]
