import React from 'react';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import MessageTable from './components/MessageTable';
import Chart from './components/Chart';
import { useMqttConnection } from './hooks/useMqttConnection';
import { exportToExcel } from './utils/excelExport';

function App() {
  const { messages, status, error, setError } = useMqttConnection();

  const handleExport = () => {
    exportToExcel(messages);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <Header status={status} onExport={handleExport} />
          <ErrorMessage error={error} onDismiss={() => setError(null)} />
          <Chart messages={messages} />
          <MessageTable messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default App;