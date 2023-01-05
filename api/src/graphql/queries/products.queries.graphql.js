import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ProductType } from '../typeDefs/products.typedefs.js';

const getProducts = {
  type: GraphQLString,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: (_, args) => {
    const { id } = args;
    if (!id) return 'list of products';
    return 'single product';
  },
};

export { getProducts };
