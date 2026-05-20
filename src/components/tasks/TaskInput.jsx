import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Plus, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskInput() {
  const addTask = useTaskStore(state => state.addTask);
  const [title, setTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask({ title: title.trim(), priority });
    setTitle('');
    setIsExpanded(false);
    setPriority('Medium');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      layout
      className="glass-panel p-4 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-gray-400 hover:text-blue-500 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Plus size={24} className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task... (Press Enter)"
          className="flex-1 bg-transparent border-none text-lg outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
          onFocus={() => setIsExpanded(true)}
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-md"
        >
          Add Task
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-4 pl-9 overflow-hidden"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Flag size={14} /> Priority:
              </span>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1 outline-none text-gray-700 dark:text-gray-300 border-none cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
