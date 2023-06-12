// Connect to WebSocket server
const socket = new WebSocket('ws://72.217.75.166:8080');

socket.onopen = function() {
    console.log('WebSocket connection opened');
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

socket.onmessage = function(event) {
    console.log('Received message from server:', event.data);
    
    const chatLog = document.querySelector('#chat-messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = event.data;
    chatLog.appendChild(newMessage);
};

// Add event listener for chat form submission
document.querySelector('#message-form').addEventListener('submit', event => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get the message from the text input
    const input = document.querySelector('#message-input');
    const message = input.value;
    input.value = '';

    // Check if WebSocket is connected before sending message
    if (socket.readyState === WebSocket.OPEN) {
        // Send the message to the server
        socket.send(message);

        // Append the message to the chat log
        const chatLog = document.querySelector('#chat-messages');
        const newMessage = document.createElement('div');
        const newMessage.textContent = `You: ${message}`;
        chatLog.appendChild(newMessage);
    } else {
        console.error('Cannot send message, WebSocket is not open');
    }
});
