import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { LayoutDashboard, CheckSquare, List, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { lists, activeListId, setActiveListId, addList, deleteList, renameList } = useTaskStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editListTitle, setEditListTitle] = useState('');

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(newListTitle.trim());
      setNewListTitle('');
      setIsAdding(false);
    }
  };

  const handleRenameList = (id) => {
    if (editListTitle.trim()) {
      renameList(id, editListTitle.trim());
      setEditingListId(null);
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen overflow-y-auto">
      <div className="p-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
        <CheckSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">TaskFlow</h1>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-1">
        <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Projects
        </div>
        
        {lists.map((list) => (
          <div key={list.id} className="relative group px-2">
            {editingListId === list.id ? (
              <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                <input
                  autoFocus
                  type="text"
                  value={editListTitle}
                  onChange={(e) => setEditListTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRenameList(list.id);
                    if (e.key === 'Escape') setEditingListId(null);
                  }}
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none border-b border-indigo-500"
                />
                <button onClick={() => handleRenameList(list.id)} className="text-green-500 hover:text-green-600">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => setEditingListId(null)} className="text-gray-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveListId(list.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  activeListId === list.id
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 opacity-70" />
                  <span className="truncate">{list.name}</span>
                </div>
              </button>
            )}
            
            {!editingListId && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingListId(list.id);
                    setEditListTitle(list.name);
                  }}
                  className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteList(list.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="List Name"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddList();
                    if (e.key === 'Escape') setIsAdding(false);
                  }}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-3 py-1.5 rounded-md outline-none border border-transparent focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={handleAddList}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-2 mt-2">
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
