import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../generated/prisma";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

function getToken(request: FastifyRequest) {
  return request.headers.authorization?.split(" ")?.[1];
}

export const dataSources = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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

  return {
    user,
    prisma,
    stripe,
  };
};

export type DataSources = Awaited<ReturnType<typeof dataSources>>;
