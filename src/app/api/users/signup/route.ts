import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import apiMessages from '@/constants/apiMessages';

import { validateEmail, validatePassword } from '@/utilities/validators';
import ResponseHandler from '@/utilities/responseHandler';

connect();

export async function POST(request: NextRequest) {

  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    if (!username) {
      return ResponseHandler.validationError(apiMessages.usernameRequired, null);
    }

    if (!email) {
      return ResponseHandler.validationError(apiMessages.emailRequired, null);
    } else if (validateEmail(email) === true) {
      return ResponseHandler.validationError(apiMessages.emailInvalid, null);
    }

    if (!password) {
      return ResponseHandler.validationError(apiMessages.passwordRequired, null);
    } else if (validatePassword(password) === true) {
      return ResponseHandler.validationError(apiMessages.passwordRequired, null);
    }

    // checking user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return ResponseHandler.validationError(apiMessages.userAlreadyExists, null);
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return ResponseHandler.success(apiMessages.userAccountSuccessfullyCreated, savedUser);

  } catch (error: any) {
    return ResponseHandler.serverError(apiMessages.internalServerError, null);
  }
}