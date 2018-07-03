import { FortuneCookie } from './connectors';

const resolvers = {
  Query: {
    author(root, args) {
      return { id: 1, firstName: 'Hello', lastName: 'World' };
    },
    allAuthors() {
      return [{ id: 1, firstName: 'Hello', lastName: 'World' }];
    },
    repos() {
      return [
        { name: 'RepoName-Hello' },
        { name: 'RepoName-World' } 
      ];
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
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
  Repo: {
    owner(repo){
      return { login: 'Repologin', avatarUrl: 'STZUrl' };
    }
  },
  Owner: {
    followers(owner) {
      return [
        { name: 'Bruce Banner'},
        { name: 'Tony Stark' }
      ];
    }
  }
};

export default resolvers;