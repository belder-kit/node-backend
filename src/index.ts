import "dotenv/config";
import Fastify from "fastify";
import { ApolloServer } from "@apollo/server";
import { DataSources, dataSources } from "./datasources";
import { createPlugins } from "./plugins";
import { schema } from "./schema";
import fastifyApollo from "@luchanso/apollo-fastify";
import { Logger } from "./plugins/logger";
import debug from "debug";
// import { uploadImages } from "./plugins/uploadImages";

const log = debug("application");

const PORT = Number(process.env.PORT) || 80;
async function startApolloServer() {
  const fastify = Fastify({
    forceCloseConnections: true,
    logger: process.env.NODE_ENV !== "production" && new Logger(),
  });

  const apollo = new ApolloServer<DataSources>({
    schema,
    csrfPrevention: true,
    plugins: createPlugins(fastify),
  });

  await apollo.start();

  fastify.register(fastifyApollo(apollo), {
    context: dataSources,
  });
  fastify.addContentTypeParser(
    "multipart/form-data",
    function (request, payload, done) {
      done(null);
    }
  );
  // fastify.post("/uploadImages", uploadImages);

  await fastify.listen({
    host: "0.0.0.0",
    port: PORT,
  });

  log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer();
