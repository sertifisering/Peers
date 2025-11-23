from .models import Event

def get_user_all_events():
    return Event.objects.all()
