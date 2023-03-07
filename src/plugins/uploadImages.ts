// import busboy from "busboy";
// import { FastifyReply, FastifyRequest } from "fastify";
// import { mediaStore } from "../datasources/mediaStore";
// import { prisma } from "../datasources/prisma";
// import cuid from "cuid";
// import sharp from "sharp";
// import { auth } from "./auth";

// const MIME_TYPES = ["image/jpeg", "image/png"];

// export async function uploadImages(req: FastifyRequest, reply: FastifyReply) {
//   const user = await auth(req);

//   if (!user) {
//     return reply.code(401).send("401 Unauthorize error");
//   }

//   const parser = busboy({
//     headers: req.headers,
//     limits: {
//       fieldSize: 1024 * 1024 * 15,
//       fields: 2, // Only operations and map.
//       fileSize: 1024 * 1024 * 15,
//       files: 10,
//     },
//   });
//   const ids: { id: string }[] = [];

//   parser.on("file", async (name, file, info) => {
//     const { mimeType, filename } = info;

//     if (!MIME_TYPES.includes(mimeType)) {
//       return reply.code(400).send("Only JPG or PNG");
//     }

//     const resizeWidth = Math.min(Number(filename) || 512, 1080);
//     const imageTransform = sharp()
//       .resize({
//         width: resizeWidth,
//       })
//       .jpeg({
//         progressive: true,
//       })
//       .rotate();
//     const imageStream = file.pipe(imageTransform);

//     const id = cuid();
//     ids.push({ id });
//     const imageLink = `${id}.jpg`;
//     console.log(imageLink);

//     await mediaStore.uploadImage(imageStream as any, imageLink);
//   });
//   parser.on("close", async () => {
//     await prisma.images.createMany({
//       data: ids,
//     });
//     reply.send(ids);
//   });
//   parser.on("error", async () => {
//     reply.code(400).send("Unknown error");
//   });
//   req.raw.pipe(parser);

//   // Hack wich help wait all events
//   await (() => new Promise<void>((res) => {}))();
// }
