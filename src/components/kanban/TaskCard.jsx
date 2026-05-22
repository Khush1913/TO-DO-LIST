import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useTaskStore } from '../../store/useTaskStore';
import { Calendar, Edit2, Trash2, ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const priorityColors = {
  Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

const statusConfig = {
  START: {
    label: 'To Do',
    icon: Circle,
    color: 'text-slate-500',
    bg: 'bg-slate-100 dark:bg-slate-800',
    cardBorder: 'border-slate-200 dark:border-slate-700',
    cardBg: 'bg-white dark:bg-gray-800'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    cardBorder: 'border-amber-200 dark:border-amber-900/50',
    cardBg: 'bg-amber-50/30 dark:bg-amber-900/10'
  },
  COMPLETED: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    cardBorder: 'border-emerald-200 dark:border-emerald-900/50',
    cardBg: 'bg-emerald-50/30 dark:bg-emerald-900/10'
  }
};

const TaskCard = ({ task, index, onEdit }) => {
  const { deleteTask, moveTask } = useTaskStore();
  const [showActions, setShowActions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus, e) => {
    e.stopPropagation();
    if (newStatus !== task.status) {
      moveTask(task.id, newStatus);
    }
    setIsDropdownOpen(false);
  };

  const currentStatus = statusConfig[task.status] || statusConfig.START;
  const StatusIcon = currentStatus.icon;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          className={`${currentStatus.cardBg} p-4 rounded-xl shadow-sm border ${currentStatus.cardBorder} relative group transition-all duration-200
            ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500 scale-105 z-50' : 'hover:shadow-md'}
          `}
        >
          <div className="flex justify-between items-start mb-2 gap-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {task.title}
            </h4>
            
            <div className={`flex gap-1 transition-opacity shrink-0 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(task); }} 
                className="p-1 text-gray-400 hover:text-indigo-500 rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} 
                className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {/* Status Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${currentStatus.bg} ${currentStatus.color} hover:brightness-95 dark:hover:brightness-110`}
                >
                  <StatusIcon className="w-3 h-3" />
                  <span>{currentStatus.label}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="py-1">
                        {Object.entries(statusConfig).map(([statusKey, config]) => {
                          const ItemIcon = config.icon;
                          const isSelected = task.status === statusKey;
                          
                          return (
                            <button
                              key={statusKey}
                              onClick={(e) => handleStatusChange(statusKey, e)}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors
                                ${isSelected 
                                  ? 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white' 
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                                }
                              `}
                            >
                              <ItemIcon className={`w-3.5 h-3.5 ${config.color}`} />
                              {config.label}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wider ${priorityColors[task.priority]}`}>
                {task.priority}
              </div>
            </div>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
