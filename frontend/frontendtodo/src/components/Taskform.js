
// export default TaskForm;
import React, { useState } from 'react';
import axios from 'axios';
import './Taskform.css'

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/tasks/', {
        title,
        description,
        due_date: dueDate,
        status: false,
      })
      .then((response) => {
        console.log('Task added:', response.data);
        // Reset form fields after successful submission
        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm; 


