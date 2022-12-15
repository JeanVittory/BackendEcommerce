import { serviceProductDB } from '../factory/factoryDaos.js';
import { productsDTO } from '../dto/mongo/productDto.dto.js';
import env from '../config/env.config.js';

class ProductService {
  constructor() {}

  static async save(newProduct) {
    const productAddedResponse = await serviceProductDB.save(newProduct);
    return productAddedResponse;
  }

  static async getAll() {
    const productRetrieved = await serviceProductDB.getAll();
    const responseProductDTO = productsDTO(productRetrieved);
    return responseProductDTO;
  }

  static async getByName(nameProduct) {
    const productRetrieved = await serviceProductDB.getByName(nameProduct);
    const responseProductDTO = productsDTO(productRetrieved);
    return responseProductDTO;
  }

  static async getById(id) {
    try {
      const productRetrieved = await serviceProductDB.getById(id);
      if (productRetrieved instanceof Error) throw productRetrieved;
      const responseProductDTO = productsDTO(productRetrieved);
      return responseProductDTO;
    } catch (error) {
      return error;
    }
  }

  static async updateById(id, dataToUpdate) {
    try {
      const responseFromUpdate = await serviceProductDB.updateById(id, dataToUpdate);
      if (responseFromUpdate instanceof Error) throw responseFromUpdate;
      if (env.DATABASE_TO_USE === 'mongo') return responseFromUpdate.modifiedCount;
      return responseFromUpdate;
    } catch (error) {
      return error;
    }
  }

  static async deleteById(idProduct) {
    try {
      const responseFromDelete = await serviceProductDB.deleteById(idProduct);
      if (responseFromDelete instanceof Error) throw responseFromDelete;
      if (env.DATABASE_TO_USE === 'mongo') {
        const responseFromProductDTO = productsDTO(responseFromDelete);
        return responseFromProductDTO;
      } else {
        return responseFromDelete;
      }
    } catch (error) {
      return error;
    }
  }

  static async deleteAll() {
    try {
      await serviceProductDB.deleteAll();
    } catch (error) {
      return error;
    }
  }
}

export { ProductService };
