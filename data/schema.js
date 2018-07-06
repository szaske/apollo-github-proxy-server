import resolvers from './resolvers';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
type Query {
  search(count: Int): Search @cacheControl(maxAge: 60)
}

type Search {
  count: Int
  repos: [Repo!]!
}

type Repo @cacheControl(maxAge: 240){
  name: String
  id: String
  owner: Owner
}

type Owner @cacheControl(maxAge: 60){
  login: String
  avatarUrl: String
  followers: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Adds mocks
// addMockFunctionsToSchema({ schema, mocks });

export default schema;
