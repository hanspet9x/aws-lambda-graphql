import {ApolloServer} from 'apollo-server-lambda';
import {typeDefs} from './graphql/schema';
import {resolvers} from './graphql/resolver';
import {initDatabaseConnection} from './conf/db';
import ISDRepository from './repository';

initDatabaseConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    repos: new ISDRepository(),
  },
});

export const graphqlHandler = server.createHandler();
