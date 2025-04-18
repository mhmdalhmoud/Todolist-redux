// src/pages/Home.jsx
import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm'; // Added this line
import Header from '../components/Header'; // Uncommented this
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto p-4">
        <TaskForm />
        <TaskList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
