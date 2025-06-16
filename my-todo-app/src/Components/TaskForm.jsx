import React, { useState } from 'react';
import axios from 'axios';


const TaskForm = ({ fetchTasks, setTasks }) => {

  const [task, setTask] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [scrollValue, setScrollValue] = useState(0);
const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedRating === null) {
    alert('Please select a rating before adding the task.');
    return;
  }

  try {
    await axios.post('https://task-2-dwo5.onrender.com/api/tasks', {
      title: task,
      priority: selectedRating
    });

    await fetchTasks(); 
    setTask('');
    setSelectedRating(null);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

  return (
    <form id="form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="inputt"
        placeholder="What do you have planned?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="box">
        <p>Priority of your task</p>
        <div className="rating">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <input
                type="radio"
                name="rating"
                id={`rate${10 - i}`}
                value={10 - i}
                checked={selectedRating === 10 - i}
                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
              />
              <label htmlFor={`rate${10 - i}`}>{10 - i}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="submittt">
        <input type="submit" id="submitt" value="ADD TASK" style={{ marginTop: '1px' }} />
      </div>
    </form>
  );
};

export default TaskForm;
