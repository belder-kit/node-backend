import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull } from "nexus";

export function addBook(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("addBook", {
    type: "Book",
    args: { title: nonNull("String"), author: nonNull("String") },
    resolve(_, { title, author }, { dataSources: { prisma } }) {
      return prisma.book.create({
        data: { title, author },
      });
    },
  });
}
