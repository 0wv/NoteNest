import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // 'body' is the body sent from the post event i.e email and password

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: "Invalid email address.",
      });
    }

    if (!validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })) {
      throw createError({
        statusCode: 400,
        message: "Password needs to be 8 or more characters in length.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const isValid = await bcrypt.compare(body.password, user.password);

    console.log(isValid)
    if (!isValid) {
        throw createError({
            statusCode: 400,
            message: "Email or password is not valid.",
          });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    setCookie(event, 'NoteNestJWT', token)
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "An email with this address already exists.",
      });
    }

    throw error;
  }
});

// GET
// POST
// PATCH
// PUT
// DELETE

// user.post.js replaced with user.js will be a GET request
// user.delete.js will be a DELETE request etc etc.
