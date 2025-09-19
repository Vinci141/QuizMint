
import React, { useState } from 'react';
import { BrainCircuitIcon } from './Icons';

interface TopicInputProps {
  onTopicSubmit: (topic: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onTopicSubmit }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.trim()) {
      onTopicSubmit(topic.trim());
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center items-center mb-6">
          <BrainCircuitIcon className="h-16 w-16 text-sky-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-3">Quiz Genius</h1>
        <p className="text-lg text-slate-400 mb-8">
          Enter any programming language or CS concept to start your learning journey.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., React Hooks, Python decorators, Big O Notation"
            className="flex-grow px-5 py-3.5 bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!topic.trim()}
            className="px-6 py-3.5 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopicInput;
