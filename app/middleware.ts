import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

/**
 * Validate and verify request JWT token.
 */
export default async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("Authorization");

  const throwUnauthorized = () =>
    new NextResponse(
      JSON.stringify({
        error: {
          message: "Unauthorized request",
        },
      }),
      { status: 401 }
    );

  if (!bearerToken) {
    return throwUnauthorized();
  }

  const token = bearerToken.split(" ")[1];

  if (!bearerToken) {
    return throwUnauthorized();
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return throwUnauthorized();
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
