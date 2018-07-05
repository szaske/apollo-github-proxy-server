import { GithubGraphQL, GithubGraphQLSearch } from './connectors';
import { mocks } from './mocks';

const resolvers = {
  Query: {
    search(root, args) {
      return GithubGraphQLSearch.getRepos(args)
    }
  }
};

export default resolvers;