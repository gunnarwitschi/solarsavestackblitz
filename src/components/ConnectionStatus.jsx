import React from 'react';

function ConnectionStatus({ status }) {
  return (
    <div className="flex items-center mt-2">
      <div className={`w-3 h-3 rounded-full mr-2 ${
        status === 'Connected' ? 'bg-green-500' : 'bg-red-500'
      }`}></div>
      <span className="text-gray-600">{status}</span>
    </div>
  );
}

export default ConnectionStatus;