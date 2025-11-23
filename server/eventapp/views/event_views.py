# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from eventapp.serializers import EventSerializer
from eventapp.models import Event

# View to get list of events filtered by owner
class EventListAPI(APIView):
    def get(self, request):
        owner_id = request.GET.get("owner")  # optional
        queryset = Event.objects.all()

        if owner_id:
            queryset = queryset.filter(owner_id=owner_id)

        return Response(EventSerializer(queryset, many=True).data)


# View to get event details by ID
class EventDetailAPI(APIView):
    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            return Response(EventSerializer(event).data)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=404)
