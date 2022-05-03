import { session as session_ } from 'grammy';
import { Context } from './context';

export interface Session {}

export const initial = (): Session => ({});

export function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

export const session = session_({ initial, getSessionKey });
