import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull } from "nexus";

export function deleteBook(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("deleteBook", {
    type: "BigInt",
    args: { id: nonNull("BigInt") },
    async resolve(_, { id }, { dataSources: { prisma } }) {
      const { id: deletedId } = await prisma.book.delete({
        where: {
          id,
        },
      });

      return deletedId;
    },
  });
}
