import { FirestoreService } from '../../services/firestore.service.js';

class ProductsFirebaseDaos extends FirestoreService {
  constructor(nameCollection) {
    super(nameCollection);
  }
}

export { ProductsFirebaseDaos };
