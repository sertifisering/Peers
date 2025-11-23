from django.db import models

# Create user model
class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.email

# Create basic event model
class Event(models.Model):
    owner = models.ForeignKey("User", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    sport = models.CharField(max_length=50)
    start_date = models.DateField(null=True)
    athletes = models.IntegerField(default=0)

    def __str__(self):
        return self.name
