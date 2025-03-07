import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// /api/notes return all notes

export default defineEventHandler(async (event) => {
  try {
    const notes = await prisma.note.findMany();

    return notes;
  } catch (err) {
    console.log(err);
  }
});
