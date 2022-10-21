import { FastifyRequest } from "fastify";
import { prisma } from "../datasources/prisma";
import { User } from "../generated/prisma";

function getToken(request: FastifyRequest) {
  return request.headers.authorization?.split(" ")?.[1];
}

export async function auth(request: FastifyRequest) {
  const token = getToken(request);
  let user: User | undefined = undefined;

  if (token) {
    user =
      (
        await prisma.token.findUnique({
          where: {
            id: token,
          },
          include: {
            User: true,
          },
        })
      )?.User || undefined;
  }

  return user;
}
