// Connect to WebSocket server
const socket = new WebSocket('ws://72.217.75.166');

// Get chat form, input and message display elements
const chatForm = document.getElementById('message-form');
const chatInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');

// Listen for a message from server
socket.onmessage = function(event) {
    displayMessage(event.data);
};

// Display a message in chat
function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to bottom
}

// Send a message to server
function sendMessage(message) {
    socket.send(message);
}

// Handle form submission
chatForm.onsubmit = function(event) {
    event.preventDefault();

    // Send message and clear input
    sendMessage(chatInput.value);
    chatInput.value = '';
}
