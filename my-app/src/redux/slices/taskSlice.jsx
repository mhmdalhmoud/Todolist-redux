// // src/redux/slices/taskSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { fetchTasks, createTask, updateTask, deleteTask } from '../../api'; // Import the API functions

// const initialState = {
//   tasks: [],
//   status: 'idle', // Could be 'loading', 'succeeded', 'failed'
//   error: null,
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     setTasks: (state, action) => {
//       state.tasks = action.payload;
//     },
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//     },
//     removeTask: (state, action) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },
//     updateTaskInStore: (state, action) => {
//       const index = state.tasks.findIndex((task) => task.id === action.payload.id);
//       if (index !== -1) {
//         state.tasks[index] = action.payload;
//       }
//     },
//   },
// });

// export const { setTasks, addTask, removeTask, updateTaskInStore } = taskSlice.actions;

// export const fetchTasksAsync = () => async (dispatch) => {
//   try {
//     const tasks = await fetchTasks();
//     const formattedTasks = Object.keys(tasks || {}).map((key) => ({
//       id: key,
//       ...tasks[key],
//     }));
//     dispatch(setTasks(formattedTasks));
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//   }
// };

// export const createTaskAsync = (task) => async (dispatch) => {
//   try {
//     const newTask = await createTask(task);
//     dispatch(addTask(newTask));
//   } catch (error) {
//     console.error('Error creating task:', error);
//   }
// };

// export const updateTaskAsync = (taskId, updatedTask) => async (dispatch) => {
//   try {
//     await updateTask(taskId, updatedTask);
//     dispatch(updateTaskInStore(updatedTask));
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };

// export const deleteTaskAsync = (taskId) => async (dispatch) => {
//   try {
//     await deleteTask(taskId);
//     dispatch(removeTask(taskId));
//   } catch (error) {
//     console.error('Error deleting task:', error);
//   }
// };

// export default taskSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, softDeleteTask } from '../../api'; // 🟢 changed: import softDeleteTask

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskInStore: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setTasks, addTask, removeTask, updateTaskInStore } = taskSlice.actions;

// 🟢 updated: filters out tasks where isDeleted is true
export const fetchTasksAsync = () => async (dispatch) => {
  try {
    const tasks = await fetchTasks();
    const formattedTasks = Object.keys(tasks || {}).map((key) => ({
      id: key,
      ...tasks[key],
    }));

    const activeTasks = formattedTasks.filter((task) => task.isDeleted !== true);
    dispatch(setTasks(activeTasks));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const createTaskAsync = (task) => async (dispatch) => {
  try {
    const newTask = await createTask(task);
    dispatch(addTask(newTask));
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

export const updateTaskAsync = (taskId, updatedTask) => async (dispatch) => {
  try {
    await updateTask(taskId, updatedTask);
    dispatch(updateTaskInStore(updatedTask));
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// 🟢 updated: soft delete instead of removing
export const deleteTaskAsync = (taskId) => async (dispatch) => {
  try {
    await softDeleteTask(taskId); // soft delete in Firebase
    dispatch(removeTask(taskId)); // remove from Redux so UI hides it instantly
  } catch (error) {
    console.error('Error soft deleting task:', error);
  }
};



export default taskSlice.reducer;
