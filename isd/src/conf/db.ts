import mongoose from 'mongoose';
import {appConfig} from './app';

export const initDatabaseConnection = async () => {
  await mongoose.connect(appConfig.dbURL);
};
