import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import TaskForm from './Taskform';
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';




// Mock axios to prevent real API calls during testing
jest.mock('axios');

describe('TaskForm Component', () => {
  test('renders all form elements', () => {
    // Render the component
    render(<TaskForm />);
    
    // Check if form inputs are present
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /date/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('allows users to fill and submit the form', async () => {
    // Render the component
    render(<TaskForm />);
    
    // Mock axios post request
    axios.post.mockResolvedValueOnce({ data: {} });

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Task Description' },
    });
    fireEvent.change(screen.getByLabelText('Due Date'), {
      target: { value: '2024-06-30' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Verify axios was called with correct data
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/tasks/', {
      title: 'New Task',
      description: 'Task Description',
      due_date: '2024-06-30',
      status: false,
    });
  });
});