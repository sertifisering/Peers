from rest_framework.views import APIView
from rest_framework.response import Response
from eventapp.models import Event, Athlete
from eventapp.serializers import AthleteSerializer


class AllAtheleteListAPI(APIView):
    def get(self, request):
        qs = Athlete.objects.all()
        return Response(AthleteSerializer(qs, many=True).data)

    def post(self, request):
        serializer = AthleteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class GetAthleteByEventAPI(APIView):
    def get(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
        
        athletes = event.athletes.all()
        return Response(AthleteSerializer(athletes, many=True).data)


class AddAthleteAPI(APIView):
    def post(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)

        name = request.data.get("name", "")
        email = request.data.get("email", "")

        athlete = Athlete.objects.create(name=name, email=email)
        event.athletes.add(athlete)

        return Response(AthleteSerializer(athlete).data, status=201)


class AthleteRemoveAPI(APIView):
    def delete(self, request, eventId, athleteId):
        try:
            athlete = Athlete.objects.get(id=athleteId, events=eventId)
        except Athlete.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        athlete.delete()
        return Response(status=204)
