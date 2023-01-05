import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const ProductType = new GraphQLObjectType({
  name: 'product',
  fields: {
    id: {
      type: GraphQLID,
    },
    productName: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    thumbnail: {
      type: GraphQLString,
    },
  },
});

export { ProductType };
