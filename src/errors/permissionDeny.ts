import { GraphQLError } from "graphql";

export class PermissionDenyError extends GraphQLError {
  constructor() {
    super("Permission Deny", {
      extensions: {
        code: "PERMISSION_DENY",
      },
    });
  }
}
