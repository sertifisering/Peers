from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from eventapp.models import Event, Athlete, Expert
from eventapp.serializers import AthleteSerializer, EventSerializer, ExpertSerializer

# -------------------------------------------------------------
# Athlete APIs for Events
class AllAtheleteListAPI(APIView):
    # List all athletes across all events
    def get(self, request):
        qs = Athlete.objects.all()
        return Response(AthleteSerializer(qs, many=True).data)
    
    def post(self, request):
        serializer = AthleteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
# Get athletes for a specific event
class GetAthleteByEventAPI(APIView):
    def get(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
        
        athletes = event.athletes.all()
        return Response(AthleteSerializer(athletes, many=True).data)

# Add an athlete to a specific event
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

        return Response(
            AthleteSerializer(athlete).data,
            status=201
        )

# Remove a specific athlete from an event
class AthleteRemoveAPI(APIView):
    # Remove an athlete
    def delete(self, request, eventId, athleteId):
        try:
            athlete = Athlete.objects.get(id=athleteId, events=eventId)
        except Athlete.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        athlete.delete()
        return Response(status=204)
    
# -------------------------------------------------------------
# Experts APIs for Events
class AllExpertListAPI(APIView):
    # List all experts across all events
    def get(self, request):
        qs = Expert.objects.all()
        return Response(ExpertSerializer(qs, many=True).data)
    
    def post(self, request):
        serializer = ExpertSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
# Get experts for a specific event
class GetExpertByEventAPI(APIView):
    def get(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
        
        experts = event.experts.all()
        return Response(ExpertSerializer(experts, many=True).data)

# Add an expert to a specific event
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

        return Response(
            ExpertSerializer(expert).data,
            status=201
        )
    
# Remove a specific expert from an event
class RemoveExpertAPI(APIView):
    # Remove an expert
    def delete(self, request, eventId, expertId):
        try:
            expert = Expert.objects.get(id=expertId, events=eventId)
        except Expert.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        expert.delete()
        return Response(status=204)

# -------------------------------------------------------------
# Event APIs for listing and creating events
class EventListAPI(APIView):
    def get(self, request):
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        # default owner for testing purposes
        default_user = User.objects.get(username="Peers Tester")

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=default_user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# -------------------------------------------------------------
# Finalize Event by adding athletes
class EventDetailAPI(APIView):
    def get(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        return Response(EventSerializer(event).data)

    def put(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        event.delete()
        return Response(status=204)

class EventUpdateFormAPI(APIView):
    def put(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# -------------------------------------------------------------
# Finalize Event API to add athletes in bulk
class EventFinalizeAPI(APIView):
    def post(self, request, eventId):
        try:
            event = Event.objects.get(id=eventId)
        except Event.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        athletes = request.data.get("athletes", [])

        for a in athletes:
            name = a.get("name")
            email = a.get("email", "")

            # 1) Try find existing by email
            ath = None
            if email:
                ath = Athlete.objects.filter(email=email).first()

            # 2) If not found, create new
            if not ath:
                ath = Athlete.objects.create(name=name, email=email)

            # 3) Link to event
            event.athletes.add(ath)

        return Response({"ok": True})