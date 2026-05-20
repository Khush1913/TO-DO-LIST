import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      filter: 'all', // all, active, completed
      searchQuery: '',
      darkMode: false,
      
      toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode;
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newMode };
      }),
      setFilter: (filter) => set({ filter }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      addTask: (task) => set((state) => ({
        tasks: [
          {
            id: Date.now().toString(),
            title: task.title,
            completed: false,
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
      
      toggleTaskComplete: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      
      reorderTasks: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.tasks);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { tasks: result };
      })
    }),
    {
      name: 'premium-todo-storage',
      onRehydrateStorage: () => (state) => {
        // Hydration logic for theme happens in App.jsx to be safe
      },
    }
  )
);
