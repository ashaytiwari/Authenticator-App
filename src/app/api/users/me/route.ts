import { NextRequest } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import messages from "@/constants/messages";
import User from "@/models/userModel";

import { getTokenData } from "@/utilities/getTokenData";
import ResponseHandler from "@/utilities/responseHandler";

connect();

export async function GET(request: NextRequest) {

  try {

    const tokenData: any = getTokenData(request);

    const user = await User.findOne({ _id: tokenData?._id }, { password: 0 });

    return ResponseHandler.success(messages.success, user);

  } catch (error) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}