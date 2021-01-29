const express = require('express');
const bot = require('./src/bot');
const app = express();

app.use(express.json());
app.post('/', bot.webhookCallback);

app.listen(process.env.PORT, () => {
    console.log('Server started.');
});
