import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export function exportToExcel(messages) {
  const data = messages.map(msg => ({
    Timestamp: format(msg.timestamp, 'yyyy-MM-dd HH:mm:ss'),
    Topic: msg.topic,
    Message: msg.message
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'MQTT Data');
  XLSX.writeFile(wb, 'mqtt_data.xlsx');
}