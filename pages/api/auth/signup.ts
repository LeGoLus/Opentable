import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
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
  const { firstName, lastName, email, phone, city, password } = req.body;

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 3,
        max: 20,
      }),
      errorMessage: "First name is to large or too small",
    },
    {
      valid: validator.isLength(lastName, {
        min: 3,
        max: 20,
      }),
      errorMessage: "Last name is to large or too small",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 3,
        max: 20,
      }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong enouth",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return res.status(400).json({
      error: { message: errors[0] },
    });
  }

  const userSameEmail = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  if (userSameEmail) {
    return res.status(400).json({
      error: { message: "Email is already occupied" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      location: city,
      password: hashedPassword,
      phone,
    },
  });

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
