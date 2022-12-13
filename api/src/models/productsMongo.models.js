import mongoose from 'mongoose';
import env from '../config/env.config.js';

const productsSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  { versionKey: false }
);

export { productsSchema };
