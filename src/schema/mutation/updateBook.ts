import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull } from "nexus";

export function updateBook(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("updateBook", {
    type: "Book",
    args: { id: nonNull("BigInt"), title: "String", author: "String" },
    resolve(_, { title, author, id }, { dataSources: { prisma } }) {
      return prisma.book.update({
        where: { id },
        data: { title, author },
      });
    },
  });
}
