import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  productName: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

export { productsSchema };
