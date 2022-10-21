import { FastifyReply, FastifyRequest } from "fastify";
import { auth } from "../plugins/auth";
import { mediaStore } from "./mediaStore";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export const dataSources = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = await auth(request);

  return {
    user,
    prisma,
    stripe,
    mediaStore,
  };
};

export type DataSources = Awaited<ReturnType<typeof dataSources>>;
