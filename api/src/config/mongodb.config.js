import mongoose from 'mongoose';
import { mongoConfig, mongoTestConfig } from './databases.config.js';

const doMongoConnection = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === 'test' ? mongoTestConfig.uri : mongoConfig.uri,
      process.env.NODE_ENV === 'test' ? mongoTestConfig.options : mongoConfig.options
    );
    console.log(process.env.NODE_ENV === 'test' ? 'testDB connected' : 'DB connected');
    return mongoose.connection;
  } catch (error) {
    console.log(error, 'connection to mongodb refused');
  }
};
export { doMongoConnection };
