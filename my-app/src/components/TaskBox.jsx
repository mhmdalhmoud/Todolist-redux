import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createTaskAsync } from '../redux/slices/taskSlice'; // 👈 import your thunk

const TaskBox = () => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Work'); // Add state for category

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      taskName,
      dueDate: taskDate,
      priority,
      category, // Include category in the new task object
    };

    dispatch(createTaskAsync(newTask)); // 🔥 Send task to Firebase

    // Reset form
    setTaskName('');
    setTaskDate('');
    setPriority('Low');
    setCategory('Work'); // Reset category field
  };

  return (
    <div className="max-w-md mx-auto text-black">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="taskDate"
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          </div>
        </div>
        {/* Category Dropdown */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Family">Family</option>
            <option value="Life">Life</option>
          </select>
        </div>


        {/* Priority Dropdown */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>


        {/* Add Task Button */}
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskBox;