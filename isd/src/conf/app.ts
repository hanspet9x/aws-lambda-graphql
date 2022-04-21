import getEnv from './index';

export const appConfig = {
  dbURL: getEnv('DATABASE_LOCAL'),
};
