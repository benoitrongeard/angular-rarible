import { Env } from '.';

// Rename file as config.ts and replace env, XXXXX & YYYYY info
export const defaultEnv: Env = {
  production: false,
  env: 'dev',
  moralis: {
    appId: 'XXXXX',
    serverUrl: 'YYYYY',
  },
};
