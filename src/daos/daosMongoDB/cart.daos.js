import { doMongoConnection } from '../../config/mongodb.config.js';
import { MongoService } from '../../services/mongo.services.js';
import mongoose from 'mongoose';
import { ErrorHandler } from '../../tools/errorHandler.tools.js';

class CartDaoMongoService extends MongoService {
  constructor(collectionName, schema) {
    super(collectionName, schema);
  }

  async createCart() {
    try {
      const dbConnection = await doMongoConnection();
      const newCart = new this.collection();
      const productAddedResponse = await newCart.save();
      await dbConnection.close();
      return productAddedResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductOnCart(idCart, newProduct) {
    try {
      const dbConnection = await doMongoConnection();
      if (mongoose.isValidObjectId(idCart)) {
        await this.collection.updateOne(
          { _id: idCart },
          { $addToSet: { product: newProduct } }
        );
        await dbConnection.close();
        return;
      } else {
        throw new ErrorHandler({
          status: 400,
          message:
            'Invalid ID cart, mongo only accept 12 bytes, a string of 24 hex characters or an integer as id value',
        });
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProductFromCart(idCart, idProduct) {
    try {
      if (
        mongoose.isValidObjectId(idCart) & mongoose.isValidObjectId(idProduct)
      ) {
        const dbConnection = await doMongoConnection();
        await this.collection.updateOne(
          { _id: idCart },
          { $pull: { product: { _id: idProduct } } }
        );
        await dbConnection.close();
      } else {
        throw new ErrorHandler({
          status: 400,
          message:
            'Please check yor id cart and id product, mongo only accept 12 bytes, a string of 24 hex characters or an integer id value',
        });
      }
    } catch (error) {
      return error;
    }
  }
}

export { CartDaoMongoService };
