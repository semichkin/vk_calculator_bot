const Markup = require('node-vk-bot-api/lib/markup');

class CalculatorBot {
    constructor(bot) {
        this.bot = bot;
        this.keyboard = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '<', '0', '=', '+'
        ];
        this.operations = ['/', '*', '-', '+'];
        this.history = ['0'];

        this.addListener();
    }

    reset() {
        this.history = ['0'];
    }

    toString() {
        let str = '';
        
        this.history.forEach((e) => {
            if (this.operations.includes(e)) {
                str += ' ' + e + ' ';
            } else {
                str += e;
            }
        });

        return str;
    }

    handleButton(button) {
        if (button === '<') {
            if (this.history.length !== 1 || this.history[0] !== '0') {
                const lastButton = this.history[this.history.length - 1];
                if (this.operations.includes(lastButton)) {
                    this.history.pop();
                } else {
                    if (lastButton.length > 1) {
                        this.history[this.history.length - 1] = lastButton.substring(0, lastButton.length - 1);
                    } else {
                        if (this.history.length === 1) {
                            this.history = ['0'];
                        } else {
                            this.history.pop();
                        }
                    }
                }
            }

            return this.toString();
        } else if (this.operations.includes(button)) {
            if (this.operations.includes(this.history[this.history.length - 1])) {
                this.history[this.history.length - 1] = button;
            } else {
                this.history.push(button);
            }

            return this.toString();
        } else if (button === '=') {
            const result = this.calculate();
            this.reset();
            return result;
        } else {
            const lastButton = this.history[this.history.length - 1];
            if (this.operations.includes(lastButton)) {
                this.history.push(button);
            } else {
                if (lastButton === '0') {
                    this.history[this.history.length - 1] = button;
                } else {
                    this.history[this.history.length - 1] += button;
                }
            }

            return this.toString();
        }
    }

    calculate() {
        let res = +this.history[0];

        for (let i = 1; i < this.history.length; i++) {
            const curr = this.history[i];
            const next = this.history[i + 1];

            if (this.operations.includes(curr) && next !== undefined) {
                if (curr === '+') res += +next;
                else if (curr === '-') res -= +next;
                else if (curr === '*') res *= +next;
                else if (curr === '/') res /= +next;
            }
        }

        return this.toString() + ' = ' + res;
    }

    addListener() {
        this.bot.on((ctx) => {
            const text = ctx.message.text.trim();
            console.log('new message: ' + text);
            
            if (text === '/start') {
                this.reset();
                ctx.reply('0', null, Markup.keyboard(this.keyboard, { columns: 4 }));
            } else if (this.keyboard.includes(text)) {
                ctx.reply(this.handleButton(text));
            }
        });
        
        this.bot.command('/start', (ctx) => {
            console.log('command /start');
            ctx.reply('0', null, Markup.keyboard(this.keyboard, { columns: 4 }));
        });
        
        this.bot.command('start', (ctx) => {
            console.log('command start');
            ctx.reply('0', null, Markup.keyboard(this.keyboard, { columns: 4 }));
        });
    }
}

module.exports = CalculatorBot;
