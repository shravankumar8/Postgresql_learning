import { PrismaClient } from "@prisma/client";
import PromptSync from "prompt-sync";
const prisma = new PrismaClient();

const prompt = PromptSync();

function connectDb() {
  const email: string = prompt("Enter you email :");
  deleteUser(email);
}

async function deleteUser(email: string) {
  const User = await prisma.user.delete({
    where: {
      email: email,
    },
  });
  console.log(User);
}
connectDb();
