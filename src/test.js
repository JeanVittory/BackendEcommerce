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
  const { ChatMongoService } = await import('./services/chatMongo.services.js');
  const { productsSchema } = await import('./models/productsMongo.models.js');
  const { cartSchema } = await import('./models/cartMongo.models.js');
  const { chatSchema } = await import('./models/chatMongo.models.js');

  serviceChatDB = new ChatMongoService('chatMessages', chatSchema);
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
  const { ChatFirebaseService } = await import(
    './services/chatFirebase.services.js'
  );
  serviceChatDB = new ChatFirebaseService('chatMessages');
  serviceProductDB = new ProductsFirebaseDaos('products');
  serviceCartDB = new CartFirebaseDaos('carts');
}

if (env.DATABASE_TO_USE === 'sql') {
  const { ChatServices } = await import('./services/chatSql.services.js');
  const configSQL = await import('./config/databases.config.js');
  const { ProductsServices } = await import('./services/sql.services.js');
  serviceChatDB = new ChatServices(configSQL.chatDbOpt, 'chatMessages');
  serviceProductDB = new ProductsServices(
    configSQL.databaseOpt,
    env.DATABASE_SQL
  );
}

export { serviceProductDB, serviceCartDB, serviceChatDB };
