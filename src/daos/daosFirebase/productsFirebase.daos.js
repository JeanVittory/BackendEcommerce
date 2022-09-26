import { FirestoreService } from '../../services/firestore.services.js';

class ProductsFirebaseDaos extends FirestoreService {
  constructor(nameCollection) {
    super(nameCollection);
  }
}

export { ProductsFirebaseDaos };
