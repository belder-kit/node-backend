import { objectType } from "nexus";
import * as np from "nexus-prisma";

export const User = objectType({
  name: np.User.$name,
  definition(t) {
    t.field(np.User.id);
  },
});
