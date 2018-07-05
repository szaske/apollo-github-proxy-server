import resolvers from './resolvers';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';

const typeDefs = `
type Query {
  repos: [Repo!]!
  search(count: Int): Search
}

type Search {
  count: Int
  repos: [Repo!]!
}

type Repo {
  name: String
  owner: Owner
}

type Owner {
  login: String
  avatarUrl: String
  followers: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Adds mocks
// addMockFunctionsToSchema({ schema, mocks });

export default schema;
