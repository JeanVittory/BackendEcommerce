import { serviceProductDB } from '../factory/factoryDaos.js';
import { productsDTO } from '../dto/mongo/productDto.dto.js';

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
    const productRetrieved = await serviceProductDB.getById(id);
    const responseProductDTO = productsDTO(productRetrieved);
    return responseProductDTO;
  }

  static async updateById(id, dataToUpdate) {
    await serviceProductDB.updateById(id, dataToUpdate);
  }

  static async deleteById(idProduct) {
    await serviceProductDB.deleteById(idProduct);
  }
}

export { ProductService };
