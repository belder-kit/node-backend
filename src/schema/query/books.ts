import { ObjectDefinitionBlock } from "nexus/dist/core";

export function books(t: ObjectDefinitionBlock<"Query">) {
  t.list.field("books", {
    type: "Book",
    resolve(root, args, { dataSources: { prisma } }) {
      return prisma.book.findMany({
        take: 30,
      });
    },
  });
}
