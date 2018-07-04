import { GithubGraphQL, GithubGraphQLSearch } from './connectors';
import { mocks } from './mocks';

const resolvers = {
  Query: {
    author(root, args) {
      return { id: 1, firstName: 'Hello', lastName: 'World' };
    },
    allAuthors() {
      return [{ id: 1, firstName: 'Hello', lastName: 'World' }];
    },
    repos(root, args, ctx, info){
      return GithubGraphQL.getRepos(args)
    },
    search(root, args) {
      console.log("sending: " + args.count + " Repos + owner data")
      return GithubGraphQLSearch.getRepos(args)
    }
  },
  Author: {
    posts(author) {
      return [
        { id: 1, title: 'A post', text: 'Some text', views: 2 },
        { id: 2, title: 'Another post', text: 'Some other text', views: 200 }
      ];
    }
  },
  Post: {
    author(post) {
      return { id: 1, firstName: 'Hello', lastName: 'World' };
    }
  },
};

export default resolvers;