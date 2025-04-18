// export default App;
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Sidebar from './components/sideBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer'; // ✅ Import Footer

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1 ml-64">
          <main className="flex-grow p-4">
            <TaskList />
          </main>
          <Footer /> {/* ✅ Add Footer at the bottom */}
        </div>
      </div>
    </Provider>
  );
};

export default App;
