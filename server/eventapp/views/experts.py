from rest_framework.views import APIView
from rest_framework.response import Response
from eventapp.models import Event, Expert
from eventapp.serializers import ExpertSerializer


class AllExpertListAPI(APIView):
    def get(self, request):
        qs = Expert.objects.all()
        return Response(ExpertSerializer(qs, many=True).data)

    def post(self, request):
        serializer = ExpertSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class GetExpertByEventAPI(APIView):
    def get(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
        
        experts = event.experts.all()
        return Response(ExpertSerializer(experts, many=True).data)


class AddExpertAPI(APIView):
    def post(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)

        name = request.data.get("name", "")
        email = request.data.get("email", "")

        expert = Expert.objects.create(name=name, email=email)
        event.experts.add(expert)

        return Response(ExpertSerializer(expert).data, status=201)


class RemoveExpertAPI(APIView):
    def delete(self, request, eventId, expertId):
        try:
            expert = Expert.objects.get(id=expertId, events=eventId)
        except Expert.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        expert.delete()
        return Response(status=204)
