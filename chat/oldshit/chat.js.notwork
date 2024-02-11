document.addEventListener('DOMContentLoaded', (event) => {
  const WEB_SOCKET_URL = 'wss://rune-thirsty-zipper.glitch.me';
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1117953159072055418/uDR4uH3mtx-ONQih1mVjkxEMKYsF4IBGhpqKsU3lUE64GyD_RdSyFe5TUpk9IaTDhtld';
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
      newMessage.className = 'message-bubble-anon'; // <-- add this line
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

        const webhookUrl = DISCORD_WEBHOOK_URL;

        const webhookData = {
          content: `${alias}: ${message}`,
        };

        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        })
        .then(function (response) {
          console.log('Webhook sent successfully!');
        })
        .catch(function (error) {
          console.error('Error sending webhook:', error);
        });

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
