<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LiveChat with Posch and Pals</title>
    <link rel="stylesheet" href="chat.css">
</head>
<body>
    <div id="chatContainer">
        <div id="messages"></div>
        <input type="text" id="aliasInput" placeholder="Set your alias (optional)">
        <input type="text" id="messageInput" placeholder="Type your message...">
        <button id="setAliasButton">Set Username</button>
        <button id="sendButton">Send</button>
    </div>
    
<article>
    <div  class="container" style="border-style: outset; border-radius: 10%;" >
        <p id="connectedUsers">Connected Users: <span id="userCount">0</span></p>
            <p style="border:8px" id="userList"></p>
    </div>
</article>
    <script src="chat.js"></script>
</body>
</html>
