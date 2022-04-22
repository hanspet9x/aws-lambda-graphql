import mongoose from 'mongoose';
import {appConfig} from './app';

export const initDatabaseConnection = () => {
  mongoose.connect(appConfig.dbURL, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('DB connected');
  });
};
