import { queryType } from "nexus";
import { products } from "./products";

export const Query = queryType({
  definition(t) {
    products(t);
  },
});
