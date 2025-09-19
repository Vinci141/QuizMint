
import React from 'react';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800 rounded-lg shadow-xl">
      <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-slate-300">{text}</p>
      <p className="text-sm text-slate-400">Please wait a moment...</p>
    </div>
  );
};

export default Loader;
