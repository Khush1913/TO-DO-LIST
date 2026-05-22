import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const statusColors = {
  START: 'bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
  COMPLETED: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
};

const statusTitles = {
  START: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
};

const Column = ({ status, tasks, onAddTask, onEditTask }) => {
  return (
    <div className="flex flex-col h-full w-full min-w-[300px] max-w-[350px]">
      <div className="flex items-center justify-between mb-4 px-1">
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
          className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col gap-3 p-3 rounded-2xl transition-colors ${statusColors[status]} ${
              snapshot.isDraggingOver ? 'ring-2 ring-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-900/10' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEdit={onEditTask} />
            ))}
            {provided.placeholder}
            
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400">
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
