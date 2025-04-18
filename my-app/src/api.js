// src/api.js
import axios from 'axios';

const apiUrl = 'https://todolist-11db7-default-rtdb.firebaseio.com/'; // Firebase Realtime DB URL

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${apiUrl}/tasks.json`, task);
    return { id: response.data.name, ...task }; // Firebase assigns an ID which is in the response
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Update an existing task
export const updateTask = async (taskId, updatedTask) => {
  try {
    await axios.put(`${apiUrl}/tasks/${taskId}.json`, updatedTask); // PUT request to update a task
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Delete a task
export const softDeleteTask = async (taskId) => {
  try {
    const response = await axios.patch(`${apiUrl}/tasks/${taskId}.json`, {
      isDeleted: true,
      deletedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    throw error;
  }

};

