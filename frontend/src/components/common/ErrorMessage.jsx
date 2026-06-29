import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div className="flex items-start">
        <FaExclamationCircle className="text-red-500 mt-1 mr-3" />
        <div className="flex-1">
          <p className="text-red-700">{message || 'Something went wrong'}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;