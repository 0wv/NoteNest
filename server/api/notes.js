import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
// /api/notes return all notes

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event); //nuxt default, grab all cookies
    const token = cookies.NoteNestJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorised (not logged in)",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const notes = await prisma.note.findMany({
      where: {
        userId: decodedToken.id,
      },
    });

    return notes;
  } catch (err) {
    console.log(err);
  }
});
