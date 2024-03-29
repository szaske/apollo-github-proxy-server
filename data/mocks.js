import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => {
      return { firstName: args.firstName, lastName: args.lastName };
    },
  }),
  Repo: () => ({
    name: () => casual.string,
    Owner: () => ({
      login: () => casual.email,
      avatarUrl: () => casual.url,
      followers: () => casual.sentences(1)
    })
  }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

export default mocks;
