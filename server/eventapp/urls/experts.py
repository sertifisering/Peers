from django.urls import path
from eventapp.views import AllExpertListAPI,AddExpertAPI, RemoveExpertAPI, GetExpertByEventAPI  

urlpatterns = [
    # All experts list
    path("", AllExpertListAPI.as_view()),
    
    # Get experts for a specific event
    path("<int:eventId>/", GetExpertByEventAPI.as_view()),
    
    # Add expert to event
    path("add/<int:eventId>/", AddExpertAPI.as_view()),
    
    # Remove a specific expert from an event
    path("remove/<int:eventId>/<int:expertId>/", RemoveExpertAPI.as_view()),
]
