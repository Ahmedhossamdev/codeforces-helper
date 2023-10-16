const WebSocket = require('ws');

// Replace 'ws://localhost:3000' with the WebSocket server URL you want to connect to
const socket = new WebSocket('ws://localhost:3000');

// Handle incoming WebSocket messages
socket.on('message', (data) => {
    console.log('Received message:', data);
});

// Handle WebSocket connection open
socket.on('open', () => {
    console.log('WebSocket connection opened.');

    // You can send messages to the server after the connection is open
    socket.send('Hello, server!');
});

// Handle WebSocket connection close
socket.on('close', () => {
    console.log('WebSocket connection closed.');
});

// Handle WebSocket errors
socket.on('error', (error) => {
    console.error('WebSocket error:', error.message);
});
