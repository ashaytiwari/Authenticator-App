import { NextResponse } from "next/server";

import statusCodes from "@/constants/statusCodes";
import status from "@/constants/status";

class ResponseHandler {

  constructor() { }

  static success(message: string, data: any) {
    NextResponse.json({
      message,
      statusCode: statusCodes.SUCCESS,
      status: status.SUCCESS,
      data
    });
  }

  static validationError(message: string, data: any) {
    NextResponse.json({
      message,
      statusCode: statusCodes.UNPROCESSABLE,
      status: status.ERROR,
      data
    });
  }

  static serverError(message: string, data: any) {
    NextResponse.json({
      message,
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      status: status.ERROR,
      data
    });
  }

  static unauthorized(message: string, data: any) {
    NextResponse.json({
      message,
      statusCode: statusCodes.UNAUTHORIZED,
      status: status.ERROR,
      data
    });
  }

  static forbidden(message: string, data: any) {
    NextResponse.json({
      message,
      statusCode: statusCodes.FORBIDDEN,
      status: status.ERROR,
      data
    });
  }

}

export default ResponseHandler;