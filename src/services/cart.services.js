import { serviceCartDB } from '../factory/factoryDaos.js';

class CartService {
  constructor() {}

  static async createCart() {
    const productAddedResponse = await serviceCartDB.createCart();

    return productAddedResponse;
  }

  static async getById(id) {
    const productRetrieved = await serviceCartDB.getById(id);
    return productRetrieved;
  }

  static async saveProductOnCart(idCart, newProduct) {
    await serviceCartDB.saveProductOnCart(idCart, newProduct);
  }

  static async deleteProductFromCart(idCart, idProduct) {
    const responseFromDelete = await serviceCartDB.deleteProductFromCart(idCart, idProduct);
    return responseFromDelete;
  }

  static async deleteById(id) {
    const responseFromDelete = await serviceCartDB.deleteById(id);
    return responseFromDelete;
  }
}

export { CartService };
