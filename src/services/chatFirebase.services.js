import { appFirestore } from '../config/firebase/products.firebase.config.js';
import { normalizeChatMessage } from '../tools/normalizr.tools.js';

class ChatFirebaseService {
  #collection;
  constructor(nameCollection) {
    this.#collection = nameCollection;
  }

  async getAllMessages() {
    try {
      const db = appFirestore.firestore();
      const snapShot = await db.collection(this.#collection).get();
      const dataToNormalize = {
        id: 'messages',
        messages: [],
      };
      snapShot.forEach((doc) => {
        dataToNormalize.messages.push({ id: doc.id, ...doc.data() });
      });
      const initialDataWeigth = JSON.stringify(dataToNormalize).length;
      const dataNormalized = normalizeChatMessage(dataToNormalize);
      return {
        dataToDenormalize: dataNormalized,
        initialWeigth: initialDataWeigth,
      };
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
