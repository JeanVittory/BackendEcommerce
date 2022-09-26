import { appFirestore } from '../config/firebase/products.firebase.config.js';

class ChatFirebaseService {
  #collection;
  constructor(nameCollection) {
    this.#collection = nameCollection;
  }

  async getAllMessages() {
    try {
      const db = appFirestore.firestore();
      const snapShot = await db.collection(this.#collection).get();
      const arrayMessages = [];
      snapShot.forEach((doc) => {
        arrayMessages.push({ ...doc.data() });
      });
      return arrayMessages;
    } catch (error) {
      console.log('Error en getAll del chat en Firestore', error);
    }
  }

  async addMessage(message) {
    try {
      const db = appFirestore.firestore();
      await db.collection(this.#collection).add(message);
    } catch (error) {
      console.log('Error en addMessage de firestore', error);
    }
  }
}

export { ChatFirebaseService };
