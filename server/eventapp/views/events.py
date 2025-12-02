from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from eventapp.models import Event, Athlete
from eventapp.serializers import EventSerializer


class EventListAPI(APIView):
    def get(self, request):
        queryset = Event.objects.all()
        return Response(EventSerializer(queryset, many=True).data)

    def post(self, request):
        default_user = User.objects.get(username="Peers Tester")
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=default_user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


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

            ath = None
            if email:
                ath = Athlete.objects.filter(email=email).first()

            if not ath:
                ath = Athlete.objects.create(name=name, email=email)

            event.athletes.add(ath)

        return Response({"ok": True})
