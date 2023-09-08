import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';

import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";

import messages from "@/constants/messages";

import ResponseHandler from "@/utilities/responseHandler";

connect();

export async function POST(request: NextRequest) {

  try {

    const requestBody = await request.json();
    const { password, token } = requestBody;

    const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return ResponseHandler.unauthorized(messages.eitherUserNotFoundOrTokenGetExpired);
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return ResponseHandler.success(messages.passwordResetSuccessfully);


  } catch (error) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}