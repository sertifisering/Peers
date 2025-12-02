from .events import urlpatterns as event_urls
from .athletes import urlpatterns as athlete_urls
from .experts import urlpatterns as expert_urls

urlpatterns = [
    *event_urls,
    *athlete_urls,
    *expert_urls,
]
