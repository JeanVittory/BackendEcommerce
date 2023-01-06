import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getProducts, getProductById } from './queries/products.queries.graphql.js';
import { postProduct, deleteProduct, updateProduct } from './mutations/products.mutations.js';

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getProducts,
    getProductById,
  },
});

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    postProduct,
    deleteProduct,
    updateProduct,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export { schema };
