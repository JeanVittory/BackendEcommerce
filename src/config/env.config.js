import { config } from 'dotenv';
import invariant from 'invariant';
config();

invariant(process.env.APP_DATABASE_TO_USE, 'A database provider should be declared');

if (process.env.APP_DATABASE_TO_USE === 'mongo') {
  invariant(process.env.APP_USER_MONGODB, 'A mongo user is required');
  invariant(process.env.APP_PASSWORD_MONGODB, 'A mongo password is required');
  invariant(process.env.APP_DATABASE_MONGODB, 'A mongo database is required');
}

if (process.env.APP_DATABASE_TO_USE === 'firestore') {
  invariant(process.env.APP_DATABASE_FIRESTORE, 'a firestore database is required');
}

if (process.env.APP_DATABASE_TO_USE === 'sql') {
  invariant(process.env.APP_HOST_SQL, 'A SQL host is required');
  invariant(process.env.APP_USER_SQL, 'A SQL user is required');
  invariant(process.env.APP_PASSWORD_SQL, 'A SQL password is required');
  invariant(process.env.APP_DATABASE_SQL, 'A SQL database is required');
}

export default {
  //PORT: process.env.APP_PORT || 5000,
  SECRET_SESSION: process.env.APP_SECRET_SESSION,
  PORT_SQL: process.env.APP_PORT_SQL || 3306,
  HOST_SQL: process.env.APP_HOST_SQL,
  USER_SQL: process.env.APP_USER_SQL,
  PASSWORD_SQL: process.env.APP_PASSWORD_SQL,
  DATABASE_SQL: process.env.APP_DATABASE_SQL,
  USER_MONGO: process.env.APP_USER_MONGODB,
  PASSWORD_MONGO: process.env.APP_PASSWORD_MONGODB,
  DATABASE_MONGO: process.env.APP_DATABASE_MONGODB,
  DATABASE_SESSIONS_MONGO: process.env.APP_DATABASE_SESSIONS,
  DATABASE_FIRESTORE: process.env.APP_DATABASE_FIRESTORE,
  DATABASE_TO_USE: process.env.APP_DATABASE_TO_USE,
};
