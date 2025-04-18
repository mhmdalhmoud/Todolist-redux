import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search, Plus, Settings, Filter, X } from 'lucide-react';
import TaskBox from './TaskBox';
import { setSearchQuery } from '../redux/slices/searchSlice';
import { setFilters } from '../redux/slices/filterSlice'; // Assume you'll create this slice

const Sidebar = () => {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Filter states
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const toggleTaskForm = () => {
    setIsTaskFormVisible(!isTaskFormVisible);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const applyFilters = () => {
    const filters = {
      priority: priorityFilter,
      dueDate: dueDateFilter,
      category: categoryFilter
    };
    
    dispatch(setFilters(filters));
    toggleFilter(); // Close filter dropdown after applying
  };

  const clearFilters = () => {
    setPriorityFilter('');
    setDueDateFilter('');
    setCategoryFilter('');
    dispatch(setFilters({}));
    toggleFilter(); // Close filter dropdown after clearing
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        📝 To-Do App
      </div>

      {/* Search and Filter Bar */}
      <div className="px-4 pt-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>
          <button 
            onClick={toggleFilter}
            className={`p-2 rounded-md ${isFilterOpen ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <Filter size={16} />
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-2 bg-gray-800 rounded-md p-3 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Filter Tasks</h3>
              <button onClick={toggleFilter} className="text-gray-400 hover:text-white">
                <X size={14} />
              </button>
            </div>
            
            {/* Priority Filter */}
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1">Priority</label>
              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full bg-gray-700 text-white text-sm rounded-md border border-gray-600 p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            {/* Due Date Filter */}
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1">Due Date</label>
              <select
                value={dueDateFilter}
                onChange={(e) => setDueDateFilter(e.target.value)}
                className="w-full bg-gray-700 text-white text-sm rounded-md border border-gray-600 p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-gray-700 text-white text-sm rounded-md border border-gray-600 p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Work">Work</option>
                <option value="Family">Family</option>
                <option value="Life">Life</option>
              </select>
            </div>
            
            {/* Filter Actions */}
            <div className="flex justify-between space-x-2 mt-3">
              <button 
                onClick={clearFilters}
                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Clear
              </button>
              <button 
                onClick={applyFilters}
                className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li onClick={toggleTaskForm} className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded cursor-pointer">
            <Plus size={20} />
            <span>Add Task</span>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">Logged in as <span className="text-white">User</span></p>
      </div>
      {isTaskFormVisible && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50" onClick={toggleTaskForm}>
          <div className="bg-white p-8 rounded shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-red-500 hover:text-red-800" onClick={toggleTaskForm}>
              ✕
            </button>
            <TaskBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;