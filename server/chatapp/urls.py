from django.urls import path
from .views.chat_views import ChatbotAPI

urlpatterns = [
    path("chat/", ChatbotAPI.as_view(), name="chat"),
]
