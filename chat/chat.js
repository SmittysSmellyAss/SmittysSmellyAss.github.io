document.addEventListener('DOMContentLoaded', (event) => {
    const WEB_SOCKET_URL = 'wss://rune-thirsty-zipper.glitch.me';

    const socket = new WebSocket(WEB_SOCKET_URL);
  
    socket.onopen = function () {
      console.log('WebSocket connection opened');
    };
  
    socket.onerror = function (error) {
      console.error('WebSocket error:', error);
    };
  
    socket.onmessage = function (event) {
      const chatLog = document.querySelector('#chat-messages');
      if (chatLog) {
        const message = JSON.parse(event.data);
        const newMessage = document.createElement('div');
        newMessage.textContent = message.content;
        newMessage.className = 'message-bubble-anon'; // 
        chatLog.appendChild(newMessage);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    };
  
    const form = document.querySelector('#message-form');
  
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const aliasInput = document.querySelector('#alias-input');
        const messageInput = document.querySelector('#message-input');
        const alias = aliasInput.value ? aliasInput.value : 'anon';
        const message = messageInput.value;
  
        if (message) {
          const timestamp = new Date().toLocaleString();
          const formattedMessage = `(${timestamp}) ${alias}: ${message}`;
          socket.send(JSON.stringify({ author: alias, content: message }));
  
          messageInput.value = '';
  
          const chatLog = document.querySelector('#chat-messages');
          if (chatLog) {
            const newMessage = document.createElement('div');
            newMessage.textContent = formattedMessage;
            newMessage.className = 'message-bubble'; // <-- add this line
            chatLog.appendChild(newMessage);
            chatLog.scrollTop = chatLog.scrollHeight;
          }
        }
      });
    }
  });
