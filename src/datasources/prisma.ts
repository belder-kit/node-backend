import { PrismaClient } from "../../generated/prisma";

export class Prisma extends PrismaClient {
  initialize() {}
}

export const prisma = new Prisma();
