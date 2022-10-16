import { makeSchema } from "nexus";
import { resolve } from "path";
import * as types from "./types";
import { Mutation } from "./mutation";
import { Query } from "./query";

export const schema = makeSchema({
  types: {
    ...types,
    Query,
    Mutation,
  },
  sourceTypes: {
    modules: [
      {
        module: resolve("./src/generated/prisma/index.d.ts"),
        alias: "prismaClient",
      },
    ],
  },
  outputs: process.env.SKIP_GENERATE_NEXUS
    ? undefined
    : {
        schema: resolve("./src/generated/graphql/index.graphql"),
        typegen: resolve("./src/generated/nexus/index.ts"),
      },
  contextType: {
    module: resolve("./src/datasources/index.ts"),
    export: "DataSources",
  },
});
