const mqtt = require('mqtt');
const XLSX = require('xlsx');
const fs = require('fs');
require('dotenv').config();

// MQTT configuration
const broker = 'mqtts://e23fa99e4f934d279e11c7bc9520578e.s1.eu.hivemq.cloud:8883';
const topic = 'solar/116484675526/+/yieldday';
const filename = 'mqtt_data.xlsx';

// MQTT connection options
const options = {
  rejectUnauthorized: true,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

// Connect to MQTT broker
const client = mqtt.connect(broker, options);

// Initialize Excel workbook
let workbook;
let worksheet;

// Create or load existing workbook
if (fs.existsSync(filename)) {
  workbook = XLSX.readFile(filename);
  worksheet = workbook.Sheets[workbook.SheetNames[0]];
} else {
  workbook = XLSX.utils.book_new();
  worksheet = XLSX.utils.aoa_to_sheet([['Timestamp', 'Message']]);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MQTT Data');
}

// Get current row count
let rowCount = XLSX.utils.sheet_to_json(worksheet).length + 2;

client.on('connect', () => {
  console.log('Connected to HiveMQ Cloud broker');
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Subscription error:', err);
      return;
    }
    console.log(`Subscribed to topic: ${topic}`);
  });
});

client.on('message', (topic, message) => {
  const timestamp = new Date().toISOString();
  const messageStr = message.toString();
  console.log(`${timestamp}: ${messageStr}`);

  // Add new row to worksheet
  XLSX.utils.sheet_add_aoa(worksheet, [[timestamp, messageStr]], { origin: -1 });

  // Save workbook
  XLSX.writeFile(workbook, filename);
});

client.on('error', (err) => {
  console.error('MQTT error:', err);
});

process.on('SIGINT', () => {
  client.end();
  process.exit();
});