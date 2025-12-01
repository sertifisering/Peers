from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),
    
    # API Endpoints for athletes
    path("api/athletes/", include("eventapp.urls.athletes")),
    
    # API Endpoints for experts
    path("api/experts/", include("eventapp.urls.experts")),
    
    # API Endpoints for event
    path("api/events/", include("eventapp.urls")),
    
    # API Endpoints for chat
    path("api/chats/", include("chatapp.urls")),
]

