import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull, stringArg } from "nexus";
import { authFullAccess } from "../../auth/fullAccess";

export function deleteProduct(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("deleteProduct", {
    type: "Boolean",
    args: { id: nonNull(stringArg()) },
    async resolve(_, { id }, { prisma, user }) {
      authFullAccess(user);

      await prisma.product.delete({
        where: {
          id,
        },
      });

      return true;
    },
  });
}
