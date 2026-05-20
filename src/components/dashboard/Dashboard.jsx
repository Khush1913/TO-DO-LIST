import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Play, Pause, RotateCcw, Target } from 'lucide-react';

export default function Dashboard() {
  const { tasks } = useTaskStore();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
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
    <div className="flex flex-col gap-6 sticky top-24">
      
      {/* Progress Widget */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Target size={20} className="text-blue-500" /> My Progress
        </h3>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="36" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="8" fill="transparent" />
              <circle 
                cx="40" cy="40" r="36" 
                className="stroke-current text-blue-500" 
                strokeWidth="8" fill="transparent"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * ((100 - progress) / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{progress}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {completedTasks} of {totalTasks} tasks completed
            </p>
            <p className="text-xs text-gray-400 mt-1">Keep it up!</p>
          </div>
        </div>
      </div>

      {/* Pomodoro Widget */}
      <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Pomodoro Timer</h3>
        <div className="text-center mb-6">
          <span className="text-5xl font-mono font-bold tracking-tight text-indigo-600 dark:text-indigo-400 drop-shadow-sm">
            {minutes}:{seconds}
          </span>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`p-3 rounded-xl text-white shadow-lg transition-transform hover:scale-105 ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button 
            onClick={resetTimer}
            className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform hover:scale-105"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
