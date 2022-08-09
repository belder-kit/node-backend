import { prisma } from "./prisma";
import { snowflakeId } from "./snowflakeid";

export const dataSources = () => ({
  prisma,
  snowflakeId,
});

export type DataSources = ReturnType<typeof dataSources>;
