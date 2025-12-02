from rest_framework.views import APIView
from rest_framework.response import Response
from chatapp.service import LLMService

class ChatbotAPI(APIView):
    def post(self, request):
        user_message = request.data.get("message")

        if not user_message:
            return Response({"error": "Message is required"}, status=400)

        # Get reply from LLM service
        reply = LLMService.ask_llm(user_message)

        return Response({
            "message": user_message,
            "reply": reply,
        })
