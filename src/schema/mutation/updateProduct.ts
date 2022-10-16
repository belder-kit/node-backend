import { intArg, list, nullable, ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull, stringArg } from "nexus";
import { authFullAccess } from "../../auth/fullAccess";

export function updateProduct(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("updateProduct", {
    type: "Product",
    args: {
      id: nonNull(stringArg()),
      name: nullable(stringArg()),
      description: nullable(stringArg()),
      images: nullable(list(nonNull(stringArg()))),
      currency: nullable(stringArg()),
      amount: nullable(intArg()),
    },
    resolve(
      _,
      { id, name, description, images, amount, currency },
      { prisma, user }
    ) {
      authFullAccess(user);

      return prisma.product.update({
        where: { id },
        data: {
          name: name || undefined,
          description,
          images: images || undefined,
          amount: amount || undefined,
          currency,
        },
      });
    },
  });
}
