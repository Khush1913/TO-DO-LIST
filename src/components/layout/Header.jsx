import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Sun, Moon, Search, CheckCircle } from 'lucide-react';

export default function Header() {
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery } = useTaskStore();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b-0 rounded-none shadow-sm py-4">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
            <CheckCircle size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight">
            Premium To-Do
          </h1>
        </div>
        
        <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
          <div className="relative w-full max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-gray-200"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
