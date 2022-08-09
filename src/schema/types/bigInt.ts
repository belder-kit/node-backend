import { Kind } from "graphql";
import { scalarType } from "nexus";

export const BigIntScalar = scalarType({
  name: "BigInt",
  asNexusMethod: "bigint",
  description: "BigInt scalar type",

  parseValue(value: any) {
    return BigInt(value);
  },

  serialize(value: bigint) {
    return value.toString();
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return BigInt(ast.value);
    }
    return null;
  },
});
