import { makeSchema } from "nexus";
import { resolve } from "path";
import { Book } from "./types/book";
import { Mutation } from "./mutation";
import { Query } from "./query";

export const schema = makeSchema({
  types: {
    Query,
    Book,
    Mutation,
  },
  sourceTypes: {
    modules: [
      {
        module: resolve("./src/generated/prisma/index.d.ts"),
        alias: "prismaClient",
      },
    ],
    mapping: {
      BigInt: "bigint",
    },
  },
  outputs: process.env.SKIP_GENERATE_NEXUS
    ? undefined
    : {
        schema: resolve("./src/generated/graphql/index.graphql"),
        typegen: resolve("./src/generated/nexus/index.ts"),
      },
  contextType: {
    module: resolve("./src/context/index.ts"),
    export: "Context",
  },
});
