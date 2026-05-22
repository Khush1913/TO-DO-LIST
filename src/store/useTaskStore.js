import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultLists = [
  { id: '1', name: 'Personal', icon: 'User', createdAt: new Date().toISOString() },
  { id: '2', name: 'Office Work', icon: 'Briefcase', createdAt: new Date().toISOString() }
];

export const useTaskStore = create(
  persist(
    (set, get) => ({
      lists: defaultLists,
      activeListId: '1',
      tasks: [],
      searchQuery: '',
      filter: 'all',
      darkMode: true,
      previousState: null,

      resetApp: () => set((state) => {
        const backup = {
          lists: state.lists,
          activeListId: state.activeListId,
          tasks: state.tasks,
          searchQuery: state.searchQuery,
          filter: state.filter
        };
        return {
          previousState: backup,
          lists: defaultLists,
          activeListId: '1',
          tasks: [],
          searchQuery: '',
          filter: 'all'
        };
      }),

      resetTaskStatuses: () => set((state) => {
        const backup = {
          lists: state.lists,
          activeListId: state.activeListId,
          tasks: state.tasks,
          searchQuery: state.searchQuery,
          filter: state.filter
        };
        
        const updatedTasks = state.tasks.map(task => {
          if (task.status === 'IN_PROGRESS' || task.status === 'COMPLETED') {
            return { ...task, status: 'START' };
          }
          return task;
        });

        return {
          previousState: backup,
          tasks: updatedTasks
        };
      }),

      undoReset: () => set((state) => {
        if (state.previousState) {
          return {
            ...state.previousState,
            previousState: null
          };
        }
        return state;
      }),

      toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode;
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newMode };
      }),

      setActiveListId: (id) => set({ activeListId: id }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilter: (filter) => set({ filter }),

      addList: (name) => set((state) => {
        const newList = {
          id: Date.now().toString(),
          name,
          createdAt: new Date().toISOString()
        };
        return { lists: [...state.lists, newList], activeListId: newList.id };
      }),

      deleteList: (id) => set((state) => {
        const remainingLists = state.lists.filter(l => l.id !== id);
        return {
          lists: remainingLists,
          activeListId: state.activeListId === id ? (remainingLists[0]?.id || null) : state.activeListId,
          tasks: state.tasks.filter(t => t.listId !== id)
        };
      }),

      renameList: (id, newName) => set((state) => ({
        lists: state.lists.map(l => l.id === id ? { ...l, name: newName } : l)
      })),

      addTask: (task) => set((state) => ({
        tasks: [
          {
            id: Date.now().toString(),
            listId: state.activeListId,
            title: task.title,
            description: task.description || '',
            status: 'START', // START, IN_PROGRESS, COMPLETED
            priority: task.priority || 'Medium',
            dueDate: task.dueDate || null,
            createdAt: new Date().toISOString()
          },
          ...state.tasks
        ]
      })),

      editTask: (id, updatedFields) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      moveTask: (taskId, newStatus, newIndex) => set((state) => {
        const tasks = [...state.tasks];
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return state;

        const [taskToMove] = tasks.splice(taskIndex, 1);
        taskToMove.status = newStatus;
        
        const tasksInNewStatus = tasks.filter(t => t.status === newStatus && t.listId === state.activeListId);
        
        let insertIndex = tasks.length;
        if (newIndex !== undefined && newIndex < tasksInNewStatus.length) {
          const targetTask = tasksInNewStatus[newIndex];
          insertIndex = tasks.findIndex(t => t.id === targetTask.id);
        } else if (newIndex === undefined) {
            // Append to the end of the new status column visually
            // Which means just append to the end of the tasks array
            insertIndex = tasks.length;
        }
        
        tasks.splice(insertIndex, 0, taskToMove);
        
        return { tasks };
      }),
    }),
    {
      name: 'premium-multi-todo-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
            if (state.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
      },
    }
  )
);
