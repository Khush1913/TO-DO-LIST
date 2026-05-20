import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';

export default function TaskList() {
  const { tasks, filter, searchQuery, reorderTasks } = useTaskStore();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    
    // Note: Reordering works best when no filters are applied
    reorderTasks(result.source.index, result.destination.index);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4 shadow-inner">
          <Inbox size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">No tasks yet</h3>
        <p>Add a task above to get started!</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No tasks match your current filters.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks-list">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="min-h-[50vh] pb-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
