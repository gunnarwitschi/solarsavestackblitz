import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function Chart({ messages }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup function to destroy the chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const topicMap = new Map();
  messages.forEach(msg => {
    if (!topicMap.has(msg.topic)) {
      topicMap.set(msg.topic, []);
    }
    topicMap.get(msg.topic).push({
      x: new Date(msg.timestamp),
      y: parseFloat(msg.message) || 0
    });
  });

  const data = {
    datasets: Array.from(topicMap.entries()).map(([topic, data], index) => ({
      label: topic.split('/').pop(),
      data: data,
      borderColor: `hsl(${index * 137.5}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 137.5}, 70%, 50%, 0.5)`,
      tension: 0.3
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Values over time'
      }
    }
  };

  return (
    <div className="h-96 mb-8">
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
}

export default Chart;