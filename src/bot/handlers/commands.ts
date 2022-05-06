import { Composer, InlineKeyboard, Keyboard } from 'grammy';

import { APP_BASE_URL } from '../constants';
import { Context } from '../context';

const magicButton = (keyboard: any): Keyboard | InlineKeyboard =>
  new keyboard().webApp('💫 Tap!', APP_BASE_URL + 'index.html');

const composer = new Composer<Context>();

composer.command(['start', 'help'], async (ctx) => {
  const msg =
    'All available modes:\n\n/simple - simple mode with usual keyboard\n/inline - inline button mode';

  await ctx.reply(msg, {
    parse_mode: 'HTML',
  });
});

composer.command('simple', async (ctx) => {
  const keyboard = magicButton(Keyboard) as Keyboard;

  await ctx.reply('Simple mode', {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });
});

composer.command('inline', async (ctx) => {
  const keyboard = magicButton(InlineKeyboard);

  await ctx.reply('Inline mode', {
    reply_markup: keyboard,
  });
});

export default composer;
