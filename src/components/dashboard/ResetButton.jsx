import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../store/useTaskStore';
import { useToast } from '../ui/ToastProvider';
import { AlertDialog } from '../ui/AlertDialog';

export default function ResetButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetTaskStatuses, undoReset } = useTaskStore();
  const { addToast } = useToast();

  const handleResetClick = () => {
    setIsOpen(true);
  };

  const confirmReset = () => {
    setIsLoading(true);
    // Simulate slight delay for "Smooth" feel
    setTimeout(() => {
      resetTaskStatuses();
      setIsLoading(false);
      setIsOpen(false);
      
      addToast({
        title: "All task statuses reset successfully",
        description: "Your tasks have been moved back to Start.",
        action: {
          label: "Undo",
          onClick: undoReset
        }
      });
    }, 600);
  };

  // Keyboard shortcut Ctrl + R
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'r') {
        e.preventDefault(); // Prevent browser refresh
        handleResetClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-10 pb-4 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md pt-2 -mx-2 px-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleResetClick}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl font-medium transition-colors shadow-sm group"
        >
          <motion.div
            animate={isOpen ? { rotate: -180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
          </motion.div>
          Reset Status
        </motion.button>
      </div>

      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmReset}
        isLoading={isLoading}
        title="Move all In Progress and Completed tasks back to Start?"
        description="Your task data (title, description, due date) will remain completely safe. This will only reset their statuses. You can undo this action."
        confirmText="Reset Status"
      />
    </>
  );
}
