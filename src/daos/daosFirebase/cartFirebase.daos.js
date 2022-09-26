import { FirestoreService } from '../../services/firestore.service.js';
import { appFirestore } from '../../config/firebase/products.firebase.config.js';
import { ErrorHandler } from '../../tools/errorHandler.tools.js';
import pkg from 'firebase-admin';
const { firestore } = pkg;

class CartFirebaseDaos extends FirestoreService {
  constructor(nameCollection) {
    super(nameCollection);
  }

  async createCart() {
    try {
      const db = appFirestore.firestore();
      const productAddedResponse = await db
        .collection(this.nameCollection)
        .add({
          date: Date.now(),
        });
      return { idCart: productAddedResponse.id };
    } catch (error) {
      error;
    }
  }
  async saveProductOnCart(idCart, newProduct) {
    try {
      const db = appFirestore.firestore();
      const isInDb = await db.collection(this.nameCollection).doc(idCart).get();
      if (!isInDb.exists) {
        throw new ErrorHandler({
          status: 404,
          message: "The cart don't exist in the database",
        });
      }
      await db
        .collection(this.nameCollection)
        .doc(idCart)
        .update({
          products: firestore.FieldValue.arrayUnion(newProduct),
        });
    } catch (error) {
      return error;
    }
  }

  async deleteProductFromCart(idCart, idProduct) {
    try {
      const db = appFirestore.firestore();
      const productToBeDeleted = (
        await db.collection(this.nameCollection).doc(idCart).get()
      ).data();
      const dataToArray = new Array(productToBeDeleted.products).flat();
      const newDataUpdated = dataToArray.filter((doc) => doc._id !== idProduct);
      await db
        .collection(this.nameCollection)
        .doc(idCart)
        .update({ products: newDataUpdated });
    } catch (error) {
      return error;
    }
  }
}

export { CartFirebaseDaos };
