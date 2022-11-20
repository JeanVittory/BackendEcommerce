import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  address: { type: String },
  age: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export { usersSchema };
