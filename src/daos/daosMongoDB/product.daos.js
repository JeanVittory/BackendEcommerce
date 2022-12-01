import mongoose from 'mongoose';
import { doMongoConnection } from '../../config/mongodb.config.js';
import { ErrorHandler } from '../../tools/errorHandler.tools.js';

let instance = null;

class ProductsDaoMongoService {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  static getInstance(collectionName, schema) {
    if (!instance) {
      instance = new ProductsDaoMongoService(collectionName, schema);
    }
    return instance;
  }

  async save(product) {
    try {
      const dbConnection = await doMongoConnection();
      const addDocument = new this.collection(product);
      const productAddedResponse = await addDocument.save();
      await dbConnection.close();
      return productAddedResponse._id;
    } catch (error) {
      console.log('error en createProduct', error);
    }
  }

  async getAll() {
    try {
      const dbConnection = await doMongoConnection();
      const productsRetrieved = await this.collection.find();
      await dbConnection.close();
      return productsRetrieved;
    } catch (error) {
      return error;
    }
  }

  async getByName(nameProduct) {
    try {
      const dbConnection = await doMongoConnection();
      const productRetrieved = await this.collection.findOne({
        productName: nameProduct,
      });
      await dbConnection.close();
      return productRetrieved;
    } catch (error) {}
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
        return productRetrieved;
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

  async updateById(id, dataToUpdate) {
    try {
      if (dataToUpdate) {
        const dbConnection = await doMongoConnection();
        const arrayFilteredDataProduct = Object.entries(dataToUpdate).filter(
          ([key, value]) => value !== null
        );
        const dataProductToUpdate = Object.fromEntries(arrayFilteredDataProduct);
        await this.collection.updateOne({ _id: id }, { $set: dataProductToUpdate });
        await dbConnection.close();
      }
    } catch (error) {
      console.log('error update', error);
    }
  }

  async deleteById(idProduct) {
    try {
      const dbConnection = await doMongoConnection();
      const objectId = mongoose.Types.ObjectId(idProduct);
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

export { ProductsDaoMongoService };
