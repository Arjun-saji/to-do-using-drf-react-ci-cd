from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDeleteView(APIView):
    def delete(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
# Create your views here.
