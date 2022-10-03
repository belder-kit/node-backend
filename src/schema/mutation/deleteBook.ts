import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull, stringArg } from "nexus";

export function deleteBook(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("deleteBook", {
    type: "String",
    args: { id: nonNull(stringArg()) },
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
