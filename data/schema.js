import resolvers from './resolvers';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks';

const typeDefs = `
type Query {
  testString: String
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  repos: [Repo!]!
  getFortuneCookie: String # we'll use this later
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
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
