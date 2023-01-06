import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';

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

const ProductMessageError = new GraphQLObjectType({
  name: 'ProductError',
  fields: {
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
  },
});

const unionType = new GraphQLUnionType({
  name: 'unions',
  types: [ProductMessageError, ProductType],
  resolveType: (value) => {
    if (value.status) return ProductMessageError;
    return ProductType;
  },
});

export { ProductType, ProductMessageError, unionType };
