import { objectType } from "nexus";

export const Book = objectType({
  name: "Book",
  definition(t) {
    t.field("id", {
      type: "BigInt",
    });
    t.string("title");
    t.string("author");
  },
});
