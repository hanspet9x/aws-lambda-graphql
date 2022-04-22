import getEnv from './index';

export const appConfig = {
  dbURL: getEnv('DATABASE_LOCAL', 'mongodb://localhost:27017/lead'),
};
