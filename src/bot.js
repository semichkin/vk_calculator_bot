const VkBot = require('node-vk-bot-api');
const CalculatorBot = require('./CalculatorBot');

const bot = new VkBot({
    token: process.env.VK_ACCESS_TOKEN,
    confirmation: process.env.VK_CONFIMATION_TOKENz,
    group_id: process.env.VK_GROUP_ID
});

const calculatorBot = new CalculatorBot(bot);

module.exports = calculatorBot.bot;
