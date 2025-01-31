import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Taskdetails.css'

const TaskDetails = () => {
    const { id } = useParams();  // Get task ID from URL
    const [task, setTask] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`)
            .then(response => setTask(response.data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            {task ? (
                <div>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Due Date: {task.due_date}</p>
                    <p>Status: {task.status ? "Completed" : "Pending"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TaskDetails;



