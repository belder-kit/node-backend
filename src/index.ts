import fastifyCookie from "@fastify/cookie";
import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { ApolloServer } from "@apollo/server";
import invariant from "invariant";
import { DataSources, dataSources } from "./datasources";
import { createPlugins } from "./plugins";
import { schema } from "./schema";
import fastifyApollo from "@luchanso/apollo-fastify";

const PORT = Number(process.env.PORT) || 80;

// function fastifyConfig(fastify: FastifyInstance) {
//   invariant(
//     process.env.SESSION_SECRET,
//     `Setup SESSION_SECRET for cookie (more 32 symbols)`
//   );

//   fastify.register(fastifyCookie, {
//     parseOptions: {
//       httpOnly: true,
//     },
//     secret: process.env.SESSION_SECRET,
//   });
// }

async function startApolloServer() {
  const fastify = Fastify({
    forceCloseConnections: true,
    logger: true,
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

  // fastifyConfig(fastify);

  await fastify.listen({
    port: PORT,
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer();
