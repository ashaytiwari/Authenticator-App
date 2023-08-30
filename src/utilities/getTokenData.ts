import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function getTokenData(request: NextRequest) {

  try {

    const encodedToken = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);

    return decodedToken;

  } catch (error: any) {
    throw new Error(error.message);
  }
}