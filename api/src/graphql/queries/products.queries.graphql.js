import { GraphQLID, GraphQLList, GraphQLUnionType } from 'graphql';
import { ProductService } from '../../services/product.services.js';
import { ProductType, ProductMessageError, unionType } from '../typeDefs/products.typedefs.js';

const getProducts = {
  type: new GraphQLList(ProductType),
  resolve: async (_, args) => {
    const response = await ProductService.getAll();
    return response;
  },
};

const getProductById = {
  type: unionType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (_, args) => {
    const { id } = args;
    const response = await ProductService.getById(id);
    if (response instanceof Error) return { status: response.status, message: response.message };
    return response;
  },
};

export { getProducts, getProductById };
