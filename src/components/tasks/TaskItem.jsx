import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Edit2, GripVertical, X } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

export default function TaskItem({ task, index }) {
  const { toggleTaskComplete, deleteTask, editTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      editTask(task.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group flex items-center gap-3 p-4 mb-3 rounded-xl border ${
            snapshot.isDragging 
              ? 'bg-white dark:bg-gray-800 shadow-xl border-blue-500 z-50' 
              : 'glass-panel hover:shadow-md'
          } ${task.completed ? 'opacity-75' : ''}`}
        >
          <div
            {...provided.dragHandleProps}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={20} />
          </div>

          <button
            onClick={() => toggleTaskComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed 
                ? 'bg-blue-500 border-blue-500 text-white' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
            }`}
          >
            <AnimatePresence>
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={14} strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="flex-1">
                <input
                  type="text"
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => setIsEditing(false)}
                  className="w-full bg-transparent border-b-2 border-blue-500 outline-none text-gray-800 dark:text-gray-100"
                />
              </form>
            ) : (
              <span className={`block truncate ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                {task.title}
              </span>
            )}
          </div>

          {!isEditing && (
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          )}

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isEditing ? <X size={16} /> : <Edit2 size={16} />}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
}
