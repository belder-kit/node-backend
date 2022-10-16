import { fastifyApolloDrainPlugin } from "@luchanso/apollo-fastify";
import { ApolloServerPlugin, BaseContext } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { FastifyInstance } from "fastify";

const plugins: ApolloServerPlugin<BaseContext>[] = [
  {
    requestDidStart: async () => {
      return {
        async didEncounterErrors(ctx) {
          ctx.logger.error(ctx.errors);
        },
      };
    },
  },
];

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

export function createPlugins(
  fastify: FastifyInstance
): ApolloServerPlugin<BaseContext>[] {
  plugins.push(fastifyAppClosePlugin(fastify));
  plugins.push(fastifyApolloDrainPlugin(fastify));

  if (process.env.NODE_ENV !== "production") {
    plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));
  }

  return plugins;
}
