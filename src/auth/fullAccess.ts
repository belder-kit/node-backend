import { PermissionDenyError } from "../errors/permissionDeny";
import { User } from "../generated/prisma";

/**
 * Check user for FullAccess permission. When user don't have permission throw PermissionDenyError
 * @param user
 */
export function authFullAccess(user: User | undefined) {
  if (!user?.permisions.includes("FullAccess")) {
    throw new PermissionDenyError();
  }
}
