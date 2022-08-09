import { mutationType } from "nexus";
import { addBook } from "./addBook";
import { deleteBook } from "./deleteBook";
import { updateBook } from "./updateBook";

export const Mutation = mutationType({
  definition(t) {
    addBook(t);
    updateBook(t);
    deleteBook(t);
  },
});
