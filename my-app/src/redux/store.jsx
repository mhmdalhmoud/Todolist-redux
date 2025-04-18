// export default store;
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice'; // <-- Add this

export default configureStore({
  reducer: {
    tasks: taskReducer,
    search: searchReducer,
    filters: filterReducer, // <-- And this
  },
});
