import { NextRequest } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import emailType from "@/constants/emailType";
import messages from "@/constants/messages";

import User from "@/models/userModel";

import sendEmail from "@/utilities/mailer";
import ResponseHandler from "@/utilities/responseHandler";

connect();

export async function POST(request: NextRequest) {

  try {

    const requestBody = await request.json();
    const { email } = requestBody;

    // check user with this email exists
    const user = await User.findOne({ email });

    if (!user) {
      return ResponseHandler.validationError(messages.userNotFound);
    }

    // send email to registered user
    await sendEmail(email, emailType.RESET_PASSWORD, user._id);

    return ResponseHandler.success(messages.emailHasBeenSentToYourRegisteredAccount);

  } catch (error) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}