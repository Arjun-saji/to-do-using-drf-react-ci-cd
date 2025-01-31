from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    status = models.BooleanField(default=False)  # False for incomplete, True for complete

    def __str__(self):
        return self.title
