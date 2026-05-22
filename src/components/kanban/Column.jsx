import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const statusColors = {
  START: 'bg-slate-100 dark:bg-slate-800/40 text-slate-800 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300',
  COMPLETED: 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300'
};

const statusTitles = {
  START: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
};

const Column = ({ status, tasks, onAddTask, onEditTask }) => {
  return (
    <div className="flex flex-col h-full w-full min-w-[280px] sm:min-w-[320px] max-w-[400px]">
      <div className="flex items-center justify-between mb-4 px-1 shrink-0 sticky top-0 z-10 bg-transparent">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {statusTitles[status]}
          </h3>
          <span className="text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden rounded-2xl relative">
        {/* Background color container to prevent ugly corners during scroll */}
        <div className={`absolute inset-0 ${statusColors[status]} rounded-2xl`}></div>
        
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`relative h-full overflow-y-auto thin-scrollbar flex flex-col gap-3 p-3 transition-colors ${
                snapshot.isDraggingOver ? 'ring-2 ring-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-900/10' : ''
              }`}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} onEdit={onEditTask} />
              ))}
              {provided.placeholder}
              
              {tasks.length === 0 && !snapshot.isDraggingOver && (
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 mt-2">
                  No tasks yet
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
