import { ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull } from "nexus";

export function subscribe(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("subscribe", {
    type: "ID",
    args: { email: nonNull("String") },
    async resolve(_, { email }, { prisma }) {
      return (
        await prisma.subscriber.create({
          data: {
            email,
          },
          select: {
            id: true,
          },
        })
      ).id;
    },
  });
}
