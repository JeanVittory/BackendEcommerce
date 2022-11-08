import express from 'express';
import env from './env.config.js';
//import { args } from './yargs.config.js';

const app = express();

app.set('port', env.PORT);

export { app };
