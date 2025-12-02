from rest_framework import serializers
from eventapp.models import Athlete, Expert, Event

# Serializers for Athlete
class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete
        fields = [ 'id', 'name', 'email' ]

# Serializers for Expert        
class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = [ 'id', 'name', 'email' ]

# Serializers for Event
class EventSerializer(serializers.ModelSerializer):
    athletes = AthleteSerializer(many=True, read_only=True)
    experts = ExpertSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = "__all__"
