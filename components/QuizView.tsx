import React from 'react';
import { QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import Loader from './Loader';

interface QuizViewProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  onAnswerSelect: (answerIndex: number) => void;
  selectedAnswerIndex: number | null;
  isAnswered: boolean;
  onNext: () => void;
  isLoading: boolean;
  error: string | null;
  score: number;
  isQuizFinished: boolean;
  onRestart: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({
  questions,
  currentQuestionIndex,
  onAnswerSelect,
  selectedAnswerIndex,
  isAnswered,
  onNext,
  isLoading,
  error,
  score,
  isQuizFinished,
  onRestart,
}) => {
  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><Loader text="Generating fresh questions..." /></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-slate-800 p-8 rounded-lg">
        <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
        <p className="text-slate-400 mt-2 max-w-md">{error}</p>
        <button
          onClick={onRestart}
          className="mt-6 px-6 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-slate-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-sky-400 mb-2">Quiz Completed!</h2>
        <p className="text-slate-300 text-lg mb-6">You've mastered this level.</p>
        <div className="text-5xl font-bold text-white mb-2">
          {score} / {questions.length}
        </div>
        <p className="text-slate-400 mb-8">Correct Answers</p>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 transition-colors shadow-lg"
        >
          Restart Quiz
        </button>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const getOptionClasses = (index: number) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600';
    }
    if (index === currentQuestion.correctAnswerIndex) {
      return 'bg-emerald-600/80 ring-2 ring-emerald-400';
    }
    if (index === selectedAnswerIndex) {
      return 'bg-red-600/80 ring-2 ring-red-400';
    }
    return 'bg-slate-700 opacity-60';
  };

  return (
    <div className="p-2 sm:p-8 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-400 font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="text-sm text-slate-400 font-medium">Score: {score}</p>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight mb-8">
        {currentQuestion.question}
      </h2>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left transition-all duration-200 disabled:cursor-not-allowed ${getOptionClasses(index)}`}
          >
            <span className="font-mono text-sky-400 mr-3">{String.fromCharCode(65 + index)}</span>
            <span className="font-medium text-slate-200">{option}</span>
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-8 p-5 bg-slate-800/70 border border-slate-700 rounded-lg animate-fade-in shadow-lg">
           <div className="flex items-start">
             {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? (
               <CheckCircleIcon className="w-8 h-8 text-emerald-400 flex-shrink-0 mr-4" />
             ) : (
               <XCircleIcon className="w-8 h-8 text-red-400 flex-shrink-0 mr-4" />
             )}
             <div>
                <h3 className="text-lg font-bold text-slate-100">Explanation</h3>
                <p className="text-slate-300 mt-1 leading-relaxed">{currentQuestion.explanation}</p>
             </div>
           </div>
          <button
            onClick={onNext}
            className="w-full mt-6 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-500 transition-colors shadow-lg"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;