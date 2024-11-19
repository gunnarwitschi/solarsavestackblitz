import React from 'react';
import { format } from 'date-fns';

function MessageTable({ messages }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messages.map((msg, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(msg.timestamp, 'yyyy-MM-dd HH:mm:ss')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {msg.topic}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {msg.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessageTable;