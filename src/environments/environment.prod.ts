import { Env } from '.';
import { defaultEnv } from './env';

export const environment: Env = {
  ...defaultEnv,
  production: true
};