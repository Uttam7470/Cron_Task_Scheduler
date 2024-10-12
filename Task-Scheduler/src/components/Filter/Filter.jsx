import React, { useState } from 'react';
import './Filter.css';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import {createTask} from '../../utils/api'
function Filter() {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [taskData, setTaskData] = useState({
    name: '',
    email: '',
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  }); // State to hold form data

  // Function to handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle task creation
  async function create() {
    const cronExpression = `${taskData.minute} ${taskData.hour} ${taskData.dayOfMonth} ${taskData.month} ${taskData.dayOfWeek}`;
    const newTask={
      name:taskData.name,
      schedule:cronExpression,
      email:taskData.email,
      message:"This is a sheduled task for the email Sender",
      expiration:"" 
      }
    
    const res = await createTask(newTask);
    if (res.ok) {
      // Reset the form data and close the form after submission
      setTaskData({
        name: '',
        email: '',
        minute: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
      });
      setShowForm(false); // Close form after submission
    }
  }

  return (
    <>
    <div className="second">
      <div className="filter">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="task">
          <div className="sort" style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0.5rem"}}    ><IoFilterSharp /> Filter</div>
          <div className="create">
            <button onClick={() => setShowForm(true)}>+ Create</button>
          </div>
          <div className="export" style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0.5rem"}}><FaCloudDownloadAlt /> Export</div>
        </div>
      </div>

      {/* Conditional rendering for the form */}
      {showForm && (
        <div className="form">
          <h3>Create Task</h3>
          <label>Name:
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={taskData.name}
            onChange={handleInputChange}
          />
          </label>

          <label>Email:
          <input
            type="email"
            name="email"
            placeholder="Notification Email"
            value={taskData.email}
            onChange={handleInputChange}
          />
          </label>

            <label>Minute (0-59):
            <input
              type="text"
              name="minute"
              placeholder="*"
              value={taskData.minute}
              onChange={handleInputChange}
            />
            </label>

            <label>Hour (0-23):
            <input
              type="text"
              name="hour"
              placeholder="*"
              value={taskData.hour}
              onChange={handleInputChange}
            />
            </label>

            <label>Day of Month (1-31):
            <input
              type="text"
              name="dayOfMonth"
              placeholder="*"
              value={taskData.dayOfMonth}
              onChange={handleInputChange}
            />
            </label>

            <label>Month (1-12):
            <input
              type="text"
              name="month"
              placeholder="*"
              value={taskData.month}
              onChange={handleInputChange}
            />
            </label>
            <label>Day of Week (0-6, Sun-Sat):
            <input
              type="text"
              name="dayOfWeek"
              placeholder="*"
              value={taskData.dayOfWeek}
              onChange={handleInputChange}
            />
            </label>     

          <button className='submit' onClick={create}>Submit</button>
          <button className='close' onClick={() => setShowForm(false)}>Close X</button>
        </div>
      )}
      </div>
    </>
  );
}

export default Filter;
