import { NextRequest, NextResponse } from "next/server";

import { connect } from '@/dbConfig/dbConfig';

import messages from "@/constants/messages";
import ResponseHandler from "@/utilities/responseHandler";

connect();

export async function GET(request: NextRequest) {

  try {

    const response: NextResponse = ResponseHandler.success(messages.logoutSuccessful, null);

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;

  } catch (error) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}