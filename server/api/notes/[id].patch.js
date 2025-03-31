import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = await getRouterParam(event, "id");

    const cookies = parseCookies(event); //nuxt default, grab all cookies
    const token = cookies.NoteNestJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authorised to update.",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const noteUpdating = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!noteUpdating) {
      throw createError({
        statusCode: 401,
        statusMessage: "Note does not exist.",
      });
    }

    if (noteUpdating.userId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: "Does not have permission to update note.",
      });
    }

    await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        text: body.updatedNote,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
