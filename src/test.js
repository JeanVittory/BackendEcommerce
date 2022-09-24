import env from './config/env.config.js';

let serviceProductDB;
let serviceCartDB;
let serviceChatDB;

if (env.DATABASE_TO_USE === 'mongo') {
  const { ProductsDaoMongoService } = await import(
    './daos/daosMongoDB/product.daos.js'
  );
  const { CartDaoMongoService } = await import(
    './daos/daosMongoDB/cart.daos.js'
  );
  const { ChatServices } = await import('./services/chat.services.js');
  const { productsSchema } = await import('./models/productsMongo.models.js');
  const { cartSchema } = await import('./models/cartMongo.models.js');
  const chatConfig = await import('./config/databases.config.js');

  serviceChatDB = new ChatServices(chatConfig.sqliteOpt, 'chatMessages');
  serviceProductDB = new ProductsDaoMongoService('products', productsSchema);
  serviceCartDB = new CartDaoMongoService('cart', cartSchema);
}

if (env.DATABASE_TO_USE === 'firestore') {
  const { ProductsFirebaseDaos } = await import(
    './daos/daosFirebase/productsFirebase.daos.js'
  );
  const { CartFirebaseDaos } = await import(
    './daos/daosFirebase/cartFirebase.daos.js'
  );
  const { ChatServices } = await import('./services/chat.services.js');
  const chatConfig = await import('./config/databases.config.js');
  serviceChatDB = new ChatServices(chatConfig.sqliteOpt, 'chatMessages');
  serviceProductDB = new ProductsFirebaseDaos('products');
  serviceCartDB = new CartFirebaseDaos('carts');
}

export { serviceProductDB, serviceCartDB, serviceChatDB };
