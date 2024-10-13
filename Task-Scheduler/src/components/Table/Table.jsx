import React, { useEffect, useState } from 'react';
import './Table.css';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { getTasks, updateTask, deleteTask } from "../../utils/api";

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks
  async function fetchData() {
    setLoading(true);
    try {
      const res = await getTasks();
      console.log("response from getAllTasks", res);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Delete task
  async function deleteData(id) {
    try {
      await deleteTask(id);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.log(error);
    }
  }

  // Edit task (you should pass the necessary updates as a second parameter)
  async function editData(id) {
    try {
      await updateTask(id, { status: 'updated' });
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.log(error);
    }
  }

  // Activate task
  async function activateTask(id) {
    try {
      await updateTask(id, { status: 'active' });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  // Deactivate task
  async function deactivateTask(id) {
    try {
      await updateTask(id, { status: 'inactive' });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  // Load tasks on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle action select change
  const handleActionChange = (id) => (e) => {
    const action = e.target.value;
    switch (action) {
      case 'edit':
        editData(id);
        break;
      case 'delete':
        deleteData(id);
        break;
      case 'activate':
        activateTask(id);
        break;
      case 'deactivate':
        deactivateTask(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Schedule</th>
            <th>Success count</th>
            <th>Error count</th>
            <th>Last success</th>
            <th>Last error</th>
            <th>Status</th>
            <th>Retries</th>
            <th>Status Icon</th>
            <th>Next</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12">Loading...</td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr key={item.taskId}>
                <td>{item.taskId}</td>
                <td>{item.name}</td>
                <td>{item.schedule}</td>
                <td>{item.successCount}</td>
                <td>{item.errorCount}</td>
                <td>{item.lastSuccess}</td>
                <td>{item.lastError}</td>
                <td>{item.status ? 'active' : 'stopped'}</td>
                <td>{item.retries}</td>
                <td>{item.status ? <TiTick /> : <ImCross />}</td>
                <td>{item.next}</td>
                <td>
                  <label htmlFor={`action-select-${item.taskId}`}>Action:</label>
                  <select id={`action-select-${item.taskId}`} onChange={handleActionChange(item.taskId)}>
                    <option value="">Select Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="activate">Activate</option>
                    <option value="deactivate">Deactivate</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
