import mongoose from 'mongoose';
import { mongoConfig } from './databases.config.js';

const doMongoConnection = async () => {
  try {
    await mongoose.connect(mongoConfig.uri, mongoConfig.options);
    return mongoose.connection;
  } catch (error) {
    console.log(error, 'connection to mongodb refused');
  }
};

export { doMongoConnection };
