import { doMongoConnection } from '../../config/mongodb.config.js';
import mongoose from 'mongoose';
import { ErrorHandler } from '../../tools/errorHandler.tools.js';
import { CartDTO } from '../../dto/mongo/cartDto.dto.js';

let instance = null;

class CartDaoMongoService {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  static getInstance(collectionName, schema) {
    if (!instance) {
      instance = new CartDaoMongoService(collectionName, schema);
    }
    return instance;
  }

  async createCart() {
    try {
      const dbConnection = await doMongoConnection();
      const newCart = new this.collection();
      const productAddedResponse = await newCart.save();
      await dbConnection.close();
      const responseDTO = { ...new CartDTO(productAddedResponse) };
      return responseDTO;
    } catch (error) {
      return error;
    }
  }

  async saveProductOnCart(idCart, newProduct) {
    try {
      const dbConnection = await doMongoConnection();
      console.log('dao', newProduct);
      if (mongoose.isValidObjectId(idCart)) {
        const responseFromAdded = await this.collection.updateOne(
          { _id: idCart },
          { $addToSet: { product: newProduct } }
        );
        await dbConnection.close();

        return { message: 'Product added' };
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
      if (mongoose.isValidObjectId(idCart) & mongoose.isValidObjectId(idProduct)) {
        const dbConnection = await doMongoConnection();
        const isProductInCart = await this.collection.findOne({ 'product.id': idProduct });
        if (!isProductInCart) {
          throw new ErrorHandler({
            status: 404,
            message: "The product doesn't exist in your cart",
          });
        }
        const res = await this.collection.updateOne(
          { _id: idCart },
          { $pull: { product: { id: idProduct } } }
        );
        await dbConnection.close();
        return { message: 'Product deleted' };
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

  async getById(id) {
    try {
      const dbConnection = await doMongoConnection();
      if (mongoose.isValidObjectId(id)) {
        const objectId = mongoose.Types.ObjectId(id);
        const productRetrieved = await this.collection.findOne({
          _id: objectId,
        });

        await dbConnection.close();
        if (productRetrieved === null) {
          throw new ErrorHandler({
            status: 404,
            message: "Product doesn't exist",
          });
        }
        const responseDTO = { ...new CartDTO(productRetrieved) };
        return responseDTO;
      } else {
        throw new ErrorHandler({
          status: 400,
          message:
            'Invalid ID product, mongo only accept 12 bytes, a string of 24 hex characters or an integer id value',
        });
      }
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const dbConnection = await doMongoConnection();
      const objectId = mongoose.Types.ObjectId(id);
      dbConnection.close();
      const responseFromDeletion = await this.collection.findByIdAndDelete({
        _id: objectId,
      });
      if (responseFromDeletion === null) {
        throw new ErrorHandler({
          status: 404,
          message: "Product doesn't exist",
        });
      }
    } catch (error) {
      return error;
    }
  }
}

export { CartDaoMongoService };
