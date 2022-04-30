import { Bot } from 'grammy';
import { run, sequentialize } from '@grammyjs/runner';
import { apiThrottler } from '@grammyjs/transformer-throttler';

import { getSessionKey, initial, session } from './session';
import { Context } from './context';

const bot = new Bot<Context>(process.env.BOT_TOKEN);

const throttler = apiThrottler();
bot.api.config.use(throttler);

bot.use(sequentialize(getSessionKey));
bot.use(session);

// Start bot with polling by default and Sequentialize runner
const runner = run(bot);

// Stopping the bot when Node process
// is about to be terminated
const stopRunner = () => runner.isRunning() && runner.stop();

process.once('SIGINT', stopRunner);
process.once('SIGTERM', stopRunner);
