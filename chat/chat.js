// Chat v4 - The renewed project - This one works but is super basic and is serving as a checkpoint in case I mess it up beyond fixing.
const socket = new WebSocket('wss://poschplus-chat-app-backend.glitch.me');
let userAlias = '';

socket.onopen = () => {
    console.log('Connected to server');
    // Send wake message to server
    socket.send(JSON.stringify({ type: 'wake' }));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'message') {
        displayMessage(message);
    } else if (message.type === 'userCount') {
        updateConnectedUsers(message.count);
    } else if (message.type === 'connectedUsers') {
        displayConnectedUsers(message.users);
    } else if (message.type === 'chatHistory') {
        // Handle chat history data
        displayChatHistory(message.messages);
    }
};

function displayChatHistory(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear existing messages
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (message.alias) {
            messageElement.innerHTML = `<strong>${message.alias}:</strong> ${message.content}`;
        } else {
            messageElement.innerHTML = `<strong>anon:</strong> ${message.content}`;
        }
        messagesContainer.appendChild(messageElement);
    });
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function sendMessage() {
    const messageInput = document.getElementById('messageInput').value;
    if (messageInput.trim() !== '') {
        // Send message and alias to server
        socket.send(JSON.stringify({ type: 'message', alias: userAlias, content: messageInput }));
        document.getElementById('messageInput').value = '';
    }
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (message.alias) {
        messageElement.innerHTML = `<strong>${message.alias}:</strong> ${message.content}`;
    } else {
        messageElement.innerHTML = `<strong>anon:</strong> ${message.content}`;
    }
    messagesContainer.appendChild(messageElement);
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function updateConnectedUsers(count) {
    document.getElementById('userCount').textContent = count;
}

function setAlias() {
    const aliasInput = document.getElementById('aliasInput').value;
    if (aliasInput.trim() !== '') {
        socket.send(JSON.stringify({ type: 'setAlias', alias: aliasInput }));
    }
}

function displayConnectedUsers(users) {
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';
    for (const userId in users) {
        const alias = users[userId];
        const userElement = document.createElement('div');
        userElement.textContent = alias;
        userListContainer.appendChild(userElement);
    }
}

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('setAliasButton').addEventListener('click', setAlias);

// Listener that waitds for changes in the alias input field
document.getElementById('aliasInput').addEventListener('input', (event) => {
    userAlias = event.target.value.trim(); // Updates username
});
