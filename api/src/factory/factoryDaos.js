import env from '../config/env.config.js';
import { args } from '../config/yargs.config.js';

let serviceProductDB;
let serviceCartDB;
let serviceChatDB;
let serviceRegisterUsers;
let serviceRegisterAdmin;

if (args.dao === 'mongo') {
  const { ProductsDaoMongoService } = await import('../daos/daosMongoDB/product.daos.js');
  const { CartDaoMongoService } = await import('../daos/daosMongoDB/cart.daos.js');
  const { RegisterUsers } = await import('../daos/daosMongoDB/registerUsersMongo.daos.js');
  const { RegisterAdmins } = await import('../daos/daosMongoDB/adminsMongo.daos.js');
  const { ChatMongoService } = await import('../daos/daosMongoDB/chatMongo.daos.js');
  const { productsSchema } = await import('../models/productsMongo.models.js');
  const { cartSchema } = await import('../models/cartMongo.models.js');
  const { chatSchema } = await import('../models/chatMongo.models.js');
  const { usersSchema } = await import('../models/users.models.js');
  const { adminsSchema } = await import('../models/admins.models.js');

  serviceChatDB = ChatMongoService.getInstance('chatMessages', chatSchema);
  serviceProductDB = ProductsDaoMongoService.getInstance('products', productsSchema);
  serviceCartDB = CartDaoMongoService.getInstance('cart', cartSchema);
  serviceRegisterUsers = RegisterUsers.getInstance('users', usersSchema);
  serviceRegisterAdmin = RegisterAdmins.getInstance('admins', adminsSchema);
}

if (env.DATABASE_TO_USE === 'firestore') {
  const { ProductsFirebaseDaos } = await import('../daos/daosFirebase/productsFirebase.daos.js');
  const { CartFirebaseDaos } = await import('../daos/daosFirebase/cartFirebase.daos.js');
  const { ChatFirebaseService } = await import('../daos/daosFirebase/chatFirebase.services.js');
  serviceChatDB = ChatFirebaseService.getInstance('chatMessages');
  serviceProductDB = ProductsFirebaseDaos.getInstance('products');
  serviceCartDB = CartFirebaseDaos.getInstance('carts');
}

if (env.DATABASE_TO_USE === 'sql') {
  const { ChatServices } = await import('../services/chatSql.services.js');
  const configSQL = await import('../config/databases.config.js');
  const { ProductsServices } = await import('../daos/daosSQL/sql.services.js');
  serviceChatDB = new ChatServices(configSQL.chatDbOpt, 'chatMessages');
  serviceProductDB = new ProductsServices(configSQL.databaseOpt, env.DATABASE_SQL);
}

export {
  serviceProductDB,
  serviceCartDB,
  serviceChatDB,
  serviceRegisterUsers,
  serviceRegisterAdmin,
};
