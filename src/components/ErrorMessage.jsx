import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

function ErrorMessage({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <span className="block sm:inline">{error}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4"
        onClick={onDismiss}
      >
        <XCircleIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ErrorMessage;