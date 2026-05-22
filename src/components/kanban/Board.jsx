import React, { useMemo } from 'react';
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
    <div className="flex-1 w-full h-full pb-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Responsive layout: 
            - Mobile: horizontal scroll with snap
            - Tablet (md): grid with 2 columns, wrapping the 3rd
            - Desktop (lg): 3 columns side-by-side flex 
        */}
        <div className="
          flex flex-nowrap overflow-x-auto snap-x snap-mandatory 
          md:grid md:grid-cols-2 md:overflow-x-visible md:snap-none md:gap-y-8
          lg:flex lg:flex-nowrap lg:overflow-x-visible
          gap-6 h-full items-start pb-4 thin-scrollbar
        ">
          {STATUSES.map(status => (
            <div key={status} className="snap-center shrink-0 w-[85vw] sm:w-[320px] md:w-auto h-full max-h-full">
              <Column
                status={status}
                tasks={tasksByStatus[status]}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
