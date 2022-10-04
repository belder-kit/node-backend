import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTrace,
  PluginDefinition,
} from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { FastifyInstance } from "fastify";

const plugins: PluginDefinition[] = [
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

export function createPlugins(app: FastifyInstance): PluginDefinition[] {
  plugins.push(fastifyAppClosePlugin(app));
  plugins.push(ApolloServerPluginDrainHttpServer({ httpServer: app.server }));

  if (process.env.NODE_ENV !== "production") {
    plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));
    plugins.push(ApolloServerPluginInlineTrace());
  }

  return plugins;
}
