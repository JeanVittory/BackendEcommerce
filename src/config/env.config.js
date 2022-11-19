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
  PORT: process.env.PORT || 8080,
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
  TOKEN_TWILIO: process.env.APP_TOKEN_TWILIO,
  SID_TWILIO: process.env.APP_SID_TWILIO,
  PHONE_TWILIO: process.env.APP_TWILIO_PHONE,
  WHATSAPP_TWILIO: process.env.APP_TWILIO_PHONE_WHATSAPP,
  PHONE_DESTINY: process.env.APP_TWILIO_PHONE_DESTINY,
  PHONE_DESTINY_WHATSAPP: process.env.APP_TWILIO_PHONE_DESTINY_WHATSAPP,
  ETHEREAL_ADMIN_EMAIL: process.env.APP_ETHEREAL_MAIL,
  ETHEREAL_ADMIN_PASSWORD: process.env.APP_ETHEREAL_PASSWORD,
};
