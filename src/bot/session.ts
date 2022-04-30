import { RedisAdapter } from '@satont/grammy-redis-storage';
import { session as session_ } from 'grammy';
import { Context } from './context';
import redisClient from './utils/redis_storage';

export interface Session {}

const storage = new RedisAdapter({ instance: redisClient });

export const initial = (): Session => ({});

export function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

export const session = session_({ initial, storage, getSessionKey });
