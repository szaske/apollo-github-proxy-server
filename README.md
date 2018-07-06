# Github Proxy GraphQL Server
Developed by [szaske](https://github.com/szaske)

A GraphQL server that proxies the [Github GraphQL service](https://developer.github.com/v4/). The server accepts GraphQL queries from clients and resolves them by passing the queries on to Github's own service. If you're looking for code examples of a proxy GraphQL server this repo will be helpful to you. Unique working code that can be found here includes:

* How to construct a github GraphQL query using node-fetch, including creating authorization headers and passing custom variables
* A design pattern for transforming the query data before send it along to clients

#### Getting Started

Like most development projects this code requires that you have some basic development tools installed on your development system; Git, Node.js and NPM.  You'll also need a Github access token and and Apollo Engine API-KEY.  You can find the instructions for creating a Github token [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), and instructions for creating an Apollo Engine API-KEY [here](https://www.apollographql.com/engine)


### Install

```bash
git clone https://github.com/szaske/apollo-github-proxy-server.git
cd apollo-github-proxy-server
npm install
```

Create a file called .env in the projects root folder
```bash
touch .env
```

This is where you'll store your Github access token and Engine API-KEY.  Edit the file to include these lines:
```
GITHUB_TOKEN=[Put your access token here without brackets]
ENGINE_API_KEY=[Put your full Engine API-KEY here]
```

Now the server should run.

```bash
npm start
```

If you want to explore the servers functionality you can open [http://localhost:4000/graphiql](http://localhost:4000/graphiql)

### Built With

* [GraphQL](https://github.com/graphql/graphql-js) - The JavaScript reference implementation for GraphQL
* [Apollo Server Express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) - A GraphQL server built on Express
* [node-fetch](https://github.com/bitinn/node-fetch) - a window.fetch compatible API on Node.js

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details