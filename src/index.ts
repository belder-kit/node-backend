import "dotenv/config";
import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { createPlugins } from "./plugins";
import { dataSources } from "./datasources";
import { schema } from "./schema";

const PORT = Number(process.env.PORT) || 80;

async function startApolloServer() {
  const app = fastify();

  const server = new ApolloServer({
    schema,
    dataSources,
    csrfPrevention: true,
    cache: "bounded",
    plugins: createPlugins(app),
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
