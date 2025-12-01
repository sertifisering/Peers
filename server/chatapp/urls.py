from django.urls import path
from chatapp.views import ChatbotAPI

urlpatterns = [
    path("chat/", ChatbotAPI.as_view(), name="chat"),
]
