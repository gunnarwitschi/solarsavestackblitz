import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const MQTT_CONFIG = {
  broker: 'wss://e23fa99e4f934d279e11c7bc9520578e.s1.eu.hivemq.cloud:8884/mqtt',
  topic: 'solar/116484675526/+/power',
  options: {
    username: 'openDTU',
    password: 'openDTU42',
    protocol: 'wss',
  }
};

export function useMqttConnection() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Disconnected');
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = mqtt.connect(MQTT_CONFIG.broker, MQTT_CONFIG.options);

    client.on('connect', () => {
      setStatus('Connected');
      setError(null);
      client.subscribe(MQTT_CONFIG.topic, (err) => {
        if (err) setError('Failed to subscribe to topic');
      });
    });

    client.on('message', (topic, message) => {
      const newMessage = {
        timestamp: new Date(),
        topic,
        message: message.toString()
      };
      setMessages(prev => [...prev, newMessage]);
    });

    client.on('error', (err) => {
      setError(err.message);
      setStatus('Error');
    });

    return () => {
      client.end();
    };
  }, []);

  return { messages, status, error, setError };
}