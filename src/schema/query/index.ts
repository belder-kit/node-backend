import { queryType } from "nexus";
// import { products } from "./products";

// const createAccessCheck =
//   (actionName: string, describtion: string) => (roles: any) => {
//     return false;
//   };

// const checkAccess = createAccessCheck("users:read", "return all users");

export const Query = queryType({
  definition(t) {
    // products(t);
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(_, args, ctx) {
        const user = { permissions: [] };

        // checkAccess(user.permissions);

        return ctx.prisma.user.findMany();
      },
    });
  },
});
