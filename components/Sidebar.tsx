import React from 'react';
import { Difficulty } from '../types';
import { DIFFICULTY_LEVELS } from '../constants';

interface SidebarProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  topic: string;
  onTopicChange: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentDifficulty, onDifficultyChange, topic, onTopicChange }) => {
  return (
    <aside className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl flex flex-col h-full justify-between">
      <div>
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Topic</h2>
          <p className="text-xl font-bold text-sky-400 break-all">{topic}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Level</h2>
          <ul className="space-y-2">
            {DIFFICULTY_LEVELS.map((level) => (
              <li key={level}>
                <button
                  onClick={() => onDifficultyChange(level)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 ${
                    currentDifficulty === level
                      ? 'bg-sky-500 text-white shadow-lg'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button
          onClick={onTopicChange}
          className="w-full mt-8 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          aria-label="Exit current quiz and return to topic selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Exit Quiz</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
