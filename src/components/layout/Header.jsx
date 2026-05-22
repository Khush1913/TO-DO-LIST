import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Moon, Sun, Search, Bell } from 'lucide-react';

const Header = () => {
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery, lists, activeListId } = useTaskStore();
  const activeList = lists.find(l => l.id === activeListId);

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {activeList ? activeList.name : 'Select a Project'}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-gray-100 dark:bg-gray-800 border-transparent rounded-full text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none w-64"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            US
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
