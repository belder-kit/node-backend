import {
  intArg,
  list,
  nullable,
  ObjectDefinitionBlock,
  stringArg,
} from "nexus/dist/core";
import { nonNull } from "nexus";
import { authFullAccess } from "../../auth/fullAccess";

export function createProduct(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("createProduct", {
    type: "Product",
    args: {
      name: nonNull(stringArg()),
      description: nullable(stringArg()),
      images: nullable(list(nonNull(stringArg()))),
      currency: nullable(stringArg()),
      amount: nonNull(intArg()),
    },
    resolve(
      _,
      { name, description, images, amount, currency },
      { prisma, user }
    ) {
      authFullAccess(user);

      return prisma.product.create({
        data: {
          amount,
          name,
          currency,
          description,
          images: images || [],
        },
      });
    },
  });
}
