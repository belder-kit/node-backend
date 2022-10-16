import { objectType } from "nexus";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nullable.string("description");
    t.list.string("images");
    t.nullable.string("currency");
    t.nullable.int("amount");
  },
});
