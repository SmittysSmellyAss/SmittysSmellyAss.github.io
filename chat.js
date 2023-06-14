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
    console.log('Received message from server:', event.data);

    const chatLog = document.querySelector('#chat-messages');

    if (chatLog) {
      const message = JSON.parse(event.data);
      const newMessage = document.createElement('div');
      newMessage.textContent = message.content;
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
        socket.send(formattedMessage);
        messageInput.value = '';

        const webhookUrl = DISCORD_WEBHOOK_URL;
        const webhook = new Discord.WebhookClient({ url: webhookUrl });
        webhook.send(`${alias}: ${message}`).catch(console.error);
      }
    });
  }
});
