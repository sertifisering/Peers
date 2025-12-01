from django.urls import path
from eventapp.views import AddAthleteAPI, AthleteRemoveAPI, AllAtheleteListAPI, GetAthleteByEventAPI

urlpatterns = [
    # All athletes list
    path("", AllAtheleteListAPI.as_view()),
    
    # Get athletes for a specific event
    path("<int:eventId>/", GetAthleteByEventAPI.as_view()),
    
    # Add athlete to event
    path("add/<int:eventId>/", AddAthleteAPI.as_view()),
    
    # Remove a specific athlete from an event
    path("remove/<int:eventId>/<int:athleteId>/", AthleteRemoveAPI.as_view()),
]
