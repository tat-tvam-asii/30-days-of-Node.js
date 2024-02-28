const socket = new WebSocket('ws://localhost:3000');

const editor = document.getElementById('editor');

socket.onopen = function(event) {
    console.log('WebSocket connection established.');
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

socket.onmessage = function(event) {
    // Update the editor content with the received changes
    editor.innerHTML = event.data;
};

// Send editor content to server when changes occur
editor.addEventListener('input', function() {
    // Get the current content of the editor and convert it to a string
    const content = editor.innerHTML;

    // Send the content to the server
    socket.send(content);
});
