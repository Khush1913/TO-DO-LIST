import React, { useEffect, useState } from 'react';
import { useTaskStore } from './store/useTaskStore';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Board from './components/kanban/Board';
import Dashboard from './components/dashboard/Dashboard';
import TaskModal from './components/kanban/TaskModal';

function App() {
  const { darkMode } = useTaskStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [initialTaskStatus, setInitialTaskStatus] = useState('START');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTask = (status = 'START') => {
    setInitialTaskStatus(status);
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="h-full flex gap-6">
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Board</h2>
                <button
                  onClick={() => handleAddTask('START')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Create Task
                </button>
              </div>
              <Board onAddTask={handleAddTask} onEditTask={handleEditTask} />
            </div>
            
            <div className="w-80 flex-shrink-0 hidden lg:block overflow-y-auto pr-2">
              <Dashboard />
            </div>
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        initialStatus={initialTaskStatus}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
