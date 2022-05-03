import { Composer } from 'grammy';
import { Context } from '../context';

const composer = new Composer<Context>();

composer.on(':web_app_data', (ctx) => {
  const data = ctx.message.web_app_data.data;
  return ctx.reply(data);
});

export default composer;
