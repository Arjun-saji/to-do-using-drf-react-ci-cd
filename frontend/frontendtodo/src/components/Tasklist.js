
// export default TaskList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasklist.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tasks/')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Function to delete a task
  const handleDelete = (taskId) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      axios
        .delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`)
        .then((response) => {
          console.log('Task deleted:', response.data);
          // Update the state to remove the deleted task
          setTasks(tasks.filter(task => task.id !== taskId));
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  };

  return (
    <div className='container'>
      <h3 className='heading-h3'>Task To Accomplish</h3>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <h4 className='title'>{task.title}</h4>
          <p className='descprition'>{task.description}</p>
          <p className='duedate'>Due Date: {task.due_date}</p>
          <p className='status'>Status: {task.status ? 'Completed' : 'Pending'}</p>
          {/* Add Delete button for each task */}
          <button className='button-delete' onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;





