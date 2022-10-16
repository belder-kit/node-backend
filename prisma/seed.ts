import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      permisions: "FullAccess",
      tokens: {
        create: {
          id: "admin-token",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      permisions: "User",
      tokens: {
        create: {
          id: "user-token",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
