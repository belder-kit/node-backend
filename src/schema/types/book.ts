import { objectType } from "nexus";

export const Book = objectType({
  name: "Book",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("author");
  },
});
