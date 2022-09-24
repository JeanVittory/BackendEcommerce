import { FirestoreService } from '../../services/productsFirestore.service.js';

class ProductsFirebaseDaos extends FirestoreService {
  constructor(nameCollection) {
    super(nameCollection);
  }
}

export { ProductsFirebaseDaos };
