import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { plugins } from "./plugins";
import { dataSources } from "./datasources";
import { schema } from "./schema";

const PORT = Number(process.env.PORT) || 80;

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer() {
  const app = fastify();

  const server = new ApolloServer({
    schema,
    dataSources,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ...plugins,
    ],
  });

  await server.start();
  app.register(server.createHandler());
  await app.listen({
    port: PORT,
  });
  console.log(
    `Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀 `
  );
}

startApolloServer();
