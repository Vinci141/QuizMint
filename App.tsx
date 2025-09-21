import React, { useState } from 'react';
import TopicInput from './components/TopicInput';
import Sidebar from './components/Sidebar';
import QuizView from './components/QuizView';
import { generateQuizQuestions } from './services/geminiService';
import { Difficulty, QuizQuestion } from './types';
import { BrainCircuitIcon } from './components/Icons';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [askedQuestions, setAskedQuestions] = useState<QuizQuestion[]>([]);
  
  const isQuizFinished = !isLoading && isAnswered && currentQuestionIndex === questions.length - 1;

  const fetchNewQuestions = async (currentTopic: string, currentDifficulty: Difficulty, existingQuestions: QuizQuestion[]) => {
    if (!currentTopic) return;
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    try {
      const fetchedQuestions = await generateQuizQuestions(currentTopic, currentDifficulty, existingQuestions);
      setQuestions(fetchedQuestions);
      setAskedQuestions(prev => [...prev, ...fetchedQuestions]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSubmit = (newTopic: string) => {
    setTopic(newTopic);
    setDifficulty(Difficulty.Beginner);
    setAskedQuestions([]);
    fetchNewQuestions(newTopic, Difficulty.Beginner, []);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    if (newDifficulty !== difficulty && topic) {
      setDifficulty(newDifficulty);
      fetchNewQuestions(topic, newDifficulty, askedQuestions);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswerIndex(answerIndex);
    setIsAnswered(true);
    if (answerIndex === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
    }
  };
  
  const resetQuiz = () => {
      if(topic){
          fetchNewQuestions(topic, difficulty, askedQuestions);
      }
  };

  const handleTopicChange = () => {
    setTopic(null);
    setQuestions([]);
    setDifficulty(Difficulty.Beginner);
    setAskedQuestions([]);
  };

  if (!topic) {
    return <TopicInput onTopicSubmit={handleTopicSubmit} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3 mb-6">
        <BrainCircuitIcon className="h-8 w-8 text-sky-400" />
        <h1 className="text-2xl sm:text-3xl font-bold">Quiz Genius</h1>
      </header>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar
            currentDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            topic={topic}
            onTopicChange={handleTopicChange}
          />
        </div>
        <main className="lg:col-span-8 xl:col-span-9 bg-slate-800/50 rounded-2xl min-h-[600px]">
          <QuizView
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswerIndex={selectedAnswerIndex}
            isAnswered={isAnswered}
            onNext={handleNextQuestion}
            isLoading={isLoading}
            error={error}
            score={score}
            isQuizFinished={isQuizFinished}
            onRestart={resetQuiz}
            onTopicChange={handleTopicChange}
          />
        </main>
      </div>
    </div>
  );
};

export default App;