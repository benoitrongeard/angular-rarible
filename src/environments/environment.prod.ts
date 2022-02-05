import { Env } from '.';
import { defaultEnv } from './config';

export const environment: Env = {
  ...defaultEnv,
  production: true
};