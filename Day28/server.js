const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sharedContent = ''; // Shared content among all clients

// Serve static files (such as index.html and client.js) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', function connection(ws) {
    // Send the current shared content to the new client
    ws.send(sharedContent);

    // Handle incoming messages (content changes) from clients
    ws.on('message', function incoming(message) {
        // Update the shared content with the received changes
        sharedContent = message.toString(); // Ensure message is converted to string

        // Broadcast the updated content to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(sharedContent);
            }
        });
    });
});

server.listen(3000, function() {
    console.log('Server is running on port 3000.');
});
