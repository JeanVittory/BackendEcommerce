import mongoose from 'mongoose';
import { productsSchema } from './productsMongo.models.js';

const cartSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  product: [{ type: productsSchema }],
});

export { cartSchema };
