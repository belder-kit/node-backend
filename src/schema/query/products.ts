// import { nullable, ObjectDefinitionBlock, stringArg } from "nexus/dist/core";

// export function products(t: ObjectDefinitionBlock<"Query">) {
//   t.list.field("products", {
//     type: "Product",
//     args: {
//       cursor: nullable(stringArg()),
//     },
//     resolve(root, { cursor }, { prisma }) {
//       return prisma.product.findMany({
//         skip: 1,
//         take: 30,
//         cursor: {
//           id: cursor || undefined,
//         },
//         orderBy: {
//           id: "asc",
//         },
//       });
//     },
//   });
// }
