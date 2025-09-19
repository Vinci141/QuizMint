
import React from 'react';

export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.993.134" />
    <path d="M12 5a3 3 0 1 0 5.993.134" />
    <path d="M12 5a3 3 0 1 1-5.993-.134" />
    <path d="M12 5a3 3 0 1 1 5.993-.134" />
    <path d="M12 12a3 3 0 1 0-5.993.134" />
    <path d="M12 12a3 3 0 1 0 5.993.134" />
    <path d="M12 12a3 3 0 1 1-5.993-.134" />
    <path d="M12 12a3 3 0 1 1 5.993-.134" />
    <path d="M12 19a3 3 0 1 0-5.993.134" />
    <path d="M12 19a3 3 0 1 0 5.993.134" />
    <path d="M12 19a3 3 0 1 1-5.993-.134" />
    <path d="M12 19a3 3 0 1 1 5.993-.134" />
    <path d="M19 12h-2" />
    <path d="M7 12H5" />
    <path d="m16 16-1-1" />
    <path d="m9 9-1-1" />
    <path d="m16 8-1 1" />
    <path d="m9 15-1 1" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 12.94l-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clipRule="evenodd" />
  </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 00-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 00-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);
