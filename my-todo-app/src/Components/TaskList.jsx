import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import './rating.css';
import './clock.css';
import RangeSlider from './RangeSlider';
import { filterTasks, sortTasksByPriority } from '../utils/taskUtils';

const TaskList = ({ tasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-2-dwo5.onrender.com/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditSubmit = async (taskId) => {
    try {
      await axios.put(`https://task-2-dwo5.onrender.com/api/tasks/${taskId}`, {
        title: editValue
      });

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, title: editValue } : task
        )
      );

      setEditIndex(-1);
      setEditValue('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-2-dwo5.onrender.com/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSliderChange = async (taskId, newValue) => {
    try {
      // Send update to backend
      await axios.put(`https://task-2-dwo5.onrender.com/api/tasks/${taskId}`, {
        scrollValue: newValue
      });

      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, scrollValue: newValue } : task
        )
      );
    } catch (error) {
      console.error('Error updating slider value:', error);
    }
  };

  const sortedTasks = sortTasksByPriority(tasks);
  const filteredTasks = filterTasks(sortedTasks, searchTerm);

  return (
    <section className="list">
      <h2>Tasks</h2>

      <div className="searchbox">
        <div className="search">
          <div className="icon" onClick={() => document.querySelector('.search').classList.toggle('active')}></div>
          <div className="innput">
            <input
              type="text"
              placeholder="search"
              id="mysearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="clear" onClick={() => setSearchTerm('')}></span>
        </div>
      </div>

      <div id="tasks">
        {filteredTasks.map((task, index) => (
          <div key={task.id} className="task">
            {editIndex === index ? (
              <div className="edit-task">
                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              </div>
            ) : (
              <div className="content">
                <input
                  type="text"
                  className="text"
                  value={`${task.title} (Priority: ${task.priority})`}
                  readOnly
                />
              </div>
            )}
            <div className="actions">
              {editIndex === index ? (
                <button className="edit" onClick={() => handleEditSubmit(task.id)}>
                  Save
                </button>
              ) : (
                <button
                  className="edit"
                  onClick={() => {
                    setEditIndex(index);
                    setEditValue(task.title);
                  }}
                >
                  Edit
                </button>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>

            {/* ✅ RangeSlider added per task with independent value and handler */}
            <RangeSlider
              value={task.scrollValue || 0}
              onChange={(e) => handleSliderChange(task.id, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
