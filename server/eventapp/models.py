from django.db import models
from django.contrib.auth.models import User

# -------------------------------------------------------------
# Athlete model
class Athlete(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name

# -------------------------------------------------------------
# Expert model
class Expert(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name

# -------------------------------------------------------------
# Event model
class Event(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("pending", "Pending"),
        ("open", "Open"),
        ("live", "Live"),
        ("completed", "Completed"),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    # Basic info
    name = models.CharField(max_length=150)
    sport = models.CharField(max_length=50)
    format = models.CharField(max_length=50)
    location = models.CharField(max_length=150, blank=True)
    
    # Dates & Times
    date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    # Additional fields
    image_url = models.TextField(null=True, blank=True)
    organizer = models.CharField(max_length=100, blank=True)
    contact_email = models.EmailField(blank=True)
    capacity = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    
    # Judging and template fields
    judging = models.JSONField(default=dict, blank=True)
    template = models.JSONField(default=dict, blank=True)

    # System fields
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    is_paid = models.BooleanField(default=False)
    event_code = models.CharField(max_length=20, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    # Relationships
    athletes = models.ManyToManyField(Athlete, related_name="events", blank=True)
    experts = models.ManyToManyField(Expert, related_name="events", blank=True)

    def __str__(self):
        return self.name

# -------------------------------------------------------------
# Sponsor model
class Sponsor(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="sponsors")
    name = models.CharField(max_length=100)
    label = models.CharField(max_length=50)
    website = models.CharField(max_length=200, blank=True)
    logo_url = models.TextField(null=True, blank=True)