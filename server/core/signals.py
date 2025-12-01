from django.db.models.signals import post_migrate
from django.contrib.auth.models import User
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_user(sender, **kwargs):
    if sender.name == "eventapp":
        if not User.objects.filter(username="Peers Tester").exists():
            User.objects.create_user(
                username="Peers Tester",
                password="1234",
                email="peers@test.com",
            )
