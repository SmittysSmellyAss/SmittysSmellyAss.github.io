const express = require('express');
const app = express();
const port = 8000;

app.get('/callback', (req, res) => {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        res.send('No authorization code provided.');
        return;
    }

    // You now have the authorization code and can use it to request an access token
    // from Twitch (using your client ID and secret)

    // After you've done that and have the token, you could redirect the user to
    // another page, or do something else depending on your application.

    res.send('Authorization code received: ' + authorizationCode);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
