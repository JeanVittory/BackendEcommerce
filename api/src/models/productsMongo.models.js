import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  { versionKey: false }
);

export { productsSchema };
