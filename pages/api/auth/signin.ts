import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Undefined endpoint" });
  }
  const errors: string[] = [];
  const { email, password } = req.body;

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Provided not valid email",
    },
    {
      valid: validator.isLength(password, {
        min: 6,
        max: 30,
      }),
      errorMessage: "Invalid passoword",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return res.status(400).json({ error: { message: errors[0] } });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      email: true,
      password: true,
      first_name: true,
      last_name: true,
      id: true,
      phone: true,
      location: true,
    },
  });

  const authError = { error: { message: "Email or password is invalid" } };

  if (!user) {
    return res.status(401).json(authError);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json(authError);
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

  res.status(201).json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    id: user.id,
  });
}
