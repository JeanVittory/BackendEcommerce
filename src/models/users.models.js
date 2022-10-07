import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export { usersSchema };
