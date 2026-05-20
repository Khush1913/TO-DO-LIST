import React, { useEffect } from 'react';
import { useTaskStore } from './store/useTaskStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TaskInput from './components/tasks/TaskInput';
import Filters from './components/tasks/Filters';
import TaskList from './components/tasks/TaskList';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const { darkMode } = useTaskStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TaskInput />
          <Filters />
          <TaskList />
        </div>
        <div className="lg:col-span-1">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
