import { Client, ClientOptions } from "minio";
import { ReadStream } from "fs";
import invariant from "invariant";

const BUCKET_NAME = "images";
const BUCKET_POLICY = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "AddPerm",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
    },
  ],
};

export class MediaStore extends Client {
  constructor(options: ClientOptions) {
    super(options);
  }

  async init() {
    const isCreatedBucket = await this.bucketExists(BUCKET_NAME);

    if (!isCreatedBucket) {
      await this.makeBucket(BUCKET_NAME, "");
      await this.setBucketPolicy(BUCKET_NAME, JSON.stringify(BUCKET_POLICY));
    }
  }

  async uploadImage(imageStream: ReadStream, key: string) {
    return this.putObject(BUCKET_NAME, key, imageStream, {
      "Content-Type": "image/jpeg",
    });
  }
}

invariant(
  typeof process.env.MINIO_URL === "string",
  "MINIO_URL must be string"
);
invariant(
  typeof process.env.MINIO_USER === "string",
  "MINIO_USER must be string"
);
invariant(
  typeof process.env.MINIO_PASSWORD === "string",
  "MINIO_PASSWORD must be string"
);

// export const mediaStore = new MediaStore({
//   endPoint: process.env.MINIO_URL,
//   port: Number(process.env.MINIO_PORT),
//   useSSL: false,
//   accessKey: process.env.MINIO_USER,
//   secretKey: process.env.MINIO_PASSWORD,
// });

// mediaStore.init();
