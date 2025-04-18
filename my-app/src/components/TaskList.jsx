// export default TaskList;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, Edit, Trash2, Clock } from 'lucide-react';
import { fetchTasksAsync, deleteTaskAsync, updateTaskAsync } from '../redux/slices/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const searchQuery = useSelector((state) => state.search);
  const filters = useSelector((state) => state.filters);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    taskName: '',
    dueDate: '',
    priority: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTaskAsync(taskId));
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditFormData({
      taskName: task.taskName,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...tasks.find((t) => t.id === editingTaskId),
      ...editFormData,
    };
    dispatch(updateTaskAsync(editingTaskId, updatedTask));
    setEditingTaskId(null);
  };

  const applyAllFilters = (task) => {
    const matchSearch = task.taskName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPriority = filters.priority ? task.priority?.toLowerCase() === filters.priority.toLowerCase() : true;
    const matchCategory = filters.category ? task.category === filters.category : true;
    const matchDueDate = (() => {
      if (!filters.dueDate) return true;
      const today = new Date();
      const due = new Date(task.dueDate);
      switch (filters.dueDate) {
        case 'today':
          return due.toDateString() === today.toDateString();
        case 'week': {
          const weekAhead = new Date(today);
          weekAhead.setDate(today.getDate() + 7);
          return due >= today && due <= weekAhead;
        }
        case 'month':
          return due.getMonth() === today.getMonth() && due.getFullYear() === today.getFullYear();
        case 'overdue':
          return due < today;
        default:
          return true;
      }
    })();

    return matchSearch && matchPriority && matchCategory && matchDueDate;
  };

  const filteredTasks = tasks.filter(applyAllFilters);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Tasks</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks match your search or filter criteria.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow mb-3">
            {editingTaskId === task.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  name="taskName"
                  value={editFormData.taskName}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Task Name"
                  required
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editFormData.dueDate}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  name="priority"
                  value={editFormData.priority}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="Work">Work</option>
                  <option value="Family">Family</option>
                  <option value="Life">Life</option>
                </select>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingTaskId(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-400 rounded-md text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-400 rounded-md text-white"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{task.taskName}</h3>
                <p className="text-sm text-gray-600">
                  <Clock size={14} className="inline-block mr-1" />
                  Due: {task.dueDate || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Priority: {task.priority} | Category: {task.category}
                </p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleEdit(task)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
