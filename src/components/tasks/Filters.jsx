import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { motion } from 'framer-motion';

export default function Filters() {
  const { filter, setFilter, tasks } = useTaskStore();
  
  const activeCount = tasks.filter(t => !t.completed).length;
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex gap-2 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-xl glass-panel shadow-none border-none">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f.id ? 'text-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {filter === f.id && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {activeCount} task{activeCount !== 1 ? 's' : ''} left
      </div>
    </div>
  );
}
