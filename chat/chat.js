const ws_url = 'wss://rune-thirsty-zipper.glitch.me:8080';
const Socket = new WebSocket(ws_url)


Socket.onopen = (event) => {
  Socket.send("Someone just opened the chat");
};

