import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true },
    name: { type: String },
    lastname: { type: String },
    age: { type: String },
    alias: { type: String },
    avatar: { type: String },
    date: { type: String },
  },
  message: { type: String, required: true },
});

export { chatSchema };
