import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import compression from 'compression';
import bodyParser from 'body-parser';
import schema from './data/schema';
const { ApolloEngine } = require('apollo-engine');
const cors = require('cors')
const dotenv = require('dotenv').config()

const GRAPHQL_PORT = 4000;

const graphQLServer = express();

graphQLServer.use(cors()) // not having cors enabled will cause an access control error
graphQLServer.use(compression());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema,
  context: {},
  tracing: true,
  cacheControl: true
 }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY
});

engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer,
});

// graphQLServer.listen(GRAPHQL_PORT, () =>
//   console.log(
//     `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql. Go Huskies!`
//   )
// );
