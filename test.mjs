// test.mjs
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a dummy test document
    const testDoc = await prisma.test.create({
      data: { name: "Prisma Test", createdAt: new Date() },
    });

    console.log("Connection successful ✅", testDoc);

    // Read it back
    const allDocs = await prisma.test.findMany();
    console.log("All documents:", allDocs);
  } catch (error) {
    console.error("Connection failed ❌", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
