import React, { useState, useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTaskStore } from '../../store/useTaskStore';
import Column from './Column';

const STATUSES = ['START', 'IN_PROGRESS', 'COMPLETED'];

const Board = ({ onAddTask, onEditTask }) => {
  const { tasks, activeListId, moveTask, searchQuery } = useTaskStore();

  const activeListTasks = useMemo(() => {
    let filtered = tasks.filter(t => t.listId === activeListId);
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return filtered;
  }, [tasks, activeListId, searchQuery]);

  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce((acc, status) => {
      acc[status] = activeListTasks.filter(t => t.status === status);
      return acc;
    }, {});
  }, [activeListTasks]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(draggableId, destination.droppableId, destination.index);
  };

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden pt-4 pb-8 px-2">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 h-full items-start">
          {STATUSES.map(status => (
            <Column
              key={status}
              status={status}
              tasks={tasksByStatus[status]}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
