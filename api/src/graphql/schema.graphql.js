import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getProducts, getProductById } from './queries/products.queries.graphql.js';

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getProducts,
    getProductById,
  },
});

// const rootMutation = new GraphQLObjectType({
//   name: 'RootMutation',
//   fields: {

//   },
// });

const schema = new GraphQLSchema({
  query: rootQuery,
  //mutation: rootMutation,
});

export { schema };
