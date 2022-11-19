import { Router } from 'express';
import { postOrder } from '../controllers/twilio.controllers';

const twilioRoute = Router();

twilioRoute.post('/', postOrder);

export { twilioRoute };
