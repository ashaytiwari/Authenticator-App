import { NextResponse } from "next/server";

import statusCodes from "@/constants/statusCodes";
import status from "@/constants/status";

class ResponseHandler {

  constructor() { }

  static success(message: string, data?: any) {
    return NextResponse.json({
      message,
      statusCode: statusCodes.SUCCESS,
      status: status.SUCCESS,
      data: data ? data : null
    });
  }

  static validationError(message: string, data?: any) {
    return NextResponse.json({
      message,
      statusCode: statusCodes.UNPROCESSABLE,
      status: status.ERROR,
      data: data ? data : null
    });
  }

  static serverError(message: string, data?: any) {
    return NextResponse.json({
      message,
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      status: status.ERROR,
      data: data ? data : null
    });
  }

  static unauthorized(message: string, data?: any) {
    return NextResponse.json({
      message,
      statusCode: statusCodes.UNAUTHORIZED,
      status: status.ERROR,
      data: data ? data : null
    });
  }

  static forbidden(message: string, data?: any) {
    return NextResponse.json({
      message,
      statusCode: statusCodes.FORBIDDEN,
      status: status.ERROR,
      data: data ? data : null
    });
  }

}

export default ResponseHandler;