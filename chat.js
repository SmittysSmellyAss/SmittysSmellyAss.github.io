document.addEventListener('DOMContentLoaded', (event) => {
  // Connect to WebSocket server
  const socket = new WebSocket('wss://rune-thirsty-zipper.glitch.me'); // replace with your WebSocket server URL

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

      // Scroll to the bottom of the chat log
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  };

  // Add event listener for chat form submission
  const form = document.querySelector('#message-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      // Prevent the form from refreshing the page
      event.preventDefault();

      // Get the message from the text input
      const input = document.querySelector('#message-input');
      const message = input.value;
      input.value = '';

      // Check if WebSocket is connected before sending the message
      if (socket.readyState === WebSocket.OPEN) {
        // Send the message to the server
        socket.send(message);
      } else {
        console.error('Cannot send message, WebSocket is not open');
      }

      // Send the message to the Discord channel using the webhook
      const timestamp = new Date().toLocaleString();
      const formattedMessage = `(Timestamp here) Posch: ${message}`;

      const webhookData = {
        content: formattedMessage,
      };

      const webhookUrl = 'https://discord.com/api/webhooks/1117953159072055418/uDR4uH3mtx-ONQih1mVjkxEMKYsF4IBGhpqKsU3lUE64GyD_RdSyFe5TUpk9IaTDhtld'; // Replace with your actual Discord webhook URL

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

      // Clear the input field
      input.value = '';

      // Scroll to the bottom of the chat log
      const chatLog = document.querySelector('#chat-messages');
      chatLog.scrollTop = chatLog.scrollHeight;
    });
  }
});
