import { Composer } from 'grammy';
import { Context } from '../context';

import commands from './commands';

const composer = new Composer<Context>();

composer
  .on('message:text')
  .filter((ctx) => ctx.chat?.type === 'private')
  .use(commands);

export default composer;
