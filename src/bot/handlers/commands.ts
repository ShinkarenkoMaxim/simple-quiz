import { Composer, InlineKeyboard, Keyboard } from 'grammy';

import { APP_BASE_URL } from '../constants';
import { Context } from '../context';

const composer = new Composer<Context>();

composer.command(['start', 'help'], async (ctx) => {
  const msg =
    'Все доступные режимы:\n\n/simple - простой режим\n/inline - в инлайн клавиатуре';

  await ctx.reply(msg, {
    parse_mode: 'HTML',
  });
});

composer.command('simple', async (ctx) => {
  const keyboard = new Keyboard().webApp(
    '💫 Тык!',
    APP_BASE_URL + 'index.html'
  );

  await ctx.reply('Простой режим', {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });
});

composer.command('inline', async (ctx) => {
  const keyboard = new InlineKeyboard().webApp(
    '💫 Тык!',
    APP_BASE_URL + 'index.html'
  );

  await ctx.reply('Inline режим', {
    reply_markup: keyboard,
  });
});

export default composer;
