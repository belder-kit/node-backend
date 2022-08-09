import { queryType } from "nexus";
import { books } from "./books";

export const Query = queryType({
  definition(t) {
    books(t);
  },
});
