import { prisma } from "./prisma";

export const dataSources = () => ({
  prisma,
});

export type DataSources = ReturnType<typeof dataSources>;
