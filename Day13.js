const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  // WebSocket connection handler
  wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Message event handler
    ws.on('message', function incoming(message) {
      console.log('Received: %s', message);

      // Echo the message back to the client
      ws.send(message);
    });

    // Close event handler
    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
}

// Set up WebSocket server
setupWebSocket(server);

// Serve HTML page with JavaScript to establish WebSocket connection
app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
