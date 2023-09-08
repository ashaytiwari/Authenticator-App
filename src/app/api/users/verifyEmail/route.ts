import { NextRequest } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import messages from "@/constants/messages";

import ResponseHandler from "@/utilities/responseHandler";

connect();

export async function POST(request: NextRequest) {

  try {

    const requestBody = await request.json();
    const { token } = requestBody;

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return ResponseHandler.unauthorized(messages.eitherUserNotFoundOrTokenGetExpired);
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return ResponseHandler.success(messages.emailVerifiedSuccessfully);

  } catch (error) {
    return ResponseHandler.serverError(messages.internalServerError);
  }
}