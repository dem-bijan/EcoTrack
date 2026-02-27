// test.mjs
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a dummy user
    const testUser = await prisma.user.create({
      data: {
        email: `test_${Date.now()}@example.com`,
        name: "Prisma Test",
        password: "password123"
      },
    });

    console.log("Connection successful ✅", testUser);

    // Read it back
    const allUsers = await prisma.user.findMany();
    console.log("All users:", allUsers);
  } catch (error) {
    console.error("Connection failed ❌", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
