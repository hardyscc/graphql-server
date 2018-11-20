import 'reflect-metadata';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createTypeormConn } from './createTypeormConn';
import { createSchema } from './createSchema';

const startServer = async () => {
  await createTypeormConn();

  const server = new ApolloServer({ schema: createSchema() });

  const app = express();
  server.applyMiddleware({ app });

  const port = 4000;

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
