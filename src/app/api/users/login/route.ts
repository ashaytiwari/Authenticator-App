import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import messages from '@/constants/messages';

import ResponseHandler from '@/utilities/responseHandler';

connect();

export async function POST(request: NextRequest) {

  try {

    const requestBody = await request.json();
    const { email, password } = requestBody;

    if (!email) {
      return ResponseHandler.validationError(messages.emailRequired, null);
    }

    if (!password) {
      return ResponseHandler.validationError(messages.passwordRequired, null);
    }

    // checking user exists
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseHandler.validationError(messages.userWithThisEmailNotExists, null);
    }

    // checking password validity
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return ResponseHandler.validationError(messages.passwordMustBeSixChar, null);
    }

    // create token data
    const tokenData = {
      _id: user._id,
      email: user.email,
      username: user.username
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    const response: NextResponse = ResponseHandler.success(messages.loginSuccessful, null);

    response.cookies.set('token', token, { httpOnly: true });

    return response;

  } catch (error: any) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}