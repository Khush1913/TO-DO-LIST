import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Target, CheckCircle2, Circle, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import ResetButton from './ResetButton';

export default function Dashboard() {
  const { tasks, activeListId } = useTaskStore();
  
  const listTasks = tasks.filter(t => t.listId === activeListId);
  const totalTasks = listTasks.length;
  const completedTasks = listTasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = listTasks.filter(t => t.status === 'IN_PROGRESS').length;
  const startTasks = listTasks.filter(t => t.status === 'START').length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col gap-4 relative">
      <ResetButton />

      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-2">Project Overview</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Target className="w-4 h-4 text-indigo-500" /> Total Tasks
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</span>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Completed
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 text-blue-500" /> In Progress
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressTasks}</span>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Circle className="w-4 h-4 text-slate-500" /> Pending
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{startTasks}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
        <h3 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
           Progress
        </h3>
        <div className="flex flex-col gap-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                    className="bg-indigo-600 h-2.5 rounded-full"
                ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>{progress}%</span>
                <span>100%</span>
            </div>
        </div>
      </div>

      {/* Pomodoro Widget */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-100">Focus Timer</h3>
        <div className="text-center mb-6">
          <span className="text-4xl font-mono font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            {minutes}:{seconds}
          </span>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`p-3 rounded-xl text-white shadow-sm transition-transform hover:scale-105 ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={resetTimer}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform hover:scale-105"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
