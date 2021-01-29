const express = require('express');
const bot = require('./src/bot');
const app = express();

app.use(express.json());
app.post('/', bot.webhookCallback);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started.');
});
