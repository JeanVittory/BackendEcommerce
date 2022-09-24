import { MongoService } from '../../services/mongo.services.js';

class ProductsDaoMongoService extends MongoService {
  constructor(collectionName, schema) {
    super(collectionName, schema);
  }
}

export { ProductsDaoMongoService };
