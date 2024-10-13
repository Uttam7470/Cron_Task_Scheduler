

// import axios from 'axios';

// // Create a task
// export const createTask = async (task) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/createTask', task);
//     console.log('Task created successfully:', { task, response: response.data });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating task:', { task, error: error.message });
//     throw error; 
//   }
// };

// // Fetch all tasks
// export const getTasks = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/getAllTasks');
//     console.log('Fetched all tasks successfully:', { response: response.data });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching tasks:', { error: error.message });
//     throw error;
//   }
// };

// // Update a task
// export const updateTask = async (id, updates) => {
//   try {
//     const response = await axios.put('http://localhost:3000/api/editTask', { id, ...updates });
//     console.log(`Task ${id} updated successfully:`, { updates, response: response.data });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating task ${id}:`, { updates, error: error.message });
//     throw error;
//   }
// };

// // Delete a task
// export const deleteTask = async (id) => {
//   try {
//     const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`); // Directly using full URL here
//     console.log(`Task ${id} deleted successfully:`, { response: response.data });
//     return response.data; // Handle the response as needed
//   } catch (error) {
//     console.error(`Error deleting task ${id}:`, error.response ? error.response.data : error);
//     throw error; // Re-throw the error to be caught in the component
//   }
// };


import axios from 'axios';

// Set the base URL for Axios
const API_URL = 'http://localhost:3000/api';

// Create a task
export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/createTask`, task);
        console.log('Task created successfully:', { task, response: response.data });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', { task, error: error.message });
        throw error;
    }
};

// Fetch all tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllTasks`);
        console.log('Fetched all tasks successfully:', { response: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', { error: error.message });
        throw error;
    }
};

// Update a task
export const updateTask = async (taskId, updates) => {
    try {
        const response = await axios.put(`${API_URL}/editTask`, { taskId, ...updates });
        console.log(`Task ${taskId} updated successfully:`, { updates, response: response.data });
        return response.data;
    } catch (error) {
        console.error(`Error updating task ${taskId}:`, { updates, error: error.message });
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteTask`, { data: { taskId } }); // Sending taskId in the request body
        console.log(`Task ${taskId} deleted successfully:`, { response: response.data });
        return response.data;
    } catch (error) {
        console.error(`Error deleting task ${taskId}:`, { error: error.message });
        throw error;
    }
};

// Stop a task
export const stopTask = async (taskId) => {
    try {
        const response = await axios.put(`${API_URL}/stopTask`, { taskId });
        console.log(`Task ${taskId} stopped successfully:`, { response: response.data });
        return response.data;
    } catch (error) {
        console.error(`Error stopping task ${taskId}:`, { error: error.message });
        throw error;
    }
};

// Start a task
export const startTask = async (taskId) => {
    try {
        const response = await axios.put(`${API_URL}/startTask`, { taskId });
        console.log(`Task ${taskId} activated successfully:`, { response: response.data });
        return response.data;
    } catch (error) {
        console.error(`Error activating task ${taskId}:`, { error: error.message });
        throw error;
    }
};

// Get a task by ID
export const getTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${API_URL}/getTaskById/${taskId}`);
        console.log(`Fetched task ${taskId} successfully:`, { response: response.data });
        return response.data;
    } catch (error) {
        console.error(`Error fetching task ${taskId}:`, { error: error.message });
        throw error;
    }
};
