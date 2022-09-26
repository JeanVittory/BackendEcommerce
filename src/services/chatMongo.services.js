import mongoose from 'mongoose';
import { doMongoConnection } from '../config/mongodb.config.js';

class ChatMongoService {
  #collection;
  constructor(collectionName, schema) {
    this.#collection = mongoose.model(collectionName, schema);
  }

  async getAllMessages() {
    try {
      const db = await doMongoConnection();
      const allMessages = await this.#collection.find();
      await db.close();
      return allMessages;
    } catch (error) {
      console.log('error en getAllMessage de chatMongo', error);
    }
  }

  async addMessage(message) {
    try {
      if (message) {
        const db = await doMongoConnection();
        const newMessage = new this.#collection(message);
        const responseMessageAdded = await newMessage.save();
        await db.close();
        return {};
      }
    } catch (error) {
      console.log('error en addMessage de mongo', error);
    }
  }
}

export { ChatMongoService };
