from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Task

class TaskAPITestCase(APITestCase):
    # This runs once before all tests (for setup)
    @classmethod
    def setUpTestData(cls):
        # Create a sample task for testing
        cls.task = Task.objects.create(
            title="Learn Testing",
            description="Write tests for the Task API",
            due_date="2024-12-31",
            status=False
        )

    def test_get_all_tasks(self):
        """Test GET /taskss/ to list all tasks."""
        url = reverse('taskss-list')  # URL name from the router
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only 1 task exists (from setUpTestData)

    def test_get_single_task(self):
        """Test GET /taskss/<id>/ to get one task."""
        url = reverse('taskss-detail', args=[self.task.id])  # URL for task detail
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Learn Testing")

    def test_create_task(self):
        """Test POST /taskss/ to create a new task."""
        url = reverse('taskss-list')
        data = {
            "title": "New Task",
            "description": "Another test task",
            "due_date": "2024-06-30",
            "status": True
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)  # Original + new task



    def test_delete_task_via_viewset(self):
        """Test DELETE /taskss/<id>/ (using ViewSet)."""
        url = reverse('taskss-detail', args=[self.task.id])
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)  # Task is deleted

    def test_delete_task_via_custom_view(self):
        """Test DELETE /tasks/<task_id>/ (using TaskDeleteView)."""
        url = reverse('task-delete', args=[self.task.id])
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)

    def test_invalid_task_id(self):
        """Test GET/PUT/DELETE with an invalid task ID."""
        invalid_url = reverse('taskss-detail', args=[999])  # ID 999 doesn't exist
        response_get = self.client.get(invalid_url)
        response_put = self.client.put(invalid_url, {})
        response_delete = self.client.delete(invalid_url)
        
        self.assertEqual(response_get.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response_put.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response_delete.status_code, status.HTTP_404_NOT_FOUND)
