import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const throwUnauthorized = () =>
    res.status(401).json({
      error: {
        message: "Unauthorized request",
      },
    });
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return throwUnauthorized();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      location: true,
      email: true,
      phone: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: {
        message: "User not found",
      },
    });
  }

  return res.status(200).json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    location: user.location,
  });
}
