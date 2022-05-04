# Simple quiz Telegram Web App example

Inspired by
[zubiden/tg-web-bot-demo](https://github.com/zubiden/tg-web-bot-demo).

Demo bot: [@yaqb_bot](https://t.me/yaqb_bot)

## What this bot can do?

This bot demonstrates how to develop Telegram bots with [WebApp feature](https://core.telegram.org/bots/webapps) and simple setup backend with `express.js` and `grammyjs`

For UI use `Tailwind`. The Frontend part it's not optimized, just shows the possiblities of interaction with the Telegram WebApp.

## What is important?

- [Keyboard Button](https://core.telegram.org/bots/webapps#keyboard-button-web-apps) use to additional Bot UI, because user data is [not passed](https://github.com/ShinkarenkoMaxim/simple-quiz/blob/main/public/main.js#L132)
- [Inline Button](https://core.telegram.org/bots/webapps#inline-button-web-apps) use to handle **user data** like language and user id. It's useful for more loaded components like forms
- It is advisable not to use `JQuery` and build the project with `Webpack` or any other builder for optimization
- Be sure to use dark and light themes.

## Installation and local launch in DEVELOPMENT mode

1. Clone this repo: `git clone https://github.com/ShinkarenkoMaxim/simple-quiz`
2. Create `.env` file with the environment variables listed below
3. Run `yarn` in the root folder
4. Run `yarn build`
5. Run `yarn serve` and `yarn bot` separately

## Environment variables in `.env` file

- `PORT` - port number for listen server
- `HOST` - hostname or your server ip address. For local development use [Ngrok tunnel](https://ngrok.com/docs/secure-tunnels#http-tunnels-host-header)
- `BOT_TOKEN` - telegram bot token