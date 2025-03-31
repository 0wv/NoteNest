import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event); //nuxt default, grab all cookies
    const token = cookies.NoteNestJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorised to update.",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const newNote = await prisma.note.create({
      data: {
        text: "",
        userId: decodedToken.id,
      },
    });

    return newNote;
  } catch (err) {
    console.log(err);

    throw createError({
      statusCode: 500,
      statusMessage: "Could not verify JWT.",
    });
  }
});
