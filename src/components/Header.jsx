import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import ConnectionStatus from './ConnectionStatus';

function Header({ status, onExport }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Solar Sava</h1>
        <ConnectionStatus status={status} />
      </div>
      <button
        onClick={onExport}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        Export to Excel
      </button>
    </div>
  );
}

export default Header;